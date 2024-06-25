import express from 'express';
import { googleAuthRouter } from './config/google';
import { outlookAuthRouter } from './config/outlook';
import passport from 'passport';

const app = express();
app.use(passport.initialize());

app.use('/', googleAuthRouter);
app.use('/', outlookAuthRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

