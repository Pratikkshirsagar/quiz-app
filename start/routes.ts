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

router.group(() => {
  router.get('/quiz/:id', [QuizzesController, 'getQuiz'])
  router.post('/quiz', [QuizzesController, 'storeQuiz'])
  router.post('/quiz/answer', [QuizzesController, 'storeUserSelectedAnswer'])
  router.post('/quiz/result', [QuizzesController, 'getUserQuizResults'])
})
