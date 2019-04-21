<template>
<div class="make-container">
    <h1> Quiz: {{$route.params.title}}</h1>
        <Alert  v-bind:class="{ showalert: showAlert }" v-bind:alert = "alertMessage"></Alert>
    <div class="make-question">
           <div class="quiz-title">
            
        </div>
    
    <div v-if="!submitted" :class="{newquestion: changingQuestion}" class="questions"  v-for='(question, index) in questions' :key="question.num">
        <div class="section-line" v-if="index > 0"></div>
        <h2> Question {{questions.indexOf(question) + 1}}</h2>
    <div class="question-buttons">
        
    </div>

        <label>Enter Question</label>
        <button @click="removeQuestion(index)" :class="{removeButton: index > 0}" class="remove"> Delete Question {{questions.indexOf(question) + 1}}</button>
        <input v-on:keyup="saveQuestion(questions.indexOf(question),$event)" type="text"  :value="question.question" class="question-name">
    <div class="radio-container">
        
            <RadioButton 
            v-for="(option, index) in question.options" :key="option.num"
            :current="question.num - 1" 
            :data="radioButtonData"
            :indexOfQuestion="questions.indexOf(question)" 
            :optionNum="index"
            :option= "option.option"
            :checked = "option.checked"
            type = "make"
            />
       
    </div>
     
         <button class='add-option' @click="addOption(questions.indexOf(question))">Add option +</button>
        
    </div>
    <button  v-if="questions.length < 10 && !submitted" @click="addQuestion()" class="add"> Add Question {{questions.length + 1}} <span class="plus">+</span></button>
    <div v-if="submitted" class="quiz-code">
        <div class="quiz-code-container">
            <p>Your quizzes code is: <span class="code">{{code}}</span></p>
            <p class="link"> <a :href="`/quiz/${code}`">Click here to check it out!</a>
</p>
        </div>
    </div>
</div>

<button v-if="!submitted" @click="addQuiz()" class="make">Make Quiz!</button>
</div>
    
    
</template>
<script>
import PostsService from '@/services/PostsService'
import Alert from '@/components/Alert.vue'
import { setTimeout } from 'timers';
import RadioButton from '@/components/RadioButton.vue'
export default {
          data() {
    return{
    sending: false,
      changingQuestion: false,
      goodToGo:false,
      submitted: false,
      radioButtonData: {},
      code: Number,
      name: this.$route.params.title,
      optionPlaceholder: 'Enter Option',
      inc: 2,
      questions: [{
        num: 1, 
        question: '',
        options:[{option: '', checked: false, num: 0}, {option: '',checked: false, num: 1}],     
        answer: '',
    }],
      currentQuestion:0,
      alertMessage: '',
      answers:[''],
      showAlert: false
    }
  },
    components:{
        Alert,
        RadioButton

    },

    methods: {
        addQuestion(){
            const amount = parseInt(this.questions.length);
            const cur = this.currentQuestion + 1;
            const prev = this.questions[amount - 1];
            if(amount < 10){
                this.currentQuestion = this.questions.length
                this.questions.push({num:this.questions[amount - 1].num + 1,question: '', options: [{option: '', num: this.inc+=1}, {option: '', num: this.inc+=1}], answer: ''})
             } else {
                this.showAlertMsg('you can only have up to 10 questions');
            }
        }, 
        animateToQuestion(){
                this.changingQuestion = true;
                setTimeout(()=> this.changingQuestion = false, 300)
        },
        validate(qn){
            const q = this.questions[qn];

            let Alert = '';
                if(q.question === ''){Alert = `Please type in your question for question ${qn + 1}`; return Alert}

                if(q.answer === ''){ Alert = `Please set an answer for question ${qn + 1}`; return Alert}

                let hasEmptyOption = false;
                this.questions[qn].options.forEach((x) => {if(x.option === '' && hasEmptyOption !== true) { hasEmptyOption = true}})

                if(hasEmptyOption){ Alert = `Please input all options for question ${qn + 1}`; return Alert}

                return Alert;
        },
        setAnswer(qn, option,on, e){
            if(this.questions[qn].options[on].option === ''){
                this.showAlertMsg('Answer cannot be empty');
                return;
            }
            if(!e.target.parentElement.classList.contains('checked') && !e.target.parentElement.classList.contains('radio-button')){
                e.target.parentElement.parentElement.querySelectorAll('.option').forEach((x) => x.classList.remove('checked'))
                e.target.parentElement.classList.add('checked')
                this.questions[qn].answer = option;
                this.questions[qn].options.forEach((x) => x.checked = false)
                this.questions[qn].options[on].checked = true;
    
                this.showAlertMsg('Answer Set!')
            }
        },
        removeQuestion(qn){
            if(this.questions.length > 1){
                this.questions.splice(qn, 1);
                this.currentQuestion = this.currentQuestion - 1;
            }else{
                this.showAlertMsg('You need at least one question')
            }
        },
        addOption(qn){
            const amount = parseInt(this.questions[qn].options.length) + 1;
            if(amount < 5){
                this.questions[qn].options.push({option: '', checked: false, num: this.inc+=1});
            }else{
                this.showAlertMsg('Only 4 options per questions')
            }
        },
        removeOption(qn, on){
            if(event.target.parentElement.classList.contains('checked')){
                this.questions[qn].answer = '';
            }
            const amount = parseInt(this.questions[qn].options.length) + 1
            if(amount > 3){
                event.target.parentElement.classList.add('come-out');

                this.questions[qn].options.splice(on, 1);
            }else{
                this.showAlertMsg('You need at least 2 options')
            }
        },
        showQuestion(qn){
            this.currentQuestion = qn;
        },
        showAlertMsg(msg){
            if(this.showAlert !== true){
                this.showAlert = true;
                this.alertMessage = msg;
                setTimeout(() => this.showAlert = false, 1100);
            }
        },
        saveQuestion(qn, e){
            this.questions[qn].question = e.target.value;
        },
        saveOption(qn, on){
            if(event.target.parentElement.classList.contains('checked')){
                this.questions[qn].answer = event.target.value;
            }
            this.questions[qn].options[on].option = event.target.value;
        },
         async addQuiz () {
             let index = -1;
             let valid = true;
             let error = '';
             this.questions.forEach((q) => {if(this.validate(index+=1) !== '' && valid === true){ valid = false; error = this.validate(index)}});
             if(!valid){
                 this.showAlertMsg(error);
                 return;
             }
             this.sending = true;
            this.questions.forEach((x) => {
                let oArray = [];
                x.options.forEach((o) =>{
                    oArray.push(o.option)
                })
                x.options = oArray;
            }) 
        const response = await PostsService.addQuiz({
            name: this.name,
            questions: this.questions,
        })
        this.code = response.data.code;
        this.submitted = true;
        }
    },
        watch: {
    setRadioData:function(){   
      
    }},
    computed:{
        setRadioData(){
            this.radioButtonData = {
                saveOption: this.saveOption,
                radFunction: this.setAnswer,
                placeholder: this.optionPlaceholder,
                removeOption: this.removeOption
            }
        },
  
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}
.loader {
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid #3498db; /* Blue */
  border-radius: 50%;
  align-self: center;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;

}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.quiz-code-container{
    font-size: 1.5em;
}
.link a{
    color:#3498db;
}
.code{
    color: green;
    font-weight: bold;
}
.section-line{
    width:100%;
    height:2px;
    margin-top:50px;
    margin-bottom:50px;
    background: rgb(172, 172, 172);
}
.loading{
    top:0;
    left:0;
    position: fixed;
    width:100vw;
    padding:0;
    height: 100vh;
    margin:0;
    background: white;
    z-index: 100;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-content: center;
}
.remove{
    background-color: rgb(255, 255, 255);
    border: 1.3px solid rgb(255, 73, 82);
    padding: 15px;
    color: rgb(255, 73, 82);
    font-size: 1.1em;
    position: absolute;
    top: 0;
    right:0;
    height: 30px;
    line-height: 0px;
}
.removeButton{
    top:100px;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.newquestion{
    opacity:0;
    transition: opacity .3s;
}
*{
    font-family: 'Roboto'
}
.question-buttons{
    margin-bottom: 10px;
}
select{
    width:130px;
    border:none;
    font-size: 1.1em;
    cursor: pointer;
    border-radius: 100px;
    background: rgb(73, 73, 73);
    color:white;
    padding:.2em;
}
select:focus{
    outline:none;
}
option{
    background-color: gray;
    cursor: pointer;
    
}
h1{
    color: #3A3A3A;
    margin-bottom:30px;
}
label{
    color:gray;
    font-size: 1.5em;
}
    button:focus{
    outline: none;
}
button{
    cursor: pointer;
}
    input{
        border:none;
    }
    input:focus{
        outline:none;
    }
.logo{
    font-size:1em;
    position: absolute;
    bottom:0;
}
.quiz-title{
    font-family: 'Roboto'
}
    .question-name{
        height:50px;
        padding: .4em;
        color:#3c3c3c;
        border: 2px solid #ccc;
        font-size: 1.3em;
        border-radius: 5px;
        margin-bottom:10px;
    }
    .question-name::placeholder{
        color:rgb(153, 153, 153);
    }
    .questions{
        display: flex;
        flex-flow: column;
        transition: opacity .5s;
        position: relative;
    }

    .add-option{
        border:2px solid gray;;
        padding:.4em;
        margin-top: 20px;
        background: rgb(255, 255, 255);
        color:rgb(114, 114, 114);
        font-weight: 500;
        width:50%;
        border-radius: 5px;
        align-self: center;
        font-size: 1.3em;
        cursor: pointer;
        transition-duration: .3s;
    }
    .add-option:hover{
        color: #4e4e4e;
        border-color: #4e4e4e;
    }

        .add{
            background: rgb(255, 255, 255);
            border: 2px solid #6AABF6;
            color: #6AABF6;
            padding:.4em;
            border-radius: 2px;
            padding:1em;
            font-size: 1.2em;
            margin: 0 auto;
            margin-left: calc(50% - 100px);
            margin-top: 53px;
        }
        .plus{
            
        }
        .space{
            margin-right: 20px;
        }
        .make-container{
            width: 90%;
            max-width: 700px;
            min-width:300px;
            position: relative;
            min-height: 80vh;
            margin-top:5%;
            padding-bottom: 100px;

        }
        .make{
        background-color: rgb(255, 73, 82);
        padding:.8em;
        border:none;
        color:white;
        font-size: 1.6em;
        border-radius: 2px;
        margin-top:50px;
        float: right;
        height:50px;
        line-height: 0px;
    }

</style>

