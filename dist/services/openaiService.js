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
exports.analyzeEmailContent = analyzeEmailContent;
exports.generateResponse = generateResponse;
const openai_1 = require("openai");
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
function analyzeEmailContent(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Categorize the following email content: ${content}\nCategories: Interested, Not Interested, More Information`,
            max_tokens: 60,
        });
        const category = response.data.choices[0].text.trim();
        return category;
    });
}
function generateResponse(category) {
    return __awaiter(this, void 0, void 0, function* () {
        let prompt = '';
        switch (category) {
            case 'Interested':
                prompt = 'Generate a response asking for a demo call time.';
                break;
            case 'Not Interested':
                prompt = 'Generate a polite response acknowledging their decision.';
                break;
            case 'More Information':
                prompt = 'Generate a response providing more information about the product.';
                break;
        }
        const response = yield openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 100,
        });
        return response.data.choices[0].text.trim();
    });
}
