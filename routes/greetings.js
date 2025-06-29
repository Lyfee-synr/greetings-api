const express = require('express');
const router = express.Router();
const { readData, writeData } = require('../utils/dataUtils');

// GET all
router.get('/', (req, res) => {
  const data = readData();
  const { language, formal } = req.query;

  let result = data;

  if (language) {
    result = result.filter(g => g.language.toLowerCase() === language.toLowerCase());
  }

  if (formal === 'true') {
    // Demo giả lập: thêm chữ "Sir/Madam" vào greeting
    result = result.map(g => ({
      ...g,
      greeting: `Dear Sir/Madam, ${g.greeting}`
    }));
  }

  res.json(result);
});


// GET by id
router.get('/:id', (req, res) => {
  const data = readData();
  const greeting = data.find(g => g.id === parseInt(req.params.id));
  if (!greeting) return res.status(404).json({ error: 'Not found' });
  res.json(greeting);
});

// POST new greeting
router.post('/', (req, res) => {
  const { language, greeting } = req.body;

  if (!language || !greeting) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const data = readData();

  // ❗ Kiểm tra ngôn ngữ đã tồn tại chưa (không phân biệt hoa thường)
  const exists = data.find(g => g.language.toLowerCase() === language.toLowerCase());

  if (exists) {
    return res.status(409).json({ error: 'Language already exists' });
  }

  const newGreeting = {
    id: data.length ? data[data.length - 1].id + 1 : 1,
    language,
    greeting
  };

  data.push(newGreeting);
  writeData(data);

  res.status(201).json(newGreeting);
});



// PUT update
router.put('/:id', (req, res) => {
  const { language, greeting } = req.body;
  const data = readData();
  const index = data.findIndex(g => g.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });

  data[index] = { id: data[index].id, language, greeting };
  writeData(data);
  res.json(data[index]);
});

// DELETE
router.delete('/:id', (req, res) => {
  const data = readData();
  const index = data.findIndex(g => g.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });

  const deleted = data.splice(index, 1);
  writeData(data);
  res.json(deleted[0]);
});

module.exports = router;
// This file defines the routes for handling greetings in the Hello World API.
// It includes routes for getting all greetings, getting a greeting by ID, adding a new greeting