const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const greetingsRoutes = require('./routes/greetings');
app.use('/api/greetings', greetingsRoutes);

// Error handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to Hello World API');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
