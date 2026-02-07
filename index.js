import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 8080; // add this is in environment variable in cloud run

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});