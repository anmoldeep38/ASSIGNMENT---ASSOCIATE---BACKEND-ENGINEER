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
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailQueue = void 0;
const bullmq_1 = require("bullmq");
const openaiService_1 = require("../services/openaiService");
const googleService_1 = require("../services/googleService");
const emailQueue = new bullmq_1.Queue('emailQueue', {
    connection: {
        host: 'localhost',
        port: 6379,
    },
});
exports.emailQueue = emailQueue;
const worker = new bullmq_1.Worker('emailQueue', (job) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailContent, to, subject } = job.data;
    const category = yield (0, openaiService_1.analyzeEmailContent)(emailContent);
    const response = yield (0, openaiService_1.generateResponse)(category);
    yield (0, googleService_1.sendEmailGmail)(to, 'Re: ' + subject, response);
}));
