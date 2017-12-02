class Currency {
    constructor(name) {
        this.name = name;
        this.price;
        this.investments;
        this.data = [];
    }

    getCurrentPrice() {
        return this.price;
    }

    getData(){
        return data;
    }

    getName(){
        return this.name;
    }

    printWithName() {
        console.log(this.name + " - " + this.price);
    }

    // Our total Investments in the currency
    totalInvestment() {
        return this.investments;
    }

    // Our total Value of the currency available
    totalCurrentValue() {
        return this.totalInvestment() * this.getCurrentPrice();
    }

    totalProfits() {
        return this.totalCurrentValue() - this.totalInvestment();
    }

    buy(amount){
        this.investments += amount;
    }

    sell(amount) {
        this.investments -= amount;
    }
}