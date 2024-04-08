import { TillController, TillView } from "./controller/TillController";
import { Change } from "./model/Change";
import { Item } from "./model/Item";
import { Transaction } from "./model/Transaction";

class BasicTillView implements TillView {
  public displayMessage(message: string): void {
    console.log(message);
  }

  public displayTransactionResult(
    tillStart: number,
    transactionTotal: number,
    amountPaid: number,
    changeTotal: number,
    changeGiven: Change,
    remainingAmount: number
  ): void {
    console.log(`Till Start: R${tillStart - transactionTotal}`);
    console.log(`Transaction Total: R${transactionTotal}`);
    console.log(`Amount Paid: R${amountPaid}`);
    console.log(`Change Total: R${changeTotal}`);
    console.log("Change Breakdown:");
    for (const [denomination, quantity] of changeGiven.getChangeBreakdown().entries()) {
      console.log(`${quantity} x R${denomination}`);
    }
    console.log("**Items Bought:**");
    for (const item of (changeGiven.getTransaction()?.getItems() ?? [])) {
        console.log(`<span class="math-inline">\{item\.getDescription\(\)\} \- R</span>{item.getAmount()}`);
      }      
    console.log(`\n**Remaining Till Amount:** R${remainingAmount}`);
    console.log("\t\t**Thank you for your purchase!** \n");
  }
}

const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [
    new Transaction(
      [new Item("Shirt", 20), new Item("Hat", 10)],
      35
    ),
    new Transaction([new Item("Book", 15)], 20),
  ];
  return transactions;
};

const main = async () => {
  const initialTillAmount = 500; 
  const transactions = generateTransactions();

  const view = new BasicTillView();
  const controller = new TillController(view, initialTillAmount);
  controller.processTransactions(transactions);
};

main();