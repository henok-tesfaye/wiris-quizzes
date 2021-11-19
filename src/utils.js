// const cache = {}

export const asyncCheckStudentAnswer = async (
  questionConfiguration, studentAnswer, otherConfigurations) => {
  const configurations = getConfigurations(questionConfiguration, otherConfigurations)
  // const key = configurations.join('&') + '&studentAnswer' + studentAnswer

  // if (typeof cache[key] === 'boolean') {
  //   return cache[key]
  // }

  const correctAnswer = ''

  if (correctAnswer.toLowerCase() === studentAnswer.toLowerCase()) return true

  if (correctAnswer.indexOf('<mtext>') > 0 || studentAnswer.indexOf('<mtext>') > 0 ||
    studentAnswer.indexOf('<math') < 0) {
    const d1 = document.createElement('div')
    const d2 = document.createElement('div')
    d1.innerHTML = cleanupMathMLForText(correctAnswer)
    d2.innerHTML = cleanupMathMLForText(studentAnswer)
    if (d1.innerText === d2.innerText) return true
  }

  const result = await Promise.all(
    configurations.map(
      configuration => checkStudentAnswer(configuration, studentAnswer)
    )
  )

  return result.includes(true)
}

export const checkStudentAnswer = async (configuration, studentAnswer) => {
  const builder = window.com.wiris.quizzes.api.QuizzesBuilder.getInstance()
  const question = builder.readQuestion(configuration)
  const instance = builder.newQuestionInstance(question)

  const uibilder = builder.getQuizzesUIBuilder()
  const authoringField = uibilder.newAuthoringField(question, null, 0)
  authoringField.setFieldType('studio')
  authoringField.showVariablesTab(true)
  authoringField.showGradingFunction(true)

  const correctAnswer = authoringField.value

  question.setCorrectAnswer(0, correctAnswer)
  instance.setStudentAnswer(0, studentAnswer)

  const service = builder.getQuizzesService()
  const request = builder.newFeedbackRequest('', question, instance)
  const response = await executeService(service, request)
  instance.update(response)

  return instance.getAnswerGrade(0, 0, question) >= 0.99
}

const getConfigurations = (questionConfiguration, otherConfigurations) => {
  if (!otherConfigurations) return [questionConfiguration]

  return [questionConfiguration, ...otherConfigurations]
}

export const executeService = (service, request) => {
  return new Promise(function (resolve, reject) {
    try {
      service.executeAsync(request, {
        onResponse: function (res) {
          resolve(res)
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}

export const cleanupMathMLForText = a =>
  a.replace(/<mfenced>/g, '<mo>(</mo>').replace(/<\/mfenced>/g, '<mo>)</mo>') // Replace mfenced
