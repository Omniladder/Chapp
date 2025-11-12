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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const index_1 = __importDefault(require("./index"));
const serverless_http_1 = __importDefault(require("serverless-http"));
console.log("Transitioning to Serverless Architecture");
exports.handler = (0, serverless_http_1.default)((event, context) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Handler invoked with event:", JSON.stringify(event));
    return (0, serverless_http_1.default)(index_1.default)(event, context);
}));
