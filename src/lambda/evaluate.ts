import Lexer from 'lc-js/src/lexer'
import Parser from 'lc-js/src/parser'
import Interpreter from 'lc-js/src/interpreter'
import { timeLimitPromise } from '../helper'

const evaluate = (formula: string) => (
  timeLimitPromise(new Promise<string>((res, rej) => {
    try {
      const lexer = new Lexer(formula)
      const parser = new Parser(lexer)
      const ast = parser.parse()
      return res(Interpreter.eval(ast).toString())
    } catch (e) {
      rej(e)
    }
  }), 2000)
)

export default evaluate