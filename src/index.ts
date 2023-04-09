import { IllegalArgumentException } from './exceptions/illegal-argument.exception'

export function getTotalPossibleConfigurations(total: number, numberOfDices: number, numberOfFace: number): number {
  if (numberOfDices <= 0) throw new IllegalArgumentException(`${numberOfDices} cannot be zero or negative`)
  if (numberOfFace <= 0) throw new IllegalArgumentException(`${numberOfFace} cannot be zero or negative`)
  if (total <= 0) throw new IllegalArgumentException(`${total} cannot be zero or negative`)

  if (total === 1 || total < numberOfDices) return 0
  if (total === numberOfDices) return 1
  if (total === numberOfDices * numberOfFace) return 1

  const memo: { [key: string]: number } = {}
  return countConfigurations(total, numberOfDices, numberOfFace, memo)
}

function countConfigurations(remainingTotal: number, remainingDices: number, numberOfFace: number, memo: { [key: string]: number }): number {
  // Ajout d'un principe de mémorisation.
  // Le principe est simple : Quand je calcule une valeur pour un état donné (dans ce cas, l'état correspond à un total restant
  // et un nombre de dés restants), alors je saurai la valeur demandée.
  const memoKey = `${remainingTotal}|${remainingDices}`

  // Si le résultat a déjà été calculé, alors on le retourne
  if (memoKey in memo) {
    // Le résultat a déjà été calculé, retourner le résultat stocké dans la mémoire
    return memo[memoKey]
  }

  // S'il ne reste plus de dés à lancer et que le total est égal à 0,
  // il y a une configuration possible : on est dans le cas souhaité.
  if (remainingDices === 0) {
    return remainingTotal === 0 ? 1 : 0
  }

  // Cas de base : s'il ne reste plus de dés à lancer et que le total est différent de 0,
  // il n'y a aucune configuration possible
  if (remainingTotal < 0) {
    return 0
  }

  // Calcul du nombre de configurations
  // Différence avec la V1 : On limite le nombre de récursions avec la condition "i <= remainingTotal".
  // En d'autres termes, si i (correspondant à la face actuellement testée) est supérieur au total restant,
  // alors retourner dans la boucle est inutile, car la configuration sera obligatoirement mauvaise.
  let numberOfConfigurations = 0
  for (let i = 1; i <= numberOfFace && i <= remainingTotal; i++) {
    numberOfConfigurations += countConfigurations(remainingTotal - i, remainingDices - 1, numberOfFace, memo)
  }

  // On vient de calculer le nombre de configurations pour un état donné
  // On stocke le résultat dans la mémoire
  memo[memoKey] = numberOfConfigurations

  return numberOfConfigurations
}

export default getTotalPossibleConfigurations
