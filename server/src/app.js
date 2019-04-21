const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.set('port', process.env.PORT || 8081);
app.listen(process.env.PORT || 8081)

var mongoose = require('mongoose');
mongoose.connect('');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

const {Quiz} = require('../models/quiz');

app.post('/quiz', (req, res) => {
  const  code = Math.floor(Math.random() * 100000000000000);
  const name = req.body.name;
  const questions = req.body.questions;
  const new_post = new Quiz({
    code: code,
    name: name,
    questions: questions,
  })

  new_post.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      code: code
    })
  })
})
app.post('/results', (req, res) => {
  Quiz.findOne({'code': req.body.code}, 'questions', (error, quiz) =>{
    if(quiz){
      let results = [];
    req.body.uAnswers.forEach((x) =>{ 
      if(x.answer === quiz.questions[x.num].answer){
        results.push(true);
      }else{
        results.push(false);
      }
    })
    console.log(results)
    res.send({
      results: results
    })
  } //ELSE 404 ERROR
  })
})
app.get('/quiz', (req, res) => {
  Quiz.findOne({'code': req.query.code}, 'name questions', (error, quiz) =>{
    if(quiz){
    const questions = [];
    quiz.questions.forEach((x) => questions.push({question: x.question, options: x.options}))
    const name = quiz.name;
    res.send({
      name:name,
      questions: questions
    })
  } else{
    res.send({
      name: false
    })
  }
  })
})