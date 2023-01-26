const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту ${PORT}`);
});
