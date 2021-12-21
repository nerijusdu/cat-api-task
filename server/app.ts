import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.use(routes);

app.listen(Number(port), () => {
  console.log(`Server is running on port ${port}`);
});
