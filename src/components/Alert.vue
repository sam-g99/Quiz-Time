<template>
    <div class="alert-message">
        <h3>{{ alert }}</h3>
    </div>
</template>

<script>
    export default{
        props: ['alert'],
        data() {
            return{

            }
        }
    }
</script>

<style>
    .alert-message{
        background:rgb(247, 247, 247);
        color: rgb(255, 55, 55);
        position: fixed;
        top:0px;
        padding:1em;
        border-radius: 10px;
        border: 2px solid rgb(255, 55, 55);
        right:0;
        margin:10px;
        opacity: 0;
        z-index:100;
        transition-duration: 1s;
    }
    .showalert{
        opacity: 1;
    }
</style>