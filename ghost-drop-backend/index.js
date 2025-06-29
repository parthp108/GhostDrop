import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Email from './models/TempEmail.js';
import { connectDB } from './db.js';


dotenv.config();

const app = express();
const PORT = 7070;

app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB();

// Generate Temp Email
app.get('/generate-temp-email', async (req, res) => {
  const id = Math.random().toString(36).substring(2, 10);
  const email = `${id}@tempmail.com`;

  const newEmail = new Email({ id, email, inbox: [] });
  await newEmail.save();

  res.json({ id, email });
});

// Get Inbox by ID
app.get('/inbox/:id', async (req, res) => {
  const { id } = req.params;
  const emailDoc = await Email.findOne({ id });

  if (!emailDoc) {
    return res.status(404).json({ error: 'Email ID not found' });
  }

  res.json(emailDoc.inbox || []);
});

// Clear All Inbox
app.delete('/inbox/:id', async (req, res) => {
  const { id } = req.params;
  const emailDoc = await Email.findOneAndUpdate({ id }, { inbox: [] });

  if (!emailDoc) {
    return res.status(404).json({ error: 'Email ID not found' });
  }

  res.json({ message: 'Inbox cleared' });
});

// Delete Entire Email ID
app.delete('/email/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await Email.findOneAndDelete({ id });

  if (!deleted) {
    return res.status(404).json({ error: 'Email ID not found' });
  }

  res.json({ message: 'Email ID deleted' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
app.delete('/delete-id/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Email.findOneAndDelete({ id });
    if (!deleted) {
      return res.status(404).json({ error: 'Email not found' });
    }
    res.status(200).json({ message: 'Deleted temp email and inbox' });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ error: 'Failed to delete ID' });
  }
});
// Delete a specific email inside inbox array
app.delete('/inbox/:id/:mailIndex', async (req, res) => {
  const { id, mailIndex } = req.params;
  try {
    const emailDoc = await Email.findOne({ id });
    if (!emailDoc) {
      return res.status(404).json({ error: 'Email ID not found' });
    }

    // Remove the specific email by index
    emailDoc.inbox.splice(mailIndex, 1);
    await emailDoc.save();

    res.json({ message: 'Email deleted' });
  } catch (err) {
    console.error('❌ Error deleting individual email:', err);
    res.status(500).json({ error: 'Failed to delete email' });
  }
});
//  fake mail to a temp inbox
app.post('/inbox/:id', async (req, res) => {
  const { id } = req.params;
  const { subject, body, from } = req.body;

  const emailDoc = await Email.findOne({ id });

  if (!emailDoc) {
    return res.status(404).json({ error: 'Email ID not found' });
  }

  const newMail = { subject, body, from };
  emailDoc.inbox.push(newMail);
  await emailDoc.save();

  res.status(200).json({ message: 'Fake email added successfully' });
});


