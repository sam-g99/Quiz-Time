import Vue from 'vue'

import Router from 'vue-router'

import Options from './components/Options.vue'

import MakeQuiz from './components/MakeQuiz.vue'

import Quiz from './components/Quiz.vue'

Vue.use(Router)

const router = new Router ({
    mode: 'history',
    routes: [
        {
        path:'/(|make/title|take/code)',
        component: Options,

    },
    {
        path: '/make/quiz/:title',
        component: MakeQuiz
    },
    {
        path: '/quiz/:code',
        component: Quiz
    }
    ],
})

export default router