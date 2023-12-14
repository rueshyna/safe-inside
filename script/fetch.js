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
exports.__esModule = true;
var config_1 = require("./context/config");
var fs = require("fs");
var node_fetch_1 = require("node-fetch");
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var fetchContractCounts = function (hashes, maxRetries) {
    if (maxRetries === void 0) { maxRetries = 3; }
    return __awaiter(void 0, void 0, void 0, function () {
        var counts, _i, _a, _b, hash, version, attempts, response, count, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    counts = {};
                    _i = 0, _a = Object.entries(hashes);
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 12];
                    _b = _a[_i], hash = _b[0], version = _b[1];
                    attempts = 0;
                    _c.label = 2;
                case 2:
                    if (!(attempts < maxRetries)) return [3 /*break*/, 11];
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 6, , 10]);
                    return [4 /*yield*/, (0, node_fetch_1["default"])("".concat(config_1.TZKT_API, "/v1/contracts/count?codeHash=").concat(hash))];
                case 4:
                    response = _c.sent();
                    if (!response.ok) {
                        throw new Error("API call failed: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 5:
                    count = _c.sent();
                    counts[version] = Number(count);
                    return [3 /*break*/, 11]; // Break the loop if fetch was successful
                case 6:
                    error_1 = _c.sent();
                    attempts++;
                    console.error("Retry attempt ".concat(attempts, " for hash ").concat(hash, ":"), error_1);
                    if (!(attempts < maxRetries)) return [3 /*break*/, 8];
                    return [4 /*yield*/, sleep(5000)];
                case 7:
                    _c.sent(); // Wait for 5 seconds before retrying
                    return [3 /*break*/, 9];
                case 8:
                    counts[version] = 0; // Set to 0 or handle accordingly if all retries fail
                    _c.label = 9;
                case 9: return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 2];
                case 11:
                    _i++;
                    return [3 /*break*/, 1];
                case 12: return [2 /*return*/, counts];
            }
        });
    });
};
fetchContractCounts(config_1.VERSIONS).then(function (counts) {
    fs.writeFileSync('../src/data/contractVersion.json', JSON.stringify(counts, null, 2));
    console.log('Data written to data.json');
})["catch"](function (error) {
    console.error('An error occurred:', error);
});
