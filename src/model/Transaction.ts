import { Item } from "./Item";

export class Transaction {
    public items: Item[];
    public amountPaid: number;
  
    constructor(items: Item[], amountPaid: number) {
      this.items = items;
      this.amountPaid = amountPaid;
    }
  
    public getItems(): Item[] {
      return this.items;
    }
  
    public setItems(items: Item[]): void {
      this.items = items;
    }
  
    public getAmountPaid(): number {
      return this.amountPaid;
    }
  
    public setAmountPaid(amountPaid: number): void {
      this.amountPaid = amountPaid;
    }
  }  