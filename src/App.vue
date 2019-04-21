
<template>

  <div class="container">
    <Logo></Logo>
      <Alert  v-bind:class="{ showalert: showAlert }" v-bind:alert = "alertMessage"></Alert>
    <router-view></router-view>
  <footer><p> Made by <a target="_blank" href="https://github.com/sam-g99"> sam-g99</a></p> </footer>
  </div>

</template>

<script>

import PostsService from '@/services/PostsService'
import Alert from './components/Alert.vue'
import Logo from './components/Logo.vue'
export default {
  name: 'app',
  data() {
    return{
    posts: [],
    alertMessage: 'Teest'
    }
  },
  components: {
    Alert,
    Logo
  },
  methods:{
    async getPosts (){
      const response = await PostsService.fetchPosts()

      this.posts = response.data;
    },
  }



}
</script>

<style>
*{
  padding:0;
  margin:0;
  box-sizing: border-box;
}
.btn{
  user-select: none;
}
footer{
  position: absolute;
  width:100%;
  padding:1em;
  bottom:0;
}
footer p{
  float:right;
  font-family: 'Roboto', sans-serif;
  color:rgb(90, 90, 90);
}
footer a{
  color: rgb(53, 140, 255);
}
.container{
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0;
  margin:0;
}


.red{
  color:#FF6868;
}
  body{
   
  }
  .btn{
    border:none;
    background-color: rgb(53, 140, 255);
    color:white;
    padding:5px;
    margin-top:3px;
    cursor: pointer;
    float:left;
  }
  button:hover{
    background-color: rgb(255, 65, 90);
  }
  a { 
    text-decoration: none;
    color: black;
  }

</style>
