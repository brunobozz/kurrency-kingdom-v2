import { Injectable } from '@angular/core';

export interface Currency {
  name: string;
  code: string;
  amount: number;
  baseValue: number;
  color?: string;
}

@Injectable({ providedIn: 'root' })
export class CurrencyConversionService {
  private readonly MIN_DENOM = 1e-9;

  public rate(currencies: Currency[], fromCode: string, toCode: string): number {
    if (fromCode === toCode) return 1;

    const from = currencies.find(c => c.code === fromCode);
    const to = currencies.find(c => c.code === toCode);

    if (!from) throw new Error(`Moeda ${fromCode} não encontrada.`);
    if (!to) throw new Error(`Moeda ${toCode} não encontrada.`);

    const amtFrom = Math.max(from.amount ?? 0, this.MIN_DENOM);
    const amtTo = Math.max(to.amount ?? 0, this.MIN_DENOM);

    // rate = (baseTo/baseFrom) * (amountTo/amountFrom)
    return (to.baseValue / from.baseValue) * (amtTo / amtFrom);
  }


  public convert(
    currencies: Currency[],
    fromCode: string,
    toCode: string,
    amountFrom: number,
    roundDigits = 2
  ): any {
    if (!Number.isFinite(amountFrom) || amountFrom <= 0) return 0;

    const r = this.rate(currencies, fromCode, toCode);
    const out = amountFrom * r;

    const coinOrigin: any = currencies.find(c => c.code === fromCode);
    const taxPercent = coinOrigin?.tax ?? 0;

    const taxValue = (out * taxPercent) / 100;
    const valueTaxed = out - taxValue;

    return {
      value: this.round(out, roundDigits),
      rate: this.round(r, roundDigits),
      taxValue: this.round(taxValue, roundDigits),
      valueTaxed: this.round(valueTaxed, roundDigits)
    };
  }

  private round(n: number, digits = 2): number {
    const p = Math.pow(10, digits);
    return Math.round(n * p) / p;
  }
}
