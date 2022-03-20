import type { NextApiRequest, NextApiResponse } from 'next'
import getDeBruijn from '../../../lambda/debruijn'

// This api receive lambda formula and return de brujin's formula

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let formula:string = req.body.formula
  try {
    let debruijn = getDeBruijn(formula)
    res.status(200).send({debruijn})
  } catch (error) {
    res.status(403).send({error})
  }
}

