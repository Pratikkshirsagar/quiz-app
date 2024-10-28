/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const QuizzesController = () => import('#controllers/quizzes_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.get('/quiz/:id', [QuizzesController, 'getQuiz'])
  router.post('/quiz', [QuizzesController, 'storeQuiz'])
  router.post('/selected-option', [QuizzesController, 'storeUserSelectedAnswer'])
  router.post('/user-result', [QuizzesController, 'getUserQuizResults'])
})
