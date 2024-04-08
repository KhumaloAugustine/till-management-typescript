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

    const denominations: number[] = [200, 100, 50, 20, 10, 5, 2, 1]; // Array of supported denominations (modify as needed)

    for (const denomination of denominations) {
      const numNotes = Math.floor(remainingChange / denomination);
      if (numNotes > 0) {
        changeBreakdown.set(denomination, numNotes);
        remainingChange -= numNotes * denomination;
      }
    }

    // Check for insufficient change
    if (remainingChange > 0) {
      console.error("Insufficient change available in till.");
      // Handle insufficient change scenario (e.g., prompt user or reject transaction)
      // You might need to modify the logic here based on your requirements.
      return new Change(changeTotal, changeBreakdown, transaction);
    }

    return new Change(changeTotal, changeBreakdown, transaction);
  }

  private updateTillCash(changeBreakdown: Map<number, number>): void {
    for (const [denomination, changeQuantity] of changeBreakdown.entries()) {
        const currentTillAmount = this.tillCash.get(denomination) || 0;
        if (currentTillAmount - changeQuantity < 0) {
          console.error(`Insufficient change for denomination: ${denomination}`);
        }
        
    }
  }
}