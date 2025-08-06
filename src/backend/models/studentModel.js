import mongoose from "mongoose";

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
    }
  },
  {
    collection: "STUDENT"
  }
);

const studentModel = mongoose.model("STUDENT", studentSchema);

export { studentModel };
