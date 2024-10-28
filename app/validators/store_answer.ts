import vine from '@vinejs/vine'

export const storeAnswersValidator = vine.compile(
  vine.object({
    quizId: vine.string(),
    questionId: vine.string(),
    selectedOption: vine.string(),
    userId: vine.string(),
  })
)
