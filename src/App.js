import { useEffect, useState, useRef } from 'react';
import { configureQuizzes } from './configure-quizzes';
import { asyncCheckStudentAnswer } from './utils';

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const editorRef = useRef()

  useEffect(() => {
    loadWirisScript()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    loadMathtype()

    assertWirisQuizzes()
  }, [isLoaded])

  const loadWirisScript = () => {
    const script = document.createElement('script')
    script.id = 'wirisScript'
    script.src = 'https://www.wiris.net/demo/editor/editor'
    script.onload = () => onWirisLoad()
    document.body.appendChild(script)
  }

  const onWirisLoad = () => {
    const quizzesScript = document.createElement('script')
    quizzesScript.id = 'wirisQuizzes'
    quizzesScript.src = '/quizzes/resources/quizzes.js'
    quizzesScript.onload = () => onWirisQuizzesLoad()
    document.body.appendChild(quizzesScript)
  }

  const onWirisQuizzesLoad = () => {
    configureQuizzes()
    setIsLoaded(true)
  }

  const loadMathtype = () => {
    const editor = window.com.wiris.jsEditor.JsEditor.newInstance({ lanuague: 'en' })
    editor.insertInto(editorRef.current)
  }

  const assertWirisQuizzes = async () => {
    const configuration = `<question><correctAnswers><correctAnswer type="mathml"><![CDATA[<math xmlns="http://www.w3.org/1998/Math/MathML"><mn>12</mn></math>]]></correctAnswer></correctAnswers><assertions><assertion name="syntax_quantity"><param name="units"><![CDATA[m, s, g, °, ', ", $, ¥, €, £, kr, Fr, ₩, ₹, руб, BTC, %, ‰, A, K, mol, cd, rad, sr, h, min, l, N, Pa, Hz, W, J, C, V, Ω, F, S, Wb, b, H, T, lx, lm, Gy, Bq, Sv, kat]]></param><param name="decimalseparators">., \,</param><param name="unitprefixes">M, k, c, m</param></assertion><assertion name="equivalent_symbolic"/></assertions><options><option name="tolerance">0.003</option><option name="relative_tolerance">true</option><option name="precision">4</option><option name="times_operator">·</option><option name="implicit_times_operator">false</option><option name="imaginary_unit">i</option></options><localData><data name="inputField">inlineEditor</data><data name="gradeCompound">and</data><data name="gradeCompoundDistribution"></data></localData></question>`
    const otherConfigurations = [
      `<question><correctAnswers><correctAnswer type="mathml"><![CDATA[<math xmlns="http://www.w3.org/1998/Math/MathML"><mo>$</mo><mn>12</mn></math>]]></correctAnswer></correctAnswers><assertions><assertion name="syntax_quantity"><param name="units"><![CDATA[m, s, g, °, ', ", $, ¥, €, £, kr, Fr, ₩, ₹, руб, BTC, %, ‰, A, K, mol, cd, rad, sr, h, min, l, N, Pa, Hz, W, J, C, V, Ω, F, S, Wb, b, H, T, lx, lm, Gy, Bq, Sv, kat]]></param><param name="decimalseparators">., \,</param><param name="unitprefixes">M, k, c, m</param></assertion><assertion name="equivalent_symbolic"/></assertions><options><option name="tolerance">0.003</option><option name="relative_tolerance">true</option><option name="precision">4</option><option name="times_operator">·</option><option name="implicit_times_operator">false</option><option name="imaginary_unit">i</option></options><localData><data name="inputField">inlineEditor</data><data name="gradeCompound">and</data><data name="gradeCompoundDistribution"></data></localData></question>`,
      `<question><correctAnswers><correctAnswer type="mathml"><![CDATA[<math xmlns="http://www.w3.org/1998/Math/MathML"><mo>€</mo><mn>12</mn></math>]]></correctAnswer></correctAnswers><assertions><assertion name="syntax_quantity"><param name="units"><![CDATA[m, s, g, °, ', ", $, ¥, €, £, kr, Fr, ₩, ₹, руб, BTC, %, ‰, A, K, mol, cd, rad, sr, h, min, l, N, Pa, Hz, W, J, C, V, Ω, F, S, Wb, b, H, T, lx, lm, Gy, Bq, Sv, kat]]></param><param name="decimalseparators">., \,</param><param name="unitprefixes">M, k, c, m</param></assertion><assertion name="equivalent_symbolic"/></assertions><options><option name="tolerance">0.003</option><option name="relative_tolerance">true</option><option name="precision">4</option><option name="times_operator">·</option><option name="implicit_times_operator">false</option><option name="imaginary_unit">i</option></options><localData><data name="inputField">inlineEditor</data><data name="gradeCompound">and</data><data name="gradeCompoundDistribution"></data></localData></question>`
    ]

    const studentAnswers = [
      '<math xmlns="http://www.w3.org/1998/Math/MathML"><mn>12</mn></math>',
      '<math xmlns="http://www.w3.org/1998/Math/MathML"><mo>$</mo><mn>12</mn></math>',
      '<math xmlns="http://www.w3.org/1998/Math/MathML"><mo>€</mo><mn>12</mn></math>',
      '<math xmlns="http://www.w3.org/1998/Math/MathML"><mn>12.5</mn></math>'
    ]

    const results = await Promise.all(studentAnswers.map(studentAnswer => {
      return asyncCheckStudentAnswer(configuration, studentAnswer, otherConfigurations)
    }))

    console.log({ results })
  }

  if (!isLoaded) return null

  return (
    <div id='editor' ref={editorRef} />
  )
}

export default App;
