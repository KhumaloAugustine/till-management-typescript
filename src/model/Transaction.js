"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
var Transaction = /** @class */ (function () {
    function Transaction(items, amountPaid) {
        this.items = items;
        this.amountPaid = amountPaid;
    }
    Transaction.prototype.getItems = function () {
        return this.items;
    };
    Transaction.prototype.setItems = function (items) {
        this.items = items;
    };
    Transaction.prototype.getAmountPaid = function () {
        return this.amountPaid;
    };
    Transaction.prototype.setAmountPaid = function (amountPaid) {
        this.amountPaid = amountPaid;
    };
    return Transaction;
}());
exports.Transaction = Transaction;
