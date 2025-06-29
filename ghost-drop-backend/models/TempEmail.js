import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  inbox: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // expires in 10 mins
});

const Email = mongoose.model('Email', emailSchema);

export default Email;
