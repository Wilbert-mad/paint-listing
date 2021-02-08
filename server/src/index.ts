import express from 'express';
import morgan from 'morgan';
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import route from './routes/RouteManager';

app.use('/', route);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
