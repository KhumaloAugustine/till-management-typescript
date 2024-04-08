"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TillController = void 0;
var Change_1 = require("../model/Change");
var TillController = /** @class */ (function () {
    function TillController(view, initialTillAmount) {
        this.view = view;
        this.initialTillAmount = initialTillAmount;
        this.tillCash = new Map();
        this.initializeTillCash();
    }
    TillController.prototype.initializeTillCash = function () {
        this.tillCash.set(50, 5); // 5 x R50
        this.tillCash.set(20, 5); // 5 x R20
        this.tillCash.set(10, 6); // 6 x R10
        this.tillCash.set(5, 12); // 12 x R5
        this.tillCash.set(2, 10); // 10 x R2
        this.tillCash.set(1, 10); // 10 x R1
    };
    TillController.prototype.processTransactions = function (transactions) {
        var e_1, _a;
        try {
            for (var transactions_1 = __values(transactions), transactions_1_1 = transactions_1.next(); !transactions_1_1.done; transactions_1_1 = transactions_1.next()) {
                var transaction = transactions_1_1.value;
                var transactionTotal = this.calculateTransactionTotal(transaction);
                var changeTotal = this.calculateChangeTotal(transaction);
                var changeGiven = this.calculateChange(transaction, changeTotal);
                var customerPayment = transaction.getAmountPaid();
                var totalTillAmount = this.initialTillAmount + customerPayment - changeTotal;
                this.initialTillAmount = totalTillAmount;
                this.updateTillCash(changeGiven.getChangeBreakdown());
                this.view.displayTransactionResult(this.initialTillAmount, transactionTotal, customerPayment, changeTotal, changeGiven, totalTillAmount);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (transactions_1_1 && !transactions_1_1.done && (_a = transactions_1.return)) _a.call(transactions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    TillController.prototype.updateTillCash = function (changeBreakdown) {
        var e_2, _a;
        try {
            for (var _b = __values(changeBreakdown.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), denomination = _d[0], changeQuantity = _d[1];
                var currentAmount = this.tillCash.get(denomination) || 0;
                this.tillCash.set(denomination, currentAmount - changeQuantity);
                if (this.tillCash.get(denomination) < 0) {
                    console.error("Insufficient change for denomination: ".concat(denomination));
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    TillController.prototype.calculateTransactionTotal = function (transaction) {
        var e_3, _a;
        var total = 0;
        try {
            for (var _b = __values(transaction.getItems()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                total += item.getAmount();
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return total;
    };
    TillController.prototype.calculateChangeTotal = function (transaction) {
        var transactionTotal = this.calculateTransactionTotal(transaction);
        return transaction.getAmountPaid() - transactionTotal;
    };
    TillController.prototype.calculateChange = function (transaction, changeTotal) {
        var e_4, _a;
        var changeBreakdown = new Map();
        var remainingChange = changeTotal;
        var denominations = [200, 100, 50, 20, 10, 5, 2, 1]; // Add denominations as needed
        try {
            for (var denominations_1 = __values(denominations), denominations_1_1 = denominations_1.next(); !denominations_1_1.done; denominations_1_1 = denominations_1.next()) {
                var denomination = denominations_1_1.value;
                var numNotes = Math.floor(remainingChange / denomination);
                if (numNotes > 0 && this.tillCash.get(denomination) >= numNotes) { // Check for available notes
                    changeBreakdown.set(denomination, numNotes);
                    remainingChange -= numNotes * denomination;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (denominations_1_1 && !denominations_1_1.done && (_a = denominations_1.return)) _a.call(denominations_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        if (remainingChange > 0) {
            console.error("Insufficient change available. Remaining change: ".concat(remainingChange));
        }
        return new Change_1.Change(changeTotal, changeBreakdown, transaction);
    };
    return TillController;
}());
exports.TillController = TillController;
