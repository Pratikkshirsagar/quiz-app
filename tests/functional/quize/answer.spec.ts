import { test } from '@japa/runner'

test.group('Quize answer', () => {
  test('store user answers', async ({ client }) => {
    const response = await client.post('/quiz/answer').json({
      quizId: '1',
      questionId: '1',
      userId: '1',
      selectedOption: 'a',
    })

    response.assertStatus(404)
    response.assertBody({ message: 'Quiz not found' })
  })
})
