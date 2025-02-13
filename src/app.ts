import express, { Request, Response } from 'express';

import {  notFoundHandler } from './app/middlewares/handle.error';
import cors from "cors";
const app = express();

app.use(cors({ origin: ['http://localhost:5173'] }));

//parser for json
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

//from middleware 
app.use(notFoundHandler);

export default app;
