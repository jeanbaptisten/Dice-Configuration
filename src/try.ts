import getTotalPossibleConfigurations from './index'

const before = performance.now()
const nb = getTotalPossibleConfigurations(20, 4, 6)
const after = performance.now()

console.log(`Number of possible configurations for a total output of 28 with 12 d8: ${nb} (${(after - before).toFixed(4)} ms)`)
