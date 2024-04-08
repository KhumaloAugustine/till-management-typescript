"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
var Item = /** @class */ (function () {
    function Item(description, amount) {
        this.description = description;
        this.amount = amount;
    }
    Item.prototype.getDescription = function () {
        return this.description;
    };
    Item.prototype.setDescription = function (description) {
        this.description = description;
    };
    Item.prototype.getAmount = function () {
        return this.amount;
    };
    Item.prototype.setAmount = function (amount) {
        this.amount = amount;
    };
    return Item;
}());
exports.Item = Item;
