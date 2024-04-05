const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.originalUrl}`);
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Дозволяємо доступ з будь-якого джерела
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());

let requestCount = 0;

// Обробник для маршруту /api
app.get('/api', (req, res) => {
  requestCount++;
  
  if (requestCount > 50) {
    return res.status(429).send('Too Many Requests');
  }

  const delay = Math.floor(Math.random() * 1000) + 1;

  setTimeout(() => {
    if (req.query.index !== undefined) {
      res.send(req.query.index.toString());
    } else {
      res.status(400).send('Missing index parameter');
    }
  }, delay);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
