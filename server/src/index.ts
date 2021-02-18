import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import db from './lib/databaseManager';
const app = express();

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
app.use(express.urlencoded({ extended: true }));

import route from './routes/RouteManager';

app.use('/', route);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
