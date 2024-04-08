export class Item {
    public description: string;
    public amount: number;
  
    constructor(description: string, amount: number) {
      this.description = description;
      this.amount = amount;
    }
  
    public getDescription(): string {
      return this.description;
    }
  
    public setDescription(description: string): void {
      this.description = description;
    }
  
    public getAmount(): number {
      return this.amount;
    }
  
    public setAmount(amount: number): void {
      this.amount = amount;
    }
  }  