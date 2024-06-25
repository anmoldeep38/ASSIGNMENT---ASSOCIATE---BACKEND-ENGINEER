"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const google_1 = require("./config/google");
const outlook_1 = require("./config/outlook"); // Ensure this is a named import
const passport_1 = __importDefault(require("passport"));
const app = (0, express_1.default)();
app.use(passport_1.default.initialize());
app.use('/', google_1.googleAuthRouter);
app.use('/', outlook_1.outlookAuthRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
