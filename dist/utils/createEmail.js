"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmail = createEmail;
function createEmail(to, subject, body) {
    const str = [
        `To: ${to}`,
        'Content-Type: text/plain; charset=utf-8',
        'MIME-Version: 1.0',
        `Subject: ${subject}`,
        '',
        body,
    ].join('\n');
    return Buffer.from(str).toString('base64');
}
