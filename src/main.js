"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var TillController_1 = require("./controller/TillController");
var Item_1 = require("./model/Item");
var Transaction_1 = require("./model/Transaction");
var BasicTillView = /** @class */ (function () {
    function BasicTillView() {
    }
    BasicTillView.prototype.displayMessage = function (message) {
        console.log(message);
    };
    BasicTillView.prototype.displayTransactionResult = function (tillStart, transactionTotal, amountPaid, changeTotal, changeGiven, remainingAmount) {
        var e_1, _a, e_2, _b;
        var _c, _d;
        console.log("Till Start: R".concat(tillStart - transactionTotal));
        console.log("Transaction Total: R".concat(transactionTotal));
        console.log("Amount Paid: R".concat(amountPaid));
        console.log("Change Total: R".concat(changeTotal));
        console.log("Change Breakdown:");
        try {
            for (var _e = __values(changeGiven.getChangeBreakdown().entries()), _f = _e.next(); !_f.done; _f = _e.next()) {
                var _g = __read(_f.value, 2), denomination = _g[0], quantity = _g[1];
                console.log("".concat(quantity, " x R").concat(denomination));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        console.log("**Items Bought:**");
        try {
            for (var _h = __values(((_d = (_c = changeGiven.getTransaction()) === null || _c === void 0 ? void 0 : _c.getItems()) !== null && _d !== void 0 ? _d : [])), _j = _h.next(); !_j.done; _j = _h.next()) {
                var item = _j.value;
                console.log("<span class=\"math-inline\">{item.getDescription()} - R</span>{item.getAmount()}");
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
            }
            finally { if (e_2) throw e_2.error; }
        }
        console.log("\n**Remaining Till Amount:** R".concat(remainingAmount));
        console.log("\t\t**Thank you for your purchase!** \n");
    };
    return BasicTillView;
}());
var generateTransactions = function () {
    // Replace this with your logic to generate transactions from data source (e.g., user input, file)
    // Here's a simple example:
    var transactions = [
        new Transaction_1.Transaction([new Item_1.Item("Shirt", 20), new Item_1.Item("Hat", 10)], 35),
        new Transaction_1.Transaction([new Item_1.Item("Book", 15)], 20),
    ];
    return transactions;
};
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var initialTillAmount, transactions, view, controller;
    return __generator(this, function (_a) {
        initialTillAmount = 500;
        transactions = generateTransactions();
        view = new BasicTillView();
        controller = new TillController_1.TillController(view, initialTillAmount);
        controller.processTransactions(transactions);
        return [2 /*return*/];
    });
}); };
main();
