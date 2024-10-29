import { test } from '@japa/runner'

test.group('Quize result', () => {
  test('get user quiz result', async ({ client }) => {
    const response = await client.post('/quiz/result').json({
      quizId: '1',
      userId: '1',
    })

    response.assertStatus(404)
    response.assertBody({ message: 'No results found for this user on the specified quiz' })
  })
})
