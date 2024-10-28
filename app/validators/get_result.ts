import vine from '@vinejs/vine'

export const getResultValidator = vine.compile(
  vine.object({
    quizId: vine.string(),
    userId: vine.string(),
  })
)
