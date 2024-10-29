import { test } from '@japa/runner'

test.group('Quize create', () => {
  test('create the quize', async ({ client }) => {
    const response = await client.post('/quiz').json({
      title: 'SQL',
      questions: [
        {
          id: '1',
          question: 'What does SQL stand for?',
          options: {
            a: 'Structured Query Language',
            b: 'Sequential Query Logic',
            c: 'Standard Query Language',
            d: 'Simple Query Language',
          },
          answer: 'a',
        },
        {
          id: '2',
          question: 'Which SQL command is used to retrieve data from a database?',
          options: {
            a: 'INSERT',
            b: 'UPDATE',
            c: 'SELECT',
            d: 'DELETE',
          },
          answer: 'c',
        },
        {
          id: '3',
          question: 'Which of the following is NOT a type of SQL join?',
          options: {
            a: 'INNER JOIN',
            b: 'OUTER JOIN',
            c: 'LEFT JOIN',
            d: 'SIDE JOIN',
          },
          answer: 'd',
        },
        {
          id: '4',
          question: 'In SQL, which keyword is used to filter records?',
          options: {
            a: 'ORDER BY',
            b: 'WHERE',
            c: 'GROUP BY',
            d: 'LIMIT',
          },
          answer: 'b',
        },
        {
          id: '5',
          question: 'Which SQL statement is used to update existing data in a table?',
          options: {
            a: 'CHANGE',
            b: 'ALTER',
            c: 'MODIFY',
            d: 'UPDATE',
          },
          answer: 'd',
        },
      ],
    })

    response.assertStatus(201)
    response.assertBody({
      message: 'Quiz created',
      data: {
        quizId: 1,
      },
    })
  })
})
