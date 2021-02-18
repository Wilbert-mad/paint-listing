import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import morgan from 'morgan';
import { secret } from './configs.security';
import db from './lib/databaseManager';
import passport from './lib/discordAuth';
import route from './routes/RouteManager';
const app = express();

declare global {
  namespace Express {
    interface User {
      // NOTE: add real types not just any'
      [key: string]: any;
    }
  }
}

(async () => await db.connect())();

// NOTE: will be replaced with `core` later
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret,
    cookie: {
      maxAge: 60 * 1000 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/', route);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
