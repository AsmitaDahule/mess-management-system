const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensures email is unique in the database
  },
  password: {
    type: String,
    required: true
  }
});



// // Hash password before saving admin
// adminSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });


module.exports = mongoose.model("admin", adminSchema);