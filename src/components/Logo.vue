<template>

<div   :class="{small: minify}"  class="logo">
    <router-link to="/"> 
        <h1> Quiz <span class="red">Time</span> </h1>
    </router-link>
  </div>

    
</template>

<script>
export default {
    data(){
        return{
            minify: false
        }
    },
    watch: {
      '$route': {
          immediate: true,
          handler(to, from) {
              if(to.path !== '/' && to.path !== '/make/title' && to.path !== '/take/code'){
                  this.minify = true;
              }else{
                  this.minify = false;
              }
              
          }
      }
      }
}
</script>

<style scoped>
.logo{
  font-size: 4em;
  font-family: 'Sniglet', cursive;
  text-align: center;
  align-self: center;
  top:50%;
  margin-top: -137px;
}
.logo a{
   color: #6AABF6;
}
.small a{
    position: absolute;
    bottom:20px;
    left:10px;
    width:140px;
}

    .small{
        position: fixed;
        bottom:0;
        font-size: 1em;
        left:0;
        margin:0;
        z-index: 100;

    }
    
    @media only screen and (max-width: 600px) {
        .logo{
            font-size: 1em;
        }
    }
</style>
