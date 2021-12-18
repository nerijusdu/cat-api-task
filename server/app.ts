import express from 'express';
import routes from './routes';

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
