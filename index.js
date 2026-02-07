import express from 'express';
import testFunction from './src/controller/test-controller';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/test', testFunction);


const PORT = process.env.PORT || 8080; // add this is in environment variable in cloud run

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});