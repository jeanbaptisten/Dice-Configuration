import { IllegalArgumentException } from './exceptions/illegal-argument.exception'

type TMemo = { [key: string]: number }

export class DiceConfigurationCounter {
  private readonly _total: number
  private readonly _numberOfDices: number
  private readonly _numberOfFaces: number
  private readonly _memo: TMemo

  constructor(total: number, numberOfDices: number, numberOfFaces: number) {
    if (numberOfDices <= 0) throw new IllegalArgumentException(`${numberOfDices} cannot be zero or negative`)
    if (numberOfFaces <= 0) throw new IllegalArgumentException(`${numberOfFaces} cannot be zero or negative`)
    if (total <= 0) throw new IllegalArgumentException(`${total} cannot be zero or negative`)

    this._total = total
    this._numberOfDices = numberOfDices
    this._numberOfFaces = numberOfFaces
    this._memo = {}
  }

  public getTotalPossibleConfigurations(): number {
    if (this._total === 1 || this._total < this._numberOfDices) return 0
    if (this._total === this._numberOfDices) return 1
    if (this._total === this._numberOfDices * this._numberOfFaces) return 1

    return this.countConfigurations(this._total, this._numberOfDices)
  }

  private countConfigurations(remainingTotal: number, remainingDices: number): number {
    // Fonctionnalité de mémorisation.
    //  Quand je calcule une valeur pour un état donné (dans ce cas, l'état correspond à un total restant
    // et un nombre de dés restants), alors je saurai la valeur demandée.
    const memoKey = `${remainingTotal}|${remainingDices}`

    // Si le résultat a déjà été calculé, alors on le retourne
    if (memoKey in this._memo) {
      return this._memo[memoKey]
    }

    // S'il ne reste plus de dés à lancer et que le total est égal à 0,
    // il y a une configuration possible : on est dans le cas souhaité.
    // En revanche, s'il n'y a plus de dés restants et que le total restant n'est pas zéro, alors
    // on est dans le cas où la configuration n'est pas bonne.
    if (remainingDices === 0) {
      return remainingTotal === 0 ? 1 : 0
    }

    // S'il ne reste plus de dés à lancer et que le total est différent de 0,
    // il n'y a aucune configuration possible
    if (remainingTotal < 0) {
      return 0
    }

    // Calcul du nombre de configurations
    // On limite le nombre de récursions avec la condition "i <= remainingTotal".
    // En d'autres termes, si i (correspondant à la face actuellement testée) est supérieur au total restant,
    // alors retourner dans la boucle est inutile, car la configuration sera obligatoirement mauvaise.
    let numberOfConfigurations = 0
    for (let i = 1; i <= this._numberOfFaces && i <= remainingTotal; i++) {
      numberOfConfigurations += this.countConfigurations(remainingTotal - i, remainingDices - 1)
    }

    // On vient de calculer le nombre de configurations pour un état donné
    // On stocke le résultat en mémoire
    this._memo[memoKey] = numberOfConfigurations

    return numberOfConfigurations
  }
}
