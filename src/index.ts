import { DiceConfigurationCounter } from './DiceConfigurationCounter'

export function getTotalPossibleConfigurations(total: number, numberOfDices: number, numberOfFaces: number): number {
  const counter = new DiceConfigurationCounter(total, numberOfDices, numberOfFaces)
  return counter.getTotalPossibleConfigurations()
}

export default getTotalPossibleConfigurations
