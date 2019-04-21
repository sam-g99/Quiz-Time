import Api from '@/services/Api'

export default {
  fetchQuiz (c) {
    return Api().get('quiz',{ params: { code: c }} )
  },
  fetchResults (params){
    return Api().post('results', params)
  },
  addQuiz(params){
    return Api().post('quiz', params)
  }
}