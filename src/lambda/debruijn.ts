import { LAMBDA } from "../helper"

const getDeBruijn = (formula:string) => {
  let map = new Map<string,number>()
  let count = 0
  let freeCount = -1
  let debruijn = ""
  for (let chunk of formula.split(" ")) {
    try {
      for (let char of chunk) {
        if (char == "(" || char == LAMBDA)
          debruijn += char
      }
    } catch (e) {
      throw new Error("fail to parse either ( or lambda")
    }  

    try {
      if (chunk.match(LAMBDA)) {
        let regex = new RegExp(LAMBDA+"([a-z]+).")
        let variable = chunk.match(regex)[1]
        map.set(variable, count)
        count++
      }
      else {
        let regex = /\(*([a-z]+)\)*/
        let variable = chunk.match(regex)[1]
        if (!map.has(variable)) {
          map.set(variable, freeCount)
          freeCount--
        }  
        debruijn += (count-map.get(variable))
      }
    } catch (e) {
      throw new Error("fail to parse variable")
    }

    try {
      for (let char of chunk) {
        if (char == ")") {
          debruijn += char
          count--
        }
      }
    } catch (e) {
      throw new Error ("fail to parse )")
    }
    
  }
  return debruijn
}
export default getDeBruijn