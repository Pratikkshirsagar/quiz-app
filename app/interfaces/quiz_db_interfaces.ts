export default interface QuizDB {
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
