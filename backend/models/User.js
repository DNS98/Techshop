import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema(
  {
    nume: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);
//compara parola salvara in baza de date cu parola introdusa de utilizator la login 
userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  //daca nu este modificata se continua 
  if (!this.isModified('password')) {
    next();
  }
  // Parola utilizatorului este înlocuită cu parola hash în obiectul utilizatorului.
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;
