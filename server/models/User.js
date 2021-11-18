const { Schema } = mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const prescriptionSchema = new Schema({
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  name: {
    type: String,
    required: true,
    trim: true
  },
  synonym: {
    type: String,
    required: true,
    trim: true
  },
  rxcui: {
    type: Number,
    required: true
  },
  perDay: {
    type: Number,
    min: 0,
    default: 0
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  prescriptions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Prescription'
    }
  ]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = { User, Prescription };
