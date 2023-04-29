import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import v1Router from './src/v1/routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(express.json());

app.use('/api/v1', v1Router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
