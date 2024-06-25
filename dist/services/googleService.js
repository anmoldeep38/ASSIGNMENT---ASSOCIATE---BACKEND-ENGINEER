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
exports.sendEmailGmail = sendEmailGmail;
const googleapis_1 = require("googleapis");
const google_1 = require("../config/google");
const createEmail_1 = require("../utils/createEmail");
function sendEmailGmail(to, subject, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const gmail = googleapis_1.google.gmail({ version: 'v1', auth: google_1.oAuth2Client });
        const raw = (0, createEmail_1.createEmail)(to, subject, body);
        const res = yield gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw,
            },
        });
        return res.data;
    });
}
