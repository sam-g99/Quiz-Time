<template>
<div  class="option">
    <div v-if="type === 'take'" class="radio-button take-radio-button" @click="radFunction(option,indexOfQuestion, $event)" >
        <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="17.1864" height="6.37379" transform="matrix(0.837053 0.547122 -0.567782 0.823179 3.61914 15.8283)" fill="#5CE091"/>
<rect width="33.5654" height="6.90427" transform="matrix(0.527509 -0.84955 0.861866 0.507137 11.3438 28.5155)" fill="#5CE091"/>
</svg>

    </div>
    <div v-if="type === 'make'" class="radio-button" @click="data.radFunction(indexOfQuestion,option,optionNum, $event)" >
        <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="17.1864" height="6.37379" transform="matrix(0.837053 0.547122 -0.567782 0.823179 3.61914 15.8283)" fill="#5CE091"/>
<rect width="33.5654" height="6.90427" transform="matrix(0.527509 -0.84955 0.861866 0.507137 11.3438 28.5155)" fill="#5CE091"/>
</svg>

    </div>
    <input v-if="type === 'make'" @keyup="data.saveOption(indexOfQuestion, optionNum)" type="text" :placeholder="data.placeholder" :value="option" class="option-input">
    <input v-if="type === 'take'"  disabled='true' :value="option" class="option-input take-input">
    <button v-if="type === 'make'" class="delete-option" @click="data.removeOption(indexOfQuestion, optionNum)">X</button>
</div>
</template>

<script>
export default {
        props: {
            data:Object,
            option:'',
            indexOfQuestion:'',
            radFunction: Function,
            optionNum:'',
            event:'',
            current:'',
            checked:'',
            type:String,
        },

}

</script>

<style scoped>
/*@keyframes comeIn {
    to {transform: scale(1)}
}*/
/*@keyframes comeOut {
    to {transform: scale(0);}
}*/
    .option{
        width:100%;
        position: relative;
        margin-top:10px;
        
    }
    .comein{
        transform: scale(0);
        animation: comeIn .3s forwards 1;
    }
    .come-out{
        transform: scale(1);
        animation: comeOut .3s forwards 1;
    }
    ::placeholder{
        color:rgb(100, 100, 100);
        font-family: 'Roboto'
    }
input{
    background:blue;
}

    svg{
        width: 20px;
        margin-left: 4px;
        display:none;
    }
        .option-input{
        width:100%;
        background: rgb(255, 255, 255);
        border: 2px solid rgb(168, 168, 168);
        float:right;
        color:rgb(78, 78, 78);
        border-radius: 5px;
        font-size: 1.4em;
        padding:.4em;
        align-self: center;
        transition: background .2s;
    }
 
    .radio-button{
        width:44px;
        height: 40px;
        border-radius: 100%;
        background: rgb(255, 255, 255);
        display: inline-block;
        border: 2px solid #a8a8a8;
        cursor: pointer;
        align-self: center;
        top:12px;
        left:10px;
        cursor: pointer;
        margin-right:10px;
        user-select: none;
    }
    .take-radio-button{
        width:46px;
    }
     .check{
        background: green;
    }
        .checked input{
        border:solid 2px #60BF86;
        color: #60bf86;
    }
    .checked .radio-button{
        background-color: #60BF86;
        border:solid 2px #60BF86;
    }

    .checked .circle{
        display: block;
    }
        .delete-option{
        border: none;
        margin-left: 10px;
        -ms-flex-item-align: center;
        align-self: center;
        background: rgba(0, 0, 255, 0);
        font-family: 'Roboto';
        color: rgb(116, 116, 116);
        font-size: 1.3em;
        position: absolute;
        color: #B5B5B5;
        right: 9px;
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
    .option{
        width:100%;
            display: flex;
        position: relative;
        margin-top:10px;
        height:50px;
        align-content: center;
    }
    ::placeholder{
        color:rgb(99, 99, 99);
        font-family: 'Roboto';

    }

   .deleted-option{
        transform: scale(0);
        animation:none;
    }
    .take-input{
        border:none;
    }
    .checked .take-radio-button{
        background: #50a2ff;
        border-color: #50a2ff;
    }
    .checked .take-input{
        border:none;
        color: #50a2ff;
    }




   

</style>
