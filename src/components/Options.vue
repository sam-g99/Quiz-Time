<template>
<div>
    
    <div v-bind:class="{form: makingQuiz, takeForm: takingQuiz}" class="options">
        
        <div :class="{hidebutton : takingQuiz}" @click="make()" class="text make-text show-button"> 
            <div v-if="makingQuiz" class="back-button"> &#8592; </div>
            Make Quiz 
        </div>
        
        <div :class="{hidebutton : takingQuiz}"  @click="make()" class="btn make-quiz show-button">
            <div class="light"></div>
            <input v-on:keyup.enter="title($event)" v-if="makingQuiz" ref="name" type= "text" name="" placeholder="Name your quiz" id="nameQuiz" autofocus>
        </div>
        <h3 class="or-text"> OR </h3>
        
        <div :class="{hidebutton : makingQuiz}" @click="take()"  class="text take-text show-button">
            <div v-if="takingQuiz" class="back-button"> &#8592; </div>
            Take Quiz
            </div>

        <div :class="{hidebutton : makingQuiz}" @click="take()" class="btn take-quiz show-button">
            <div class="light"></div>
            <input v-on:keyup.enter="code($event)" v-if="takingQuiz" ref="code" type= "text" name="" placeholder="Enter Quiz Code" id="">
        </div>
        <router-link to="/quiz/demo">
        <p class="demo"> Take the quick Demo Quiz! </p>
        </router-link>
        
   </div>
</div>
</template>

<script>
import router from '@/router'
import PostsService from '@/services/PostsService'
    export default {
          data() {
    return{
      makingQuiz: false,
      takingQuiz: false,
    }
  },
    watch: {
      '$route': {
          immediate: true,
          handler(to, from) {
              if(to.path === '/make/title'){
                  this.makingQuiz = true;
              }else{
                  this.makingQuiz = false;
              }
               if(to.path === '/take/code'){
                  this.takingQuiz = true;
              }else{
                  this.takingQuiz = false;
              }
          }
      }
      },
  
    methods: {
        make() {
                if(event.target.classList.contains('back-button')){
                     router.push('/')
                     return;
                }
                router.push('/make/title')
                setTimeout(() => {this.$refs.name.focus()} , 0)
        },

        take() {
            if(event.target.classList.contains('back-button')){
                    router.push('/')
                    return;
            }
            router.push('/take/code') 
            setTimeout(() => {this.$refs.code.focus()} , 0)

        },
        title(e){
            const title = e.target.value;
            router.push(`/make/quiz/${title}`)
        },
        async getData (c){
            const response = await PostsService.fetchQuiz(c)

            return response.data.name

        },
        code(e){
            const code = e.target.value;
            let quizExist;

            this.getData(code).then((x) =>{  
                if(x !== false){
                    router.push(`/quiz/${code}`)
                }else{
                    alert('That doesnt exist')
                }
            
            }) 
        },
    }
}
</script>

<style scoped>
/* Animations*/
@keyframes comeIn {
    to {transform: scale(1)}
}
@keyframes scaleDown{
    to {transform: scale(0)}
}
/*Default Style*/

.options{
  align-self: center;
  margin-top: 5em;
 
}
.back-button{
    position: absolute;
    cursor:pointer;
}
.btn{
    display: block;
    width:230px;
    height:70px;
    border-radius: 25px;
    padding:20px;
    line-height: 30px;
    box-shadow: 2px 0px 2px #ccc;
    text-align: center;
    overflow: hidden;
    position: relative;
    will-change: transform;
    transition-duration: .3s;
    backface-visibility: hidden;
    -webkit-font-smoothing: subpixel-antialiased;
    -webkit-font-smoothing: antialiased;
    
    backface-visibility: hidden;
    top: -42px;
}
.show-button{
    transform: scale(0);
    animation: comeIn .3s forwards 1;
}
.btn:hover{
    box-shadow: 0px 2px 2px rgb(20, 20, 20);
}
.btn:hover > .light{
    transform: translateX(290px) rotatez(20deg) translate3d(0, 0, 0);
}
.make-quiz{
        background-color: #FF5252;
        position: absolute;
}
.take-quiz{
    background-color: #5CE091;
    position: absolute;
    right: 0;
    
}
.demo{
    color: rgb(67, 138, 219);
    position: absolute;
    bottom:0;
    font-family: 'Roboto';
    bottom:-100px;
    width:100%;
    text-align: center;
    font-size: 1.3em;
}
.light{
    width:50px;
    height: 200px;
    position: absolute;
    background-color:rgba(211, 211, 211, 0.589);
    top:-20px;
    transform: none;
    transform: translateX(-100px) rotatez(20deg) translate3d(0, 0, 0);
    will-change: transform;
    transition: transform .3s linear;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    filter: blur(3px) 
}
input{
    border:none;
    height: 40px;
    font-family: 'Roboto', sans-serif;
    font-size: 1.3em;
    background-color:rgb(255, 255, 255);
    border-radius: 5px;
    bottom:0;
    position: absolute;
    width:90%;
    left:5%;
    bottom:15px;
    padding:1em;
    box-shadow: 2px 0px 2px rgba(58, 58, 58, 0.418);
    
}
input:focus{
    outline: none;
    
}
.text{
    position: absolute;
    z-index: 1;
    top:35px;
    line-height: 5px;
    text-align: center;
    width:230px;
    font-size: 2em;
    font-family: 'Roboto', sans-serif;
    color:white;
    cursor:pointer;
      transition-duration: .3s;
      top:-6px;
}
.make-text{
    left: 0;
}
.take-text{
    right:0;
}
.take-text:hover ~ .take-quiz{
    box-shadow: 0px 2px 2px rgb(20, 20, 20);
}
.make-text:hover ~ .make-quiz{
    box-shadow: 0px 2px 2px rgb(20, 20, 20);
}
.make-text:hover  ~ .make-quiz .light{
    transform: translateX(290px) rotatez(20deg) translate3d(0, 0, 0);
}
.take-text:hover  ~ .take-quiz .light{
    transform: translateX(290px) rotatez(20deg) translate3d(0, 0, 0);
}
.or-text{
    position: absolute;
    left:50%;
    margin-left: -.7em;
    top: 50%;
    margin-top: -.7em;
    align-self: center;
    color:gray;
    font-family: 'Roboto', sans-serif;
    font-size: 2.2em;
    font-weight: bold;
    z-index: -1;
}

.options{
    width: 550px;
    position: relative;
}

/* Form Mode Make Quiz*/
.form .or-text{
    display: none;
}
.form .text{
    left:130px;
  
}
.form .make-quiz{
    width:300px;
    height: 115px;
    margin-left: 100px;
}
.form .make-quiz > .light{
    transform: translateX(290px) rotatez(20deg) translate3d(0, 0, 0);
}
.form .make-quiz:hover{

    box-shadow: none;
    cursor: default;;
}

.form .take-quiz{
    transform: scale(1);
    animation: scaleDown .3s 1 forwards;
}
/*Form Mode Take Quiz*/
.takeForm .or-text{
    display: none;
}
.takeForm .make-text{
    display: none;
}
.takeForm .text{
    left:130px;
}
.takeForm .take-quiz{
    width:300px;
    height: 115px;
    margin-right:150px;
}


    @media only screen and (max-width: 600px) {
        .options{
            display:flex;
            flex-flow: column;
            width:auto;
            justify-content: center;
            align-content: center;
            width:100%;
            margin-top:20px;
        }
        .logo{
            position: static;
        }
        .or-text{
            margin-top:-20px;
            
        }
        .text{
            font-size: 2.9em;
            right:50%;
            left:50%;
            margin-left: -2.5em;
        }
        .take-text{
            top:230px;
        }
        .make-text{
            top:50px;
        }
        .btn{
            width:90vw;
            align-self: center;
            height: 100px;
            position: static;
            margin: 0;
        }
        .btn:last-of-type{
            margin-top:80px;
        }
        .form .or-text{
            display: none;
        }
/* FORM MODE MAKE QUIZ */
    .form .text{
        left:50%;
    }
    .form .make-quiz{
           width:90vw;
        height: 150px;
        margin-left: 0;
    }
    .form .make-quiz > .light{
        transform: translateX(290px) rotatez(20deg) translate3d(0, 0, 0);
    }
    .form .make-quiz:hover{
        transform: scale(1);
        box-shadow: none;
        cursor: default;;
    }
    .back-button{
        top: -21px;
        left: -27px;
        margin: 0;
        position: absolute;
        font-size: 0.7em;
    }
  .takeForm .take-quiz{
    width:90vw;
    height: 150px;
    margin-top:-100px;
    margin-right:0px;
}
.takeForm .text{
    top:30%;
    left:50%;
}
    }
    .hidebutton{
        transform: scale(1);
        animation: scaleDown .3s 1 forwards;
    }
</style>