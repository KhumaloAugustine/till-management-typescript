import { Change } from "../model/Change";
import { Transaction } from "../model/Transaction";

export interface TillView {
  displayMessage(message: string): void;
  displayTransactionResult(
    tillStart: number,
    transactionTotal: number,
    amountPaid: number,
    changeTotal: number,
    changeGiven: Change,
    remainingAmount: number
  ): void;
}

export class TillController {
  private readonly view: TillView;
  private initialTillAmount: number;
  private tillCash: Map<number, number>;

  constructor(view: TillView, initialTillAmount: number) {
    this.view = view;
    this.initialTillAmount = initialTillAmount;
    this.tillCash = new Map();
    this.initializeTillCash();
  }

  private initializeTillCash(): void {
    this.tillCash.set(50, 5); // 5 x R50
    this.tillCash.set(20, 5); // 5 x R20
    this.tillCash.set(10, 6); // 6 x R10
    this.tillCash.set(5, 12); // 12 x R5
    this.tillCash.set(2, 10); // 10 x R2
    this.tillCash.set(1, 10); // 10 x R1
  }

  public processTransactions(transactions: Transaction[]): void {
    for (const transaction of transactions) {
      const transactionTotal = this.calculateTransactionTotal(transaction);
      const changeTotal = this.calculateChangeTotal(transaction);
      const changeGiven = this.calculateChange(transaction, changeTotal);

      const customerPayment = transaction.getAmountPaid();
      const totalTillAmount = this.initialTillAmount + customerPayment - changeTotal;
      this.initialTillAmount = totalTillAmount;
      this.updateTillCash(changeGiven.getChangeBreakdown());

      this.view.displayTransactionResult(
        this.initialTillAmount,
        transactionTotal,
        customerPayment,
        changeTotal,
        changeGiven,
        totalTillAmount
      );
    }
  }

  private updateTillCash(changeBreakdown: Map<number, number>): void {
    for (const [denomination, changeQuantity] of changeBreakdown.entries()) {
      const currentAmount = this.tillCash.get(denomination) || 0;
      this.tillCash.set(denomination, currentAmount - changeQuantity);
      if (this.tillCash.get(denomination)! < 0) {
        console.error(`Insufficient change for denomination: ${denomination}`);
      }
    }
  }

  private calculateTransactionTotal(transaction: Transaction): number {
    let total = 0;
    for (const item of transaction.getItems()) {
      total += item.getAmount();
    }
    return total;
  }

  private calculateChangeTotal(transaction: Transaction): number {
    const transactionTotal = this.calculateTransactionTotal(transaction);
    return transaction.getAmountPaid() - transactionTotal;
  }

  private calculateChange(transaction: Transaction, changeTotal: number): Change {
    const changeBreakdown: Map<number, number> = new Map();
    let remainingChange = changeTotal;

    const denominations = [200, 100, 50, 20, 10, 5, 2, 1]; // Add denominations as needed

    for (const denomination of denominations) {
      const numNotes = Math.floor(remainingChange / denomination);
      if (numNotes > 0 && this.tillCash.get(denomination)! >= numNotes) { // Check for available notes
        changeBreakdown.set(denomination, numNotes);
        remainingChange -= numNotes * denomination;
      }
    }

    if (remainingChange > 0) {
      console.error(`Insufficient change available. Remaining change: ${remainingChange}`);
    }

    return new Change(changeTotal, changeBreakdown, transaction);
  }
}