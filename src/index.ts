import { DiceConfigurationAPI, IDiceConfigurationAPI } from './api/dice-configuration.api'

export function getTotalPossibleConfigurations(total: number, numberOfDices: number, numberOfFaces: number): number {
  const counter: IDiceConfigurationAPI = new DiceConfigurationAPI(total, numberOfDices, numberOfFaces)
  return counter.getTotalPossibleConfigurations()
}

export default getTotalPossibleConfigurations
