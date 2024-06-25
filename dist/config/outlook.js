"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.outlookAuthRouter = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_outlook_1 = require("passport-outlook");
const express_1 = __importDefault(require("express"));
const outlookRouter = express_1.default.Router();
exports.outlookAuthRouter = outlookRouter;
passport_1.default.use(new passport_outlook_1.OutlookStrategy({
    clientID: process.env.OUTLOOK_CLIENT_ID,
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/outlook/callback',
    passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
    // Here, you would find or create the user in your database
    // and then call the done callback with the user object
    done(null, profile);
}));
outlookRouter.get('/auth/outlook', passport_1.default.authenticate('windowslive', { scope: ['wl.signin', 'wl.offline_access', 'wl.emails'] }));
outlookRouter.get('/auth/outlook/callback', passport_1.default.authenticate('windowslive', {
    successRedirect: '/',
    failureRedirect: '/login',
}));
