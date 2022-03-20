import type { NextApiRequest, NextApiResponse } from 'next'
import { LAMBDA } from '../../../helper'
import evaluate from '../../../lambda/evaluate'
import combinatorsNameMap from '../../../levels/_combinators'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  let param = req.body.param
  let exprs = req.body.expression
  let info = req.body.information

  // sort out parameters
  let params = param.split(/\s*,\s*/)
  if (params.some((p: string) => /\s+/.test(p))) {
    res.status(400).send({reason: "Invalid parameters"})
  }
  let parameters:string = params.reduce((pre:string, cur:string) => (
    pre + LAMBDA + cur + ". "
  ), "")

  // replace info to expression
  for (let name of info) {
    let comLambda = combinatorsNameMap[name].lambda
    let regex = new RegExp("([\\s\\(\\.]+|^)" + name + "([\\s\\)\\.]+|$)")
    let replacement = "$1"+comLambda+"$2"
    exprs = exprs.replace(regex, replacement)
  }
  exprs = "("+exprs+")"

  // create formula
  console.log(exprs)
  let formula = "("+ parameters + exprs + ")"
  console.log("evaluate formula: " + formula)

  try {
    let result = await evaluate(formula)
    res.status(200).send({result})
  } catch (error) {
    res.status(403).send({error})
  }
}

export default handler