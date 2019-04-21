<template>

    <div class="container">
         <Alert  v-bind:class="{ showalert: showAlert }" v-bind:alert = "alertMessage"></Alert>
       
        <div class="quiz-title">
            <h2> Quiz: {{title}} </h2>
        </div>
        <div v-if="!submited" class="questions-container" v-for="question in questions" :key="question.num">
            <h3>{{ question.question }}</h3>
        
                        <RadioButton 
            v-for="option in question.options" :key="option"
            :option= "option"
            :radFunction = "setAnswer"
            :indexOfQuestion = "questions.indexOf(question)"
            type = 'take'
            />
        </div>
        <button v-if="!submited" class="submit" @click="getResults()">Submit Quiz!</button>
        <div class="results"> {{results}} </div>
      
        <div v-if="submited" @click="retake" class="btn take-again">Try Again</div>
 
        <router-link to="/">
            <div v-if="submited" class=" btn home">Home Page</div>
        </router-link>
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
        code: this.$route.params.code,
        title: '',
        questions: '',
        uAnswers: [],
        results: '',
        submited: false,
        showAlert: false,
        alertMessage: '',
    }
    },
    mounted (){
        this.getData()
    },
    components:{
        Alert,
        RadioButton
    },
    methods: {
        retake(){
            window.location.reload();
        },
        setAnswer(a, qn, e){
            e.target.parentElement.parentElement.querySelectorAll('.option').forEach((x) => x.classList.remove('checked'))
            e.target.parentElement.classList.add('checked');
            if(this.uAnswers.length === 0){
                this.uAnswers.push({answer: a, num: qn});
                return;
            }
    
            this.uAnswers.forEach((x) => {
                if(x.num === qn){
                    x.answer = a;
                }else if(this.checkNum(qn) !== true){
                    this.uAnswers.push({answer: a, num: qn})
                }
            })
    
        },
        checkNum (n){
                for(let i = 0; i < this.uAnswers.length; i+=1){
                    if(this.uAnswers[i].num === n){
                        return true;
                        break;
                    }
                }
            },
        showAlertMsg(msg){
            if(this.showAlert !== true){
                this.showAlert = true;
                this.alertMessage = msg;
                setTimeout(() => this.showAlert = false, 1100);
            }
        },
        async getData (){
            const response = await PostsService.fetchQuiz(this.code)
            this.questions = response.data.questions
            this.title = response.data.name

        },
        async getResults(){
            if(this.questions.length > this.uAnswers.length){
                this.showAlertMsg('Please answer all questions');
                return;
            }
            const response = await PostsService.fetchResults({code: this.code, uAnswers: this.uAnswers})
            const amount = response.data.results.length;
            let right = 0; 
            response.data.results.forEach((r) => {if(r === true){right+=1}}); 
            const percent = parseInt((right/amount) * 100, 10);
             this.results = `You got ${right} answeres correct out of ${amount}, so you got a ${percent}%`;
             this.submited = true;
        },
    }
}
  </script>

  <style scoped>
  .results{
        font-family: 'Roboto';
        color: #484848;
        font-size: 1.3em;
        text-align: center;
        margin-top: 30px;
        margin-bottom: 20px;
  }
  .container{
      width:100%;
      justify-content: flex-start;   
  }
  .quiz-title{
      margin-top:20px;
      font-family: 'Roboto';
      font-size: 2em;
      align-self: flex-start;
  }
  .questions-container{
      display: flex;
      flex-flow:column;
      width: 80%;
      max-width: 600px;
  }
  .option-input{
      border:none;
  }
  h2{
      margin-left:10px;
  }
    .radio-button{
        width:30px;
        height: 30px;
        border-radius: 100%;
        background: white;
        border: 2px solid #ccc;
        cursor: pointer;
        top:12px;
        left:10px;
        cursor: pointer;
        float: left;
        margin-top: 5px;
        margin-left:5px;
    }

    .option{
        width:100%;
        min-width: 300px;
        max-width: 400px;
        position: relative;
        margin-top:20px;
        background: rgb(255, 255, 255);
        color:white;
        font-family: 'Roboto';
        line-height: 40px;
        height:40px;
    }
    .option p{
        float:left;
        margin-left: 10px;
    }
    h3{
        margin:0;
        margin-top:50px;
        font-family: 'Roboto';
        color:rgb(27, 27, 27);
        font-size: 1.4em;
    }
    .submit{
        width:140px;
        height:50px;
        background: rgb(3, 182, 3);
        margin-top:20px;
        border:none;
        border-radius: 5px;
        font-size: 1.3em;
        color:white;
        cursor: pointer;
        transition: background .3s;
    }
    .submit:hover{
        background: rgb(0, 141, 0);
    }
    .submit:focus{
        outline:none;
    }
  </style>
