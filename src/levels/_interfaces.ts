export class Combinator {
  lambda:string
  names:string[]
  constructor(input:string, names:string[]) {
    this.lambda = input
    this.names = names
  }
}

export type CombinatorsNameMap = {[id: string] : Combinator}

export type LevelConfig = {
  information: string[], 
  solution:string[],
  taskDescription:string,
}