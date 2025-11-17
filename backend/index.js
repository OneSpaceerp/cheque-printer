import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { convertNumberToChequeArabic } from './arabic-converter.js';

const app = express();
const port = 3001;
const templatesDirectory = path.join(process.cwd(), 'templates');

// Serve static files from the 'templates' directory
app.use('/templates', express.static(templatesDirectory));

app.use(cors());
app.use(express.json());

// Endpoint to convert a number to Arabic words for cheques
app.post('/api/convert', (req, res) => {
  const { number } = req.body;

  if (number === undefined) {
    return res.status(400).json({ error: 'Missing "number" in request body' });
  }

  try {
    const arabicWords = convertNumberToChequeArabic(Number(number));
    res.json({ arabicWords });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to get a cheque template layout
app.get('/api/templates/:templateId', async (req, res) => {
  const { templateId } = req.params;
  const filePath = path.join(templatesDirectory, `${templateId}.json`);

  try {
    const data = await fs.readFile(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.status(500).json({ error: 'Failed to read template' });
  }
});

// Endpoint to save a cheque template layout
app.post('/api/templates/:templateId', async (req, res) => {
  const { templateId } = req.params;
  const layout = req.body;
  const filePath = path.join(templatesDirectory, `${templateId}.json`);

  try {
    await fs.writeFile(filePath, JSON.stringify(layout, null, 2), 'utf8');
    res.status(200).json({ message: 'Template saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save template' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
