import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api-service/api.service';
import { CurrencyConversionService } from '../../services/currency-conversion.service/currency-conversion.service';

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
      currencyOriginValue: [0, [Validators.required, Validators.minLength(1)]],
      currencyDestinyName: ['', [Validators.required]],
      currencyDestinyCode: ['', [Validators.required]],
      currencyDestinyColor: ['', [Validators.required]],
      currencyDestinyValue: [0.00, [Validators.required]],
      quote: [0, [Validators.required]],
      user: ['bruno', [Validators.required]],
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
        "user": "bruno",
        "currencyOrigin": {
          "name": this.form.value.currencyOriginName,
          "code": this.form.value.currencyOriginCode,
          "value": this.form.value.currencyOriginValue
        },
        "quote": this.form.value.quote,
        "currencyDestiny": {
          "name": this.form.value.currencyDestinyName,
          "code": this.form.value.currencyDestinyCode,
          "value": this.form.value.currencyDestinyValue
        },
        "createdAt": createdAt
      };
      this.updateForm(body);
    } else {
      this.toastr.error('Seu formulário está incompleto!', 'Transação negada!');
    }
  }

  public updateForm(body: any) {
    console.log(body);

    this.apiService.postData('transaction', body).subscribe((res: any) => {
      const mensagem = `
      ${this.form.value.currencyOriginCode}${this.form.value.currencyOriginValue}
      ${this.form.value.currencyDestinyCode}${this.form.value.currencyDestinyValue}
      `;
      this.toastr.success(mensagem, 'Transação realizada!');
      this.closeModal.nativeElement.click();
      this.refreshList.emit();
    })
  }
}
