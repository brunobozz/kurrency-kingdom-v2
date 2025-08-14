import { Injectable } from '@angular/core';

export interface Currency {
  name: string;
  code: string;
  amount: number;
  baseValue: number;
  color?: string;
}

export interface QuoteItem {
  name: string;
  code: string;
  price: number;
  quote: number;
}

@Injectable({ providedIn: 'root' })
export class CurrentQuoteService {
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

  private round(n: number, digits = 4) {
    const p = Math.pow(10, digits);
    return Math.round(n * p) / p;
  }

  getQuote(currencies: Currency[], from: string | Currency): QuoteItem[] {
    const fromCode = typeof from === 'string' ? from : from.code;
    const vFrom = this.valueInGold(currencies, fromCode);

    return currencies
      .map<QuoteItem>(to => {
        const vTo = this.valueInGold(currencies, to.code);
        const perOneFrom = vFrom / vTo;
        const inverse = vTo / vFrom;
        return {
          name: to.name,
          code: to.code,
          price: this.round(perOneFrom),
          quote: this.round(inverse),
        };
      });
  }

  getGoldForOne(currencies: Currency[], from: string | Currency): number {
    const fromCode = typeof from === 'string' ? from : from.code;
    const vFrom = this.valueInGold(currencies, fromCode);
    return this.round(vFrom);
  }
}
