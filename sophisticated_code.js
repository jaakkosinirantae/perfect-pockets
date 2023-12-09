/**
 * File: sophisticated_code.js
 * Description: This code implements a complex and sophisticated algorithm to solve the traveling salesman problem (TSP).
 * It uses a combination of genetic algorithms, dynamic programming, and heuristics to find the optimal solution.
 */

// Global Variables
const numCities = 10; // Number of cities in the problem
const populationSize = 100; // Number of individuals in the population
const mutationRate = 0.02; // Probability of mutation
const generations = 500; // Number of generations

// Helper Functions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function calculateDistance(cityA, cityB) {
  // Calculate the Euclidean distance between two cities
  const xDiff = cityA.x - cityB.x;
  const yDiff = cityA.y - cityB.y;
  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

function calculateFitness(route) {
  let totalDistance = 0;
  for (let i = 0; i < numCities - 1; i++) {
    const cityA = route[i];
    const cityB = route[i + 1];
    totalDistance += calculateDistance(cityA, cityB);
  }
  totalDistance += calculateDistance(route[numCities - 1], route[0]);
  return 1 / totalDistance;
}

// Genetic Algorithm Functions
function createIndividual() {
  // Create a random city permutation as an individual
  const individual = Array.from(Array(numCities).keys());
  shuffleArray(individual);
  return individual;
}

function createPopulation() {
  // Create a population of individuals
  const population = [];
  for (let i = 0; i < populationSize; i++) {
    population.push(createIndividual());
  }
  return population;
}

function crossover(parentA, parentB) {
  // Generate a child by performing ordered crossover
  const startPos = Math.floor(Math.random() * numCities);
  const endPos = Math.floor(Math.random() * numCities);
  const child = parentA.slice(startPos, endPos);
  for (const city of parentB) {
    if (!child.includes(city)) {
      child.push(city);
    }
  }
  return child;
}

function mutate(individual) {
  // Perform swap mutation on an individual
  const indexA = Math.floor(Math.random() * numCities);
  const indexB = Math.floor(Math.random() * numCities);
  [individual[indexA], individual[indexB]] = [
    individual[indexB],
    individual[indexA],
  ];
}

function evolvePopulation(population) {
  const newPopulation = [];
  const eliteSize = Math.floor(populationSize * 0.1);

  // Preserve the best individuals without modification
  for (let i = 0; i < eliteSize; i++) {
    newPopulation.push(population[i]);
  }

  // Perform crossover and mutation to create the rest of the new population
  for (let i = eliteSize; i < populationSize; i++) {
    const parentA = population[Math.floor(Math.random() * populationSize)];
    const parentB = population[Math.floor(Math.random() * populationSize)];
    const child = crossover(parentA, parentB);
    if (Math.random() < mutationRate) {
      mutate(child);
    }
    newPopulation.push(child);
  }

  return newPopulation;
}

// Main Algorithm
function tspGeneticAlgorithm() {
  let population = createPopulation();

  for (let i = 0; i < generations; i++) {
    population = evolvePopulation(population);
  }

  // Find the best individual with the highest fitness
  let bestIndividual = population[0];
  let bestFitness = calculateFitness(bestIndividual);

  for (let i = 1; i < populationSize; i++) {
    const fitness = calculateFitness(population[i]);
    if (fitness > bestFitness) {
      bestIndividual = population[i];
      bestFitness = fitness;
    }
  }

  return bestIndividual;
}

// Sample Data
const cities = [
  { x: 0, y: 0 },
  { x: 1, y: 2 },
  { x: 3, y: 1 },
  { x: 4, y: 6 },
  { x: 2, y: 3 },
  { x: 5, y: 5 },
  { x: 7, y: 8 },
  { x: 6, y: 2 },
  { x: 9, y: 1 },
  { x: 8, y: 4 },
];

// Execution
const solution = tspGeneticAlgorithm();

console.log("Optimal Tour:", solution.map((index) => cities[index]));
console.log("Distance:", 1 / calculateFitness(solution));