import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiKingdomService } from '../../services/api-kingdom/api-kingdom.service';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.scss'
})
export class TransactionModalComponent implements OnInit {
  public currencyList: any;
  public currencyOrigin: any;
  public currencyDestiny: any;
  public currentQuote: any;

  public form: FormGroup;
  @Output() refreshList = new EventEmitter();
  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(
    private apiKingdom: ApiKingdomService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.form = this.formBuilder.group({
      currencyOriginCode: ['', [Validators.required]],
      currencyOriginValue: [null, [Validators.required, Validators.minLength(1)]],
      currencyDestinyCode: ['', [Validators.required]],
      currencyDestinyValue: [0],
      authorize: [false, [Validators.requiredTrue]]
    })
  }

  ngOnInit(): void {
    this.getCurrencyList();
  }

  private getCurrencyList() {
    this.apiKingdom.getData('currencies').subscribe((res: any) => {
      this.currencyList = res;
      if (this.form.value.currencyOriginCode == '') {
        this.changeCurrencyOrigin(this.currencyList.find((item: any) => { return item.code == 'Tb' }));
        this.changeCurrencyDestiny(this.currencyList.find((item: any) => { return item.code == 'Or' }));
      }
    })
  }

  public changeCurrencyOrigin(currency: any) {
    this.currencyOrigin = currency;
    this.form.patchValue({
      'currencyOriginCode': currency.code,
    })
  }

  public changeCurrencyDestiny(currency: any) {
    this.currencyDestiny = currency;
    this.form.patchValue({
      'currencyDestinyCode': currency.code,
    })
  }

  public calcConvertion() {
    const body = {
      fromCode: this.form.value.currencyOriginCode,
      toCode: this.form.value.currencyDestinyCode,
      amount: this.form.value.currencyOriginValue,
    }
    this.apiKingdom.postData('currencies/convert-preview', body).subscribe((res: any) => {
      this.currentQuote = res;
      this.form.patchValue({
        'currencyDestinyValue': res.toAmountGross,
        'authorize': false,
      })
    })
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
      const body = {
        "fromCode": this.form.value.currencyOriginCode,
        "toCode": this.form.value.currencyDestinyCode,
        "fromAmount": this.form.value.currencyOriginValue
      }
      this.makeExchange(body);
    } else {
      if (this.form.value.authorize == false) {
        this.toastr.warning(
          'Você precisa autorizar a transação marcando o checkbox.',
          'Autorização necessária'
        );
      } else {
        this.toastr.error(
          'Seu formulário está incompleto!',
          'Transação negada!'
        );
      }
    }
  }

  private makeExchange(body: any) {
    this.apiKingdom.postData('transactions/exchange', body).subscribe((res: any) => {
      this.closeModal.nativeElement.click();
      this.refreshList.emit();
      this.toastr.success(
        'Currency Kingdom agradece!',
        'Transação efetuada!'
      );
    })
  }

}
