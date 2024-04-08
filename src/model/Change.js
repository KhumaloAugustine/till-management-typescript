"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Change = void 0;
var Change = /** @class */ (function () {
    function Change(totalChange, changeBreakdown, transaction) {
        this.totalChange = totalChange;
        this.changeBreakdown = changeBreakdown;
        this.transaction = transaction;
    }
    Change.prototype.getTotalChange = function () {
        return this.totalChange;
    };
    Change.prototype.getChangeBreakdown = function () {
        return this.changeBreakdown;
    };
    Change.prototype.getTransaction = function () {
        return this.transaction;
    };
    return Change;
}());
exports.Change = Change;
