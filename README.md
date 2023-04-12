# <span style="color:#2069c8;">DiceConfiguration</span>

## <span style="color:#3d90fa;">Objective</span>

The goal of the exercise is to be able to calculate the number of dice configurations for a total value according to the
number of dice and the number of faces.

## <span style="color:#3d90fa;">How to install</span>

Simply download source code, change parameters in src/try.ts then run 
````bash
$ yarn install
$ npx ts-node src/try.ts
````

## <span style="color:#3d90fa;">Explanations</span>

### <span style="color:#7eb5fc;">V1 (~1250 ms)</span>

The principle is simple. For each face of each dice, the result is calculated.  
If the result is the desired result, add 1 to the number of configurations.

### <span style="color:#7eb5fc;">V2 (~300 ms)</span>

The second version is based on the same principle as V1, but with an additional test: I check if the value of the face
I want to test is greater than the remaining total.  
Therefore, I know that all the configurations that will result from the current configuration will be bad. This avoids
a lot of unnecessary recursions.

Example: Let's suppose I want to know the number of possible configurations to have a total value of 9, with 3 6-sided
dice.  
For the first dice roll, any configuration is still possible because 6 < 9. I still have 3 to go with my next two dice.
Therefore, if we choose face 6, and we test the second die with face 4, all the configurations that will result from this
face will be bad.

### <span style="color:#7eb5fc;">V3 (~0.8 ms)</span>

Let's continue in the same vein as in the previous version, but by adding a small notion of optimization: Memoization.
The principle is simple: At each calculation, I will store the result in an object which will be reused by recurrence.
Therefore, if a calculation has already been made, then I will not try to recalculate its result: I will just have to
recover it.

Let's take an example: Suppose I want to have the number of possible configurations for a total of 23 with 5 6-sided
dice.
I start by making three throws: My first three dice give "6, 5, 4".
In this case, the program will call the "countConfigurations" function like this: "countConfiguration(8, 2, 6)".  
It will then calculate the number of configurations for these parameters. Spoiler: The result is 5.  
Then the program continues. Another roll of the dice: "6, 6, 3". The program will therefore call this function with the
same parameters. Thanks to memoization, the program already "knows" the result because this result is stored in an
object. We therefore gain in performance, because all the calculations do not need to be redone.

### <span style="color:#7eb5fc;">V4 (~0.48 ms)</span>

I was using an object to represent program memory. To gain performance, I changed it to a map.
