import { Combinator, CombinatorsNameMap } from "./_interfaces"

// here we still need to write everything out from scratch everytime, 
// might wanna implement lambda generator for easier development and debug
// might be a file and generate this file on build or sth

const v0 = "atsuyc"
const v1 = "fdasdf"
const v2 = "hkjsdf"
const v3 = "reuchk"
const v4 = "yudskf"

const identity = new Combinator(`(λ${v0}.${v0})`, ["iden"])
const first = new Combinator(`(λ${v0}.(λ(${v1}).${v0}))`, ["first", "true"])
const second = new Combinator(`(λ${v0}.(λ${v1}.${v1}))`, ["second", "false"])
const boolAnd = new Combinator(`(λ${v0}.(λ${v1}.(${v0} ${v1} ${v0})))`, ["and"])
const boolOr = new Combinator(`(λ${v0}.(λ${v1}.(${v0} ${v0} ${v1})))`, ["or"])
const boolNot = new Combinator(`(λ${v2}.(${v2} (λ${v0}.(λ${v1}.${v1})) (λ${v3}.(λ${v4}.${v3}))))`, ["not"])

const allCombinators = [identity, first, second, boolAnd, boolOr, boolNot]

let combinatorsNameMap:CombinatorsNameMap = {}
for (let combinator of allCombinators) {
  for (let name of combinator.names) {
    combinatorsNameMap[name] = combinator
  }
}

export default combinatorsNameMap