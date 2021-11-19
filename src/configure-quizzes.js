/**
 * JavaScript file that contains all the configurations for Wiris Quizzes in the integration
 **/

 export const configureQuizzes = () => {
    var builder = window.com.wiris.quizzes.api.QuizzesBuilder.getInstance()
    var c = builder.getConfiguration()
    c.set(
      window.com.wiris.quizzes.api.ConfigurationKeys.PROXY_URL,
      '/quizzesproxy/quizzes/service'
    )
    c.set(
      window.com.wiris.quizzes.api.ConfigurationKeys.WIRIS_URL,
      'https://www.wiris.net/demo/wiris'
    )
    c.set(
      window.com.wiris.quizzes.api.ConfigurationKeys.WIRISLAUNCHER_URL,
      'https://stateful.wiris.net/demo/wiris'
    )
    c.set(
      window.com.wiris.quizzes.api.ConfigurationKeys.EDITOR_URL,
      'https://www.wiris.net/demo/editor'
    )
    c.set(
      window.com.wiris.quizzes.api.ConfigurationKeys.HAND_URL,
      'https://www.wiris.net/demo/hand'
    )
    c.set(
      window.com.wiris.quizzes.api.ConfigurationKeys.SERVICE_URL,
      'https://www.wiris.net/demo/quizzes'
    )
    c.set(window.com.wiris.quizzes.api.ConfigurationKeys.CALC_ENABLED, 'true')
    c.set(
      window.com.wiris.quizzes.api.ConfigurationKeys.CALC_URL,
      'https://calcme.com'
    )
    c.set(
      window.com.wiris.quizzes.api.ConfigurationKeys.GRAPH_URL,
      'https://www.wiris.net/demo/graph'
    )
    c.set(window.com.wiris.quizzes.api.ConfigurationKeys.HAND_LOGTRACES, 'false')
  }
  