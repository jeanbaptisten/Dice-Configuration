import { IllegalArgumentException } from '../exceptions/illegal-argument.exception'

interface IMemo {
  [key: string]: number
}

/**
 * The IDiceConfigurationAPI interface represents the overall logic of the program.
 * It provides a clean and simplified API to interact with the DiceConfigurationCounter class,
 * abstracting its inner workings.
 *
 * Example usage:
 * const diceCounter = new DiceConfigurationAPI(7, 2, 6)
 * const totalConfigurations = diceCounter.getTotalPossibleConfigurations()
 */
export interface IDiceConfigurationAPI {
  /**
   * Calculate the total number of possible configurations that can achieve
   * a target sum with a given number of dice and number of faces. The class utilizes
   * memoization to optimize performance by caching the results of previously calculated configurations.
   *
   * @returns The total number of possible configurations.
   */
  getTotalPossibleConfigurations(): number
}

export class DiceConfigurationAPI implements IDiceConfigurationAPI {
  private readonly _total: number
  private readonly _numberOfDice: number
  private readonly _numberOfFaces: number
  private readonly _memo: IMemo

  constructor(total: number, numberOfDice: number, numberOfFaces: number) {
    DiceConfigurationAPI.validateInput(total, numberOfDice, numberOfFaces)

    this._total = total
    this._numberOfDice = numberOfDice
    this._numberOfFaces = numberOfFaces
    this._memo = {}
  }

  public getTotalPossibleConfigurations(): number {
    if (this._total === 1 || this._total < this._numberOfDice) return 0
    if (this._total === this._numberOfDice) return 1
    if (this._total === this._numberOfDice * this._numberOfFaces) return 1

    return this.countConfigurations(this._total, this._numberOfDice)
  }

  private countConfigurations(remainingTotal: number, remainingDice: number): number {
    const memoKey = `${remainingTotal}|${remainingDice}`

    // If the result is already in memory, return it. (memoization)
    if (memoKey in this._memo) {
      return this._memo[memoKey]
    }

    // If no more dice and remaining total equals 0, valid configuration. Otherwise, invalid.
    if (remainingDice === 0) {
      return remainingTotal === 0 ? 1 : 0
    }

    // If remaining total is less than 0, no possible configurations.
    if (remainingTotal < 0) {
      return 0
    }

    let numberOfConfigurations = 0
    for (let i = 1; i <= this._numberOfFaces && i <= remainingTotal; i++) {
      numberOfConfigurations += this.countConfigurations(remainingTotal - i, remainingDice - 1)
    }

    // Store the result in memory for the current state. (memoization)
    this._memo[memoKey] = numberOfConfigurations

    return numberOfConfigurations
  }

  // Choosing a static property for two reasons:
  // 1. Readability: This method is intended to be used regardless of the state of the current object.
  // 2. Security: I want to be sure that the method cannot use any of my instance variables at any time.
  private static validateInput(total: number, numberOfDice: number, numberOfFaces: number): void {
    if (numberOfDice <= 0) throw new IllegalArgumentException(`${numberOfDice} cannot be zero or negative`)
    if (numberOfFaces <= 0) throw new IllegalArgumentException(`${numberOfFaces} cannot be zero or negative`)
    if (total <= 0) throw new IllegalArgumentException(`${total} cannot be zero or negative`)
  }
}
