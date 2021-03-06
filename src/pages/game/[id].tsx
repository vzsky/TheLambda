import type { NextPage } from 'next'
import { useState } from 'react'
import { PostApi, createOnChange } from '../../helper'
import levels from '../../levels/_levels'
import { Box } from '@chakra-ui/react'

//TODO: edit this import to whatever needed in the future
// import levelConfig from '../../levels/demo0'

interface IGamePage {
  levelConfig: any
}

interface IDict {
  words: string[]
}

interface IWord {
  word: string
}

const WordButton: React.FunctionComponent<IWord> = ({word}) => (
  <Box bgColor="orange">
    {word}
  </Box>
)

const LambdaDictionary: React.FunctionComponent<IDict> =  ({words}) => (
  <Box>
    {words.map((word, ind) => (<WordButton key={ind} word={word}/>))}
  </Box>
)

const Game: NextPage<IGamePage> = ({levelConfig}) => {
  const [param, setParam] = useState<string>("")
  const [exprs, setExprs] = useState<string>("")
  const [compl, setCompl] = useState<boolean>(false)

  const onExprsChange = createOnChange(setExprs)
  const onParamChange = createOnChange(setParam)

  const onSubmit = async () => {
    //TODO: might move this into one single api call
    console.log("submitting")
    let beta = await PostApi("/api/lambda/evaluate", {}, {
      param: param, 
      expression: exprs,
      information: levelConfig.information
    })
    console.log("beta formula: "+beta.result)
    let debruijn = await PostApi("/api/lambda/debruijn", {}, {
      formula: beta.result
    })
    console.log("debruijn formula: "+debruijn.debruijn)
    console.log(levelConfig.solution)
    setCompl(levelConfig.solution.includes(debruijn.debruijn))
  }

  return (
    <Box>
      {(compl?<h1>You are correct</h1>:<h1>Welcome to the game</h1>)}
      <div>
        <p>{levelConfig.taskDescription}</p>
      </div>
      <div>
        <textarea value={param} onChange={onParamChange}/>
        <h1> {'=>'} </h1>
        <textarea value={exprs} onChange={onExprsChange}/>
        <button onClick={onSubmit}>submit</button>
      </div>
      <Box>
        <LambdaDictionary words={levelConfig.information} />
      </Box>
    </Box>
    
  )
}

export const getStaticPaths = async () => {
  const ids = ["demo0", "demo1"]
  const paths = ids.map((id) => ({ params: { id } }))
  // pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
  let levelConfig = levels.get(params.id as string)
  return { props: { levelConfig } }
}

export default Game
