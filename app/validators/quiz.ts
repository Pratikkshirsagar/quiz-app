import vine from '@vinejs/vine'

export const quizValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(1).maxLength(55),
    questions: vine.array(
      vine.object({
        id: vine.string(),
        question: vine.string(),
        answer: vine.string(),
        options: vine.any(),
      })
    ),
  })
)
