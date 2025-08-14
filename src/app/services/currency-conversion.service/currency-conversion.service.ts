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
  private readonly GOLD_CODE = 'Or$';
  private readonly MIN_DENOM = 1e-9;

  private valueInGold(currencies: Currency[], code: string): number {
    const gold = currencies.find(c => c.code === this.GOLD_CODE);
    const coin = currencies.find(c => c.code === code);
    if (!gold) throw new Error('Moeda base ouro (Or$) não encontrada.');
    if (!coin) throw new Error(`Moeda ${code} não encontrada.`);

    const denom = Math.max(coin.amount ?? 0, this.MIN_DENOM);
    return coin.baseValue * (gold.amount / denom);
  }

  public rate(currencies: Currency[], fromCode: string, toCode: string): number {
    if (fromCode === toCode) return 1;
    const vFrom = this.valueInGold(currencies, fromCode);
    const vTo = this.valueInGold(currencies, toCode);
    return vTo / vFrom;
  }

  public convert(
    currencies: Currency[],
    fromCode: string,
    toCode: string,
    amountFrom: number,
    roundDigits = 4
  ): any {
    if (!Number.isFinite(amountFrom) || amountFrom <= 0) return 0;
    const r = this.rate(currencies, fromCode, toCode);
    const out = amountFrom * r;
    return {
      value: this.round(out, roundDigits),
      rate: this.round(r, roundDigits)
    };
  }

  private round(n: number, digits = 4): number {
    const p = Math.pow(10, digits);
    return Math.round(n * p) / p;
  }
}
