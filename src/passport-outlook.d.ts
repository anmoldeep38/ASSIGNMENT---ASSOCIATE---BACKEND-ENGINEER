declare module 'passport-outlook' {
    import { Strategy as PassportStrategy } from 'passport';

    interface StrategyOptions {
        clientID: string;
        clientSecret: string;
        callbackURL: string;
        passReqToCallback?: boolean;
    }

    interface Profile {
        id: string;
        displayName: string;
        emails: { value: string }[];
        _raw: string;
        _json: any;
    }

    type VerifyFunction = (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any) => void
    ) => void;

    type VerifyFunctionWithRequest = (
        req: any,
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any) => void
    ) => void;

    class Strategy extends PassportStrategy {
        constructor(options: StrategyOptions, verify: VerifyFunction | VerifyFunctionWithRequest);
    }

    export { Strategy as OutlookStrategy };
}
