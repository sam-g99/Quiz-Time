const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  code: String,
  name: String,
  questions: [{
    num: String,
    question: String,
    options: [String],
    answer: String
  }],
});
const AnswerSchema = new Schema({
  code: String,
  answer: String
})
const Quiz = mongoose.model("Quiz", QuizSchema);
const Answer = mongoose.model("Answer", AnswerSchema)
module.exports = {Quiz, Answer};