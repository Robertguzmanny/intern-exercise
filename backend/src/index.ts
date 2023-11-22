// src/index.ts
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON requests

// PostgreSQL configuration
const pool = new Pool({
  user: 'robertguzman',
  host: 'localhost',
  database: 'exercise',
  password: 'Civic123',
  port: 5432, // default PostgreSQL port
});

// API endpoint with PostgreSQL - GET
app.get('/awesome/applicant', async (req, res) => {
  try {
    // Query the database
    const result = await pool.query('SELECT * FROM applicants WHERE id = $1', [1]);

    // Assuming there's a table named "applicants"
    const applicant = result.rows[0];

    res.json(applicant);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint with PostgreSQL - PUT
app.put('/awesome/applicant', async (req, res) => {
  try {
    const updatedApplicant = req.body;
    
    // Update the database
    await pool.query(
      'UPDATE applicants SET name = $1, hobby = $2, favorite_language = $3, message = $4 WHERE id = $5',
      [
        updatedApplicant.name,
        updatedApplicant.hobby,
        updatedApplicant.favorite_language,
        updatedApplicant.message,
        1, // Assuming the applicant entry has id = 1
      ]
    );

    res.json({ message: 'Applicant information updated successfully' });
  } catch (error) {
    console.error('Error updating the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
