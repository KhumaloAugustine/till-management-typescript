import { Transaction } from "./Transaction";

export class Change {
    public readonly totalChange: number;
    public readonly changeBreakdown: Map<number, number>;
    public readonly transaction?: Transaction; // Optional transaction
  
    constructor(totalChange: number, changeBreakdown: Map<number, number>, transaction?: Transaction) {
      this.totalChange = totalChange;
      this.changeBreakdown = changeBreakdown;
      this.transaction = transaction;
    }
  
    public getTotalChange(): number {
      return this.totalChange;
    }
  
    public getChangeBreakdown(): Map<number, number> {
      return this.changeBreakdown;
    }
  
    public getTransaction(): Transaction | undefined {
      return this.transaction;
    }
  }  