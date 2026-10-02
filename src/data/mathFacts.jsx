// Collection of educational and fun math facts
// Each fact has a title, description, and optional category
export const mathFacts = [
  {
    id: 1,
    date: '2024-01-01',
    title: 'Roman Numerals & Zero',
    fact: 'Zero has no symbol in Roman numerals. This was a major limitation of the Roman numeral system, as they had no concept of zero, which made calculations and record-keeping more difficult compared to systems that included zero.',
    category: 'History',
    difficulty: 'Easy',
    icon: '🏛️'
  },
  {
    id: 2,
    date: '2024-01-02',
    title: 'Temperature Equivalence',
    fact: '−40°C is exactly equal to −40°F. This is the only temperature where the Celsius and Fahrenheit scales intersect. It\'s a unique mathematical property where both temperature scales give the same numerical value.',
    category: 'Science',
    difficulty: 'Medium',
    icon: '🌡️'
  },
  {
    id: 3,
    date: '2024-01-03',
    title: 'Alphabetical Numbers',
    fact: '"Forty" is the only number whose letters appear in alphabetical order. Try spelling out other numbers - their letters won\'t be in alphabetical order like F-O-R-T-Y.',
    category: 'Language',
    difficulty: 'Easy',
    icon: '🔤'
  },
  {
    id: 4,
    date: '2024-01-04',
    title: 'Prime Numbers',
    fact: '2 and 5 are the only prime numbers that end in 2 or 5. All other numbers ending in 2 or 5 are divisible by 2 or 5 respectively, making them composite numbers. This is a fundamental property of prime numbers.',
    category: 'Number Theory',
    difficulty: 'Medium',
    icon: '🔢'
  },
  {
    id: 5,
    date: '2024-01-05',
    title: 'Birthday Paradox',
    fact: 'In a group of 23 people, there is about a 50% chance that two people share the same birthday. With 70 people, the probability jumps to 99.9%! This counterintuitive result is known as the Birthday Paradox.',
    category: 'Probability',
    difficulty: 'Hard',
    icon: '🎂'
  },
  {
    id: 6,
    date: '2024-01-06',
    title: 'Perfect Numbers',
    fact: '6 is the smallest perfect number. A perfect number is equal to the sum of its proper divisors: 6 = 1 + 2 + 3. The next perfect number is 28 (1 + 2 + 4 + 7 + 14 = 28).',
    category: 'Number Theory',
    difficulty: 'Hard',
    icon: '✨'
  },
  {
    id: 7,
    date: '2024-01-07',
    title: 'Fibonacci Sequence in Nature',
    fact: 'The Fibonacci sequence (1, 1, 2, 3, 5, 8, 13...) appears throughout nature: in sunflower seed spirals, pine cone patterns, and galaxy spirals. Each number is the sum of the two preceding ones.',
    category: 'Patterns',
    difficulty: 'Medium',
    icon: '🌻'
  },
  {
    id: 8,
    date: '2024-01-08',
    title: 'Googol & Googolplex',
    fact: 'A googol is 10^100 (1 followed by 100 zeros). A googolplex is 10^googol - a number so large that writing its digits would require more space than exists in the observable universe!',
    category: 'Large Numbers',
    difficulty: 'Hard',
    icon: '∞'
  },
  {
    id: 9,
    date: '2024-01-09',
    title: 'Pi Digits',
    fact: 'Pi (π) has been calculated to over 100 trillion digits, yet it never repeats or terminates. Despite this, most calculations only need the first 39 digits for extreme precision in space measurements.',
    category: 'Constants',
    difficulty: 'Medium',
    icon: 'π'
  },
  {
    id: 10,
    date: '2024-01-10',
    title: 'Magic Squares',
    fact: 'A 3×3 magic square has each row, column, and diagonal summing to 15. The most famous is the "Luo Shu Square" from ancient Chinese mathematics, used in feng shui and numerology.',
    category: 'Puzzles',
    difficulty: 'Medium',
    icon: '🟦'
  },
  {
    id: 11,
    date: '2024-01-11',
    title: 'Infinity Comes in Different Sizes',
    fact: 'There are different "sizes" of infinity! The set of real numbers is infinitely larger than the set of integers, even though both are infinite. This was proven by Georg Cantor.',
    category: 'Set Theory',
    difficulty: 'Hard',
    icon: '🌌'
  },
  {
    id: 12,
    date: '2024-01-12',
    title: 'Odd Numbers Only',
    fact: 'All odd numbers are odd because they cannot be divided evenly by 2. Interestingly, the sum of the first n odd numbers always equals n². For example: 1+3+5+7 = 16 = 4².',
    category: 'Number Theory',
    difficulty: 'Easy',
    icon: '🔢'
  },
  {
    id: 13,
    date: '2024-01-13',
    title: 'Factorial Growth',
    fact: '10! (ten factorial) = 3,628,800. The exclamation mark (!) represents factorial: multiply the number by every positive whole number below it. Factorials grow incredibly fast!',
    category: 'Combinatorics',
    difficulty: 'Medium',
    icon: '❗'
  },
  {
    id: 14,
    date: '2024-01-14',
    title: 'Banach-Tarski Paradox',
    fact: 'A sphere can be divided into a finite number of pieces and reassembled into two identical spheres of the same size! This mind-bending theorem proves that volume isn\'t always intuitive in higher mathematics.',
    category: 'Geometry',
    difficulty: 'Hard',
    icon: '🔮'
  },
  {
    id: 15,
    date: '2024-01-15',
    title: 'Monty Hall Problem',
    fact: 'In a game with 3 doors and 1 prize, your chances improve from 1/3 to 2/3 if you switch doors after one is revealed. This counterintuitive result often surprises even experienced mathematicians!',
    category: 'Probability',
    difficulty: 'Hard',
    icon: '🚪'
  },
  {
    id: 16,
    date: '2024-01-16',
    title: 'Goldbach\'s Conjecture',
    fact: 'Every even number greater than 2 can be expressed as the sum of two primes. While never proven, it has been verified for numbers up to 4 × 10^18. It remains one of mathematics\' great unsolved mysteries.',
    category: 'Number Theory',
    difficulty: 'Hard',
    icon: '🔍'
  },
  {
    id: 17,
    date: '2024-01-17',
    title: 'Euler\'s Identity',
    fact: 'e^(iπ) + 1 = 0. Euler\'s identity connects five fundamental mathematical constants: e, i, π, 1, and 0. Physicists and mathematicians consider it one of the most beautiful equations ever.',
    category: 'Analysis',
    difficulty: 'Hard',
    icon: '⚡'
  },
  {
    id: 18,
    date: '2024-01-18',
    title: 'Narcissistic Numbers',
    fact: '153 is a narcissistic number: 1³ + 5³ + 3³ = 1 + 125 + 27 = 153. It equals the sum of the cubes of its own digits! Other examples include 370, 371, and 407.',
    category: 'Number Theory',
    difficulty: 'Medium',
    icon: '💎'
  },
  {
    id: 19,
    date: '2024-01-19',
    title: 'Pascal\'s Triangle',
    fact: 'Pascal\'s Triangle contains the Fibonacci sequence along its diagonals, binomial coefficients, and powers of 11. It\'s one of the most versatile mathematical structures known to humankind.',
    category: 'Patterns',
    difficulty: 'Medium',
    icon: '△'
  },
  {
    id: 20,
    date: '2024-01-20',
    title: 'Prime Number Gaps',
    fact: 'As numbers get larger, prime numbers become increasingly sparse. However, mathematicians believe there are infinitely many twin primes (primes that differ by 2, like 11 and 13). This remains unproven.',
    category: 'Number Theory',
    difficulty: 'Hard',
    icon: '👯'
  }
];

// Function to get today's fact based on the current date
export function getTodaysFact() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const factIndex = (dayOfYear - 1) % mathFacts.length;
  return mathFacts[factIndex];
}

// Function to get a random fact
export function getRandomFact() {
  return mathFacts[Math.floor(Math.random() * mathFacts.length)];
}

// Function to get facts by category
export function getFactsByCategory(category) {
  return mathFacts.filter(fact => fact.category === category);
}

// Get all unique categories
export function getAllCategories() {
  return [...new Set(mathFacts.map(fact => fact.category))];
}
