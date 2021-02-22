import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  firstName: { type: String, required: true },
  age: { type: Number, required: true },
  lastName: { type: String, required: true },
  avatar: String,
});

export default model('Todo', userSchema);
