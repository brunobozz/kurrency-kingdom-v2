import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api-service/api.service';
import { CurrencyConversionService } from '../../services/currency-conversion.service/currency-conversion.service';
import { catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.scss'
})
export class TransactionModalComponent implements OnInit {
  public currencyList: any;
  public form: FormGroup;
  @Output() refreshList = new EventEmitter();
  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private currencyConversionService: CurrencyConversionService
  ) {
    this.form = this.formBuilder.group({
      currencyOriginName: ['', [Validators.required]],
      currencyOriginCode: ['', [Validators.required]],
      currencyOriginColor: ['', [Validators.required]],
      currencyOriginValue: [null, [Validators.required, Validators.minLength(1)]],
      currencyOriginTax: [0, [Validators.required]],
      currencyDestinyName: ['', [Validators.required]],
      currencyDestinyCode: ['', [Validators.required]],
      currencyDestinyColor: ['', [Validators.required]],
      currencyDestinyValue: [0.00, [Validators.required]],
      currencyDestinyValueTaxed: [0.00, [Validators.required]],
      quote: [0, [Validators.required]],
      taxValue: [0, [Validators.required]],
      user: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getCurrencyList();
  }

  private getCurrencyList() {
    this.apiService.getData('currency').subscribe((res: any) => {
      this.currencyList = res;
      if (this.form.value.currencyOriginName == '') {
        this.changeCurrencyOrigin(this.currencyList[1]);
        this.changeCurrencyDestiny(this.currencyList[0]);
      }
    })
  }

  public changeCurrencyOrigin(currency: any) {
    this.form.patchValue({
      'currencyOriginName': currency.name,
      'currencyOriginCode': currency.code,
      'currencyOriginColor': currency.color,
      'currencyOriginTax': currency.tax,
    })
  }

  public changeCurrencyDestiny(currency: any) {
    this.form.patchValue({
      'currencyDestinyName': currency.name,
      'currencyDestinyCode': currency.code,
      'currencyDestinyColor': currency.color,
    })
  }

  public calcConvertion() {
    this.getCurrencyList();
    const converted = this.currencyConversionService.convert(
      this.currencyList,
      this.form.value.currencyOriginCode,
      this.form.value.currencyDestinyCode,
      +this.form.value.currencyOriginValue
    );
    this.form.patchValue({
      'currencyDestinyValue': converted.value,
      'currencyDestinyValueTaxed': converted.valueTaxed,
      'taxValue': converted.taxValue,
      'quote': converted.rate,
    });
  }

  public validField(field: string) {
    return this.form.get(field)?.invalid && this.form.get(field)?.touched;
  }

  private validForm() {
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      }
    });
  }

  public submitForm() {
    this.validForm();
    if (this.form.valid) {
      const now = new Date();
      const createdAt = now.toLocaleString('sv-SE', {
        timeZone: 'America/Sao_Paulo',
        hour12: false
      }).replace('T', ' ');

      let body = {
        "user": this.form.value.user,
        "currencyOrigin": {
          "name": this.form.value.currencyOriginName,
          "code": this.form.value.currencyOriginCode,
          "value": this.form.value.currencyOriginValue,
          "tax": this.form.value.currencyOriginTax
        },
        "quote": this.form.value.quote,
        'taxValue': this.form.value.taxValue,
        "currencyDestiny": {
          "name": this.form.value.currencyDestinyName,
          "code": this.form.value.currencyDestinyCode,
          "value": this.form.value.currencyDestinyValue,
          "valueTaxed": this.form.value.currencyDestinyValueTaxed,
        },
        "createdAt": createdAt
      };
      this.updateBankThenPost(body);
    } else {
      this.toastr.error('Seu formulário está incompleto!', 'Transação negada!');
    }
  }

  private updateBankThenPost(body: any) {
    const originCode = body.currencyOrigin.code as string;
    const originDelta = Number(body.currencyOrigin.value) || 0; // soma
    const destCode = body.currencyDestiny.code as string;
    const destDelta = Number(body.currencyDestiny.valueTaxed) || 0; // subtrai

    this.apiService.getData('currency').pipe(
      map((list: any[]) => {
        const origin = list.find(c => c.code === originCode);
        const dest = list.find(c => c.code === destCode);

        if (!origin) throw new Error(`Moeda origem ${originCode} não encontrada.`);
        if (!dest) throw new Error(`Moeda destino ${destCode} não encontrada.`);

        if (dest.amount < destDelta) {
          throw new Error(`Saldo insuficiente de ${dest.code} no banco.`);
        }

        const updatedOrigin = { ...origin, amount: origin.amount + originDelta };
        const updatedDest = { ...dest, amount: dest.amount - destDelta };

        return { updatedOrigin, updatedDest };
      }),
      switchMap(({ updatedOrigin, updatedDest }) =>
        forkJoin([
          this.apiService.updateData(`currency/${updatedOrigin.id}`, updatedOrigin),
          // this.apiService.updateData(`currency/${updatedDest.id}`, updatedDest),
        ])
      ),
      tap(() => {
        this.toastr.info('Banco atualizado.', 'OK');
      }),
      switchMap(() => this.apiService.postData('transaction', body)),
      tap(() => {
        const mensagem = `
${this.form.value.currencyOriginCode}${this.form.value.currencyOriginValue}
${this.form.value.currencyDestinyCode}${this.form.value.currencyDestinyValue}
      `;
        this.toastr.success(mensagem, 'Transação realizada!');
        this.closeModal?.nativeElement?.click();
        this.refreshList?.emit();
      }),
      catchError((err) => {
        this.toastr.error(err?.message || 'Falha ao atualizar o banco.', 'Erro');
        return of(null);
      })
    ).subscribe();
  }




}
