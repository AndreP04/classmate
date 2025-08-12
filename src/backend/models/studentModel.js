import mongoose from "mongoose";

const guardianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  relationship: {
    type: String,
    required: true
  }
});

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    grade: {
      type: Number,
      required: true
    },
    institution: {
      type: String,
      required: true
    },
    guardians: {
      type: [guardianSchema],
      validate: {
        validator: function (arr) {
          return arr.length > 0; // At least one guardian
        },
        message: "A student must have at least one guardian."
      }
    }
  },
  {
    collection: "STUDENT"
  }
);

const studentModel = mongoose.model("STUDENT", studentSchema);

export { studentModel };
