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
    const fromCoin = currencies.find(c => c.code === fromCode);
    if (!fromCoin) throw new Error(`Moeda ${fromCode} não encontrada.`);

    const amtFrom = Math.max(fromCoin.amount ?? 0, this.MIN_DENOM);

    return currencies.map<QuoteItem>(to => {
      const amtTo = Math.max(to.amount ?? 0, this.MIN_DENOM);

      // perOneFrom = B por 1 A
      const perOneFrom = (to.baseValue / fromCoin.baseValue) * (amtTo / amtFrom);
      const inverse = perOneFrom === 0 ? 0 : 1 / perOneFrom;

      return {
        name: to.name,
        code: to.code,
        price: this.round(perOneFrom), // 1 'from' compra 'price' de 'to'
        quote: this.round(inverse),    // inverso: 'from' por 1 'to'
      };
    });
  }

  getGoldForOne(currencies: Currency[], from: string | Currency): number {
    const fromCode = typeof from === 'string' ? from : from.code;
    const gold = currencies.find(c => c.code === 'Or$');
    if (!gold) throw new Error('Moeda Or$ não encontrada.');
    const amtFrom = Math.max(currencies.find(c => c.code === fromCode)?.amount ?? 0, this.MIN_DENOM);
    const amtGold = Math.max(gold.amount ?? 0, this.MIN_DENOM);
    const v = (gold.baseValue / (currencies.find(c => c.code === fromCode)!.baseValue)) * (amtGold / amtFrom);
    return this.round(v);
  }
}
