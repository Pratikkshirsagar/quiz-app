import type { HttpContext } from '@adonisjs/core/http'
import { quizValidator } from '#validators/quiz'
import { storeAnswersValidator } from '#validators/store_answer'
import { getResultValidator } from '#validators/get_result'

interface QuizDB {
  quiz: {
    [quizId: string]: {
      title: string
      questions: {
        id: string
        question: string
        options: { [key: string]: string }
        answer: string
      }[]
    }
  }
  result: {
    [userId: string]: {
      [quizId: string]: {
        [questionId: string]: {
          selectedOption: string
          isCorrect: boolean
        }
      }
    }
  }
}

const db: QuizDB = {
  quiz: {},
  result: {},
}

export default class QuizzesController {
  getQuiz({ request, response }: HttpContext) {
    const { id } = request.params()

    // Check if quiz exists
    const quiz = db.quiz[id]
    if (!quiz) {
      return response.status(404).json({ message: 'Quiz not found' })
    }

    const quizWithoutAnswers = {
      title: quiz.title,
      questions: quiz.questions.map((question) => {
        return {
          id: question.id,
          question: question.question,
          options: question.options,
        }
      }),
    }

    return response.status(200).json({ message: 'Success', data: quizWithoutAnswers })
  }

  async storeQuiz({ request, response }: HttpContext) {
    // validating request
    const payload = await request.validateUsing(quizValidator)

    const { title, questions } = payload
    const quizId = Object.keys(db.quiz).length + 1

    db.quiz[quizId] = { title, questions }

    return response.status(201).json({ message: 'Quiz created', data: { quizId } })
  }

  async storeUserSelectedAnswer({ request, response }: HttpContext) {
    // validating request
    const payload = await request.validateUsing(storeAnswersValidator)

    const { quizId, questionId, selectedOption, userId } = payload

    // Check if quiz exists
    const quiz = db.quiz[quizId]
    if (!quiz) {
      return response.status(404).json({ message: 'Quiz not found' })
    }

    // Check if question exists in the quiz
    const question = quiz.questions.find((q) => q.id === String(questionId))
    if (!question) {
      return response.status(404).json({ message: 'Question not found' })
    }

    // Initialize user and quiz results if they don't exist
    if (!db.result[userId]) {
      db.result[userId] = {}
    }
    if (!db.result[userId][quizId]) {
      db.result[userId][quizId] = {}
    }

    // Check if the question has already been answered
    if (db.result[userId][quizId][questionId]) {
      return response.status(400).json({ message: 'This question has already been answered.' })
    }

    // Determine if the answer is correct
    const isCorrect = question.answer === selectedOption

    // Store the selected answer and correctness
    db.result[userId][quizId][questionId] = {
      selectedOption,
      isCorrect,
    }

    // Respond with feedback
    if (isCorrect) {
      return response.status(200).json({ message: 'Correct answer!' })
    }

    return response.status(200).json({
      message: 'Incorrect answer',
      correctAnswer: question.answer,
    })
  }

  async getUserQuizResults({ request, response }: HttpContext) {
    // validating request
    const payload = await request.validateUsing(getResultValidator)

    const { quizId, userId } = payload

    // Check if the quiz exists
    const quiz = db.quiz[quizId]
    if (!quiz) {
      return response.status(404).json({ message: 'Quiz not found' })
    }

    // Check if there are results for the user and quiz
    const userQuizResults = db.result[userId]?.[quizId]
    if (!userQuizResults) {
      return response
        .status(404)
        .json({ message: 'No results found for this user on the specified quiz' })
    }

    // Calculate the score and build a summary of each answer
    let score = 0
    const summary = quiz.questions.map((question) => {
      const answerRecord = userQuizResults[question.id]
      const isCorrect = answerRecord?.isCorrect || false

      if (isCorrect) {
        score += 1 // Increment score for each correct answer
      }

      return {
        questionId: question.id,
        question: question.question,
        selectedOption: answerRecord?.selectedOption || null,
        isCorrect,
      }
    })

    return response.status(200).json({
      message: 'Quiz results retrieved successfully',
      data: {
        score,
        totalQuestions: quiz.questions.length,
        summary,
      },
    })
  }
}
