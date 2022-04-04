const mongoose = require("mongoose");

const Employee = mongoose.model("Employee", {
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
});
module.exports = { Employee };
