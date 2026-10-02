// Comprehensive Mathematics Quiz Database
// Organized by Key Stages and difficulty levels

export const quizzes = [
  // ============ KS1 (Year 1 & 2) ============
  {
    id: 'ks1-addition-1',
    title: 'Year 1 Calculation - Addition',
    category: 'KS1',
    year: '1',
    difficulty: 'Easy',
    topic: 'Addition',
    icon: '➕',
    description: 'Basic addition up to 10',
    timeLimit: 300, // 5 minutes in seconds
    totalQuestions: 10,
    questions: [
      { id: 1, question: 'What is 2 + 3?', options: ['4', '5', '6', '7'], correct: 1, explanation: '2 + 3 = 5' },
      { id: 2, question: 'What is 1 + 4?', options: ['4', '5', '6', '7'], correct: 1, explanation: '1 + 4 = 5' },
      { id: 3, question: 'What is 3 + 3?', options: ['5', '6', '7', '8'], correct: 1, explanation: '3 + 3 = 6' },
      { id: 4, question: 'What is 2 + 5?', options: ['6', '7', '8', '9'], correct: 1, explanation: '2 + 5 = 7' },
      { id: 5, question: 'What is 4 + 4?', options: ['7', '8', '9', '10'], correct: 1, explanation: '4 + 4 = 8' },
      { id: 6, question: 'What is 1 + 1?', options: ['1', '2', '3', '4'], correct: 1, explanation: '1 + 1 = 2' },
      { id: 7, question: 'What is 5 + 3?', options: ['7', '8', '9', '10'], correct: 1, explanation: '5 + 3 = 8' },
      { id: 8, question: 'What is 2 + 4?', options: ['5', '6', '7', '8'], correct: 1, explanation: '2 + 4 = 6' },
      { id: 9, question: 'What is 3 + 2?', options: ['4', '5', '6', '7'], correct: 1, explanation: '3 + 2 = 5' },
      { id: 10, question: 'What is 4 + 3?', options: ['6', '7', '8', '9'], correct: 1, explanation: '4 + 3 = 7' }
    ]
  },
  {
    id: 'ks1-subtraction-1',
    title: 'Year 1 Calculation - Subtraction',
    category: 'KS1',
    year: '1',
    difficulty: 'Easy',
    topic: 'Subtraction',
    icon: '➖',
    description: 'Basic subtraction within 10',
    timeLimit: 300,
    totalQuestions: 10,
    questions: [
      { id: 1, question: 'What is 5 - 2?', options: ['2', '3', '4', '5'], correct: 1, explanation: '5 - 2 = 3' },
      { id: 2, question: 'What is 7 - 3?', options: ['3', '4', '5', '6'], correct: 1, explanation: '7 - 3 = 4' },
      { id: 3, question: 'What is 8 - 4?', options: ['3', '4', '5', '6'], correct: 1, explanation: '8 - 4 = 4' },
      { id: 4, question: 'What is 6 - 2?', options: ['3', '4', '5', '6'], correct: 1, explanation: '6 - 2 = 4' },
      { id: 5, question: 'What is 9 - 5?', options: ['3', '4', '5', '6'], correct: 1, explanation: '9 - 5 = 4' },
      { id: 6, question: 'What is 4 - 1?', options: ['2', '3', '4', '5'], correct: 1, explanation: '4 - 1 = 3' },
      { id: 7, question: 'What is 7 - 2?', options: ['4', '5', '6', '7'], correct: 1, explanation: '7 - 2 = 5' },
      { id: 8, question: 'What is 10 - 3?', options: ['6', '7', '8', '9'], correct: 1, explanation: '10 - 3 = 7' },
      { id: 9, question: 'What is 5 - 3?', options: ['1', '2', '3', '4'], correct: 1, explanation: '5 - 3 = 2' },
      { id: 10, question: 'What is 6 - 1?', options: ['4', '5', '6', '7'], correct: 1, explanation: '6 - 1 = 5' }
    ]
  },
  {
    id: 'ks1-multiplication-1',
    title: 'Year 1 Calculation - Multiplication Using Arrays',
    category: 'KS1',
    year: '1',
    difficulty: 'Medium',
    topic: 'Multiplication',
    icon: '✖️',
    description: 'Introduction to multiplication with arrays',
    timeLimit: 300,
    totalQuestions: 10,
    questions: [
      { id: 1, question: 'What is 2 × 2?', options: ['3', '4', '5', '6'], correct: 1, explanation: '2 × 2 = 4' },
      { id: 2, question: 'What is 3 × 2?', options: ['5', '6', '7', '8'], correct: 1, explanation: '3 × 2 = 6' },
      { id: 3, question: 'What is 2 × 3?', options: ['5', '6', '7', '8'], correct: 1, explanation: '2 × 3 = 6' },
      { id: 4, question: 'What is 2 × 4?', options: ['6', '7', '8', '9'], correct: 1, explanation: '2 × 4 = 8' },
      { id: 5, question: 'What is 5 × 2?', options: ['8', '9', '10', '11'], correct: 2, explanation: '5 × 2 = 10' },
      { id: 6, question: 'What is 3 × 3?', options: ['7', '8', '9', '10'], correct: 2, explanation: '3 × 3 = 9' },
      { id: 7, question: 'What is 2 × 5?', options: ['8', '9', '10', '11'], correct: 2, explanation: '2 × 5 = 10' },
      { id: 8, question: 'What is 4 × 2?', options: ['6', '7', '8', '9'], correct: 2, explanation: '4 × 2 = 8' },
      { id: 9, question: 'What is 3 × 1?', options: ['2', '3', '4', '5'], correct: 1, explanation: '3 × 1 = 3' },
      { id: 10, question: 'What is 2 × 6?', options: ['10', '11', '12', '13'], correct: 2, explanation: '2 × 6 = 12' }
    ]
  },
  {
    id: 'ks1-division-1',
    title: 'Year 1 Calculation - Division and Sharing',
    category: 'KS1',
    year: '1',
    difficulty: 'Medium',
    topic: 'Division',
    icon: '÷',
    description: 'Basic division and sharing within 10',
    timeLimit: 300,
    totalQuestions: 10,
    questions: [
      { id: 1, question: 'What is 4 ÷ 2?', options: ['1', '2', '3', '4'], correct: 1, explanation: '4 ÷ 2 = 2' },
      { id: 2, question: 'What is 6 ÷ 2?', options: ['2', '3', '4', '5'], correct: 1, explanation: '6 ÷ 2 = 3' },
      { id: 3, question: 'What is 8 ÷ 2?', options: ['3', '4', '5', '6'], correct: 1, explanation: '8 ÷ 2 = 4' },
      { id: 4, question: 'What is 10 ÷ 2?', options: ['4', '5', '6', '7'], correct: 1, explanation: '10 ÷ 2 = 5' },
      { id: 5, question: 'What is 9 ÷ 3?', options: ['2', '3', '4', '5'], correct: 1, explanation: '9 ÷ 3 = 3' },
      { id: 6, question: 'What is 6 ÷ 3?', options: ['1', '2', '3', '4'], correct: 1, explanation: '6 ÷ 3 = 2' },
      { id: 7, question: 'What is 8 ÷ 4?', options: ['1', '2', '3', '4'], correct: 1, explanation: '8 ÷ 4 = 2' },
      { id: 8, question: 'What is 12 ÷ 2?', options: ['4', '5', '6', '7'], correct: 2, explanation: '12 ÷ 2 = 6' },
      { id: 9, question: 'What is 10 ÷ 5?', options: ['1', '2', '3', '4'], correct: 1, explanation: '10 ÷ 5 = 2' },
      { id: 10, question: 'What is 12 ÷ 3?', options: ['3', '4', '5', '6'], correct: 1, explanation: '12 ÷ 3 = 4' }
    ]
  },

  // ============ KS2 (Year 3-6) ============
  {
    id: 'ks2-fractions-basic',
    title: 'Year 3-4 Fractions - Basic',
    category: 'KS2',
    year: '3-4',
    difficulty: 'Easy',
    topic: 'Fractions',
    icon: '⅓',
    description: 'Understanding basic fractions',
    timeLimit: 360,
    totalQuestions: 10,
    questions: [
      { id: 1, question: 'What is 1/2 of 8?', options: ['2', '3', '4', '5'], correct: 2, explanation: '1/2 of 8 = 4' },
      { id: 2, question: 'What is 1/4 of 12?', options: ['2', '3', '4', '5'], correct: 1, explanation: '1/4 of 12 = 3' },
      { id: 3, question: 'What is 1/3 of 9?', options: ['2', '3', '4', '5'], correct: 1, explanation: '1/3 of 9 = 3' },
      { id: 4, question: 'What is 3/4 of 8?', options: ['4', '5', '6', '7'], correct: 2, explanation: '3/4 of 8 = 6' },
      { id: 5, question: 'What is 1/2 of 10?', options: ['4', '5', '6', '7'], correct: 1, explanation: '1/2 of 10 = 5' },
      { id: 6, question: 'What is 2/3 of 9?', options: ['4', '5', '6', '7'], correct: 2, explanation: '2/3 of 9 = 6' },
      { id: 7, question: 'What is 1/5 of 15?', options: ['2', '3', '4', '5'], correct: 2, explanation: '1/5 of 15 = 3' },
      { id: 8, question: 'What is 3/4 of 12?', options: ['7', '8', '9', '10'], correct: 2, explanation: '3/4 of 12 = 9' },
      { id: 9, question: 'What is 1/2 of 6?', options: ['2', '3', '4', '5'], correct: 1, explanation: '1/2 of 6 = 3' },
      { id: 10, question: 'What is 2/5 of 10?', options: ['2', '3', '4', '5'], correct: 2, explanation: '2/5 of 10 = 4' }
    ]
  },
  {
    id: 'ks2-decimals-basic',
    title: 'Year 4-5 Decimals - Basics',
    category: 'KS2',
    year: '4-5',
    difficulty: 'Medium',
    topic: 'Decimals',
    icon: '0️⃣',
    description: 'Understanding decimal numbers',
    timeLimit: 360,
    totalQuestions: 10,
    questions: [
      { id: 1, question: 'What is 0.5 as a fraction?', options: ['1/2', '1/3', '1/4', '1/5'], correct: 0, explanation: '0.5 = 1/2' },
      { id: 2, question: 'What is 0.25 as a fraction?', options: ['1/2', '1/3', '1/4', '1/5'], correct: 2, explanation: '0.25 = 1/4' },
      { id: 3, question: 'What is 0.75 as a fraction?', options: ['3/4', '2/3', '3/5', '4/5'], correct: 0, explanation: '0.75 = 3/4' },
      { id: 4, question: 'What is 2.5 + 1.3?', options: ['3.6', '3.7', '3.8', '3.9'], correct: 1, explanation: '2.5 + 1.3 = 3.8' },
      { id: 5, question: 'What is 5.6 - 2.1?', options: ['3.3', '3.4', '3.5', '3.6'], correct: 2, explanation: '5.6 - 2.1 = 3.5' },
      { id: 6, question: 'What is 0.1 as a fraction?', options: ['1/5', '1/10', '1/8', '1/20'], correct: 1, explanation: '0.1 = 1/10' },
      { id: 7, question: 'What is 4.2 + 3.8?', options: ['7.9', '8.0', '8.1', '8.2'], correct: 1, explanation: '4.2 + 3.8 = 8.0' },
      { id: 8, question: 'What is 9.5 - 4.2?', options: ['5.1', '5.2', '5.3', '5.4'], correct: 2, explanation: '9.5 - 4.2 = 5.3' },
      { id: 9, question: 'What is 1.5 × 2?', options: ['2.5', '3.0', '3.5', '4.0'], correct: 1, explanation: '1.5 × 2 = 3.0' },
      { id: 10, question: 'What is 6.4 ÷ 2?', options: ['2.8', '3.0', '3.2', '3.4'], correct: 2, explanation: '6.4 ÷ 2 = 3.2' }
    ]
  },
  {
    id: 'ks2-algebra-basic',
    title: 'Year 5-6 Algebra - Basics',
    category: 'KS2',
    year: '5-6',
    difficulty: 'Hard',
    topic: 'Algebra',
    icon: '🔤',
    description: 'Introduction to algebraic thinking',
    timeLimit: 360,
    totalQuestions: 10,
    questions: [
      { id: 1, question: 'If x = 3, what is 2x + 4?', options: ['8', '9', '10', '11'], correct: 2, explanation: '2(3) + 4 = 6 + 4 = 10' },
      { id: 2, question: 'If y = 5, what is 3y - 2?', options: ['11', '12', '13', '14'], correct: 2, explanation: '3(5) - 2 = 15 - 2 = 13' },
      { id: 3, question: 'What is x if x + 7 = 12?', options: ['4', '5', '6', '7'], correct: 1, explanation: 'x = 12 - 7 = 5' },
      { id: 4, question: 'What is n if 2n = 16?', options: ['6', '7', '8', '9'], correct: 2, explanation: 'n = 16 ÷ 2 = 8' },
      { id: 5, question: 'If a = 4, what is a² + 3?', options: ['17', '18', '19', '20'], correct: 2, explanation: '4² + 3 = 16 + 3 = 19' },
      { id: 6, question: 'What is m if m - 5 = 8?', options: ['12', '13', '14', '15'], correct: 1, explanation: 'm = 8 + 5 = 13' },
      { id: 7, question: 'If b = 6, what is b² - 5?', options: ['28', '29', '30', '31'], correct: 2, explanation: '6² - 5 = 36 - 5 = 31' },
      { id: 8, question: 'What is c if 3c = 24?', options: ['6', '7', '8', '9'], correct: 2, explanation: 'c = 24 ÷ 3 = 8' },
      { id: 9, question: 'If d = 2, what is 5d + 6?', options: ['14', '15', '16', '17'], correct: 2, explanation: '5(2) + 6 = 10 + 6 = 16' },
      { id: 10, question: 'What is p if p + 9 = 20?', options: ['9', '10', '11', '12'], correct: 2, explanation: 'p = 20 - 9 = 11' }
    ]
  },

  // ============ KS3 (Year 7-9) ============
  {
    id: 'ks3-algebra-linear',
    title: 'Year 7-8 Algebra - Linear Equations',
    category: 'KS3',
    year: '7-8',
    difficulty: 'Medium',
    topic: 'Algebra',
    icon: '📐',
    description: 'Solving linear equations',
    timeLimit: 420,
    totalQuestions: 10,
    questions: [
      { id: 1, question: 'Solve: 2x + 3 = 11', options: ['3', '4', '5', '6'], correct: 1, explanation: '2x = 8, x = 4' },
      { id: 2, question: 'Solve: 3y - 5 = 10', options: ['4', '5', '6', '7'], correct: 2, explanation: '3y = 15, y = 5' },
      { id: 3, question: 'Solve: 4a + 2 = 18', options: ['3', '4', '5', '6'], correct: 1, explanation: '4a = 16, a = 4' },
      { id: 4, question: 'Solve: 5b - 7 = 18', options: ['4', '5', '6', '7'], correct: 2, explanation: '5b = 25, b = 5' },
      { id: 5, question: 'Solve: x/2 + 3 = 8', options: ['8', '9', '10', '11'], correct: 2, explanation: 'x/2 = 5, x = 10' },
      { id: 6, question: 'Solve: 2(x + 1) = 10', options: ['3', '4', '5', '6'], correct: 1, explanation: 'x + 1 = 5, x = 4' },
      { id: 7, question: 'Solve: 3x - 4 = 14', options: ['5', '6', '7', '8'], correct: 2, explanation: '3x = 18, x = 6' },
      { id: 8, question: 'Solve: 4c + 1 = 21', options: ['4', '5', '6', '7'], correct: 2, explanation: '4c = 20, c = 5' },
      { id: 9, question: 'Solve: 6d - 3 = 27', options: ['4', '5', '6', '7'], correct: 2, explanation: '6d = 30, d = 5' },
      { id: 10, question: 'Solve: 2e + 8 = 20', options: ['5', '6', '7', '8'], correct: 1, explanation: '2e = 12, e = 6' }
    ]
  },
  {
    id: 'ks3-geometry-angles',
    title: 'Year 7 Geometry - Angles',
    category: 'KS3',
    year: '7',
    difficulty: 'Medium',
    topic: 'Geometry',
    icon: '∠',
    description: 'Understanding angles and angle properties',
    timeLimit: 420,
    totalQuestions: 10,
    questions: [
      { id: 1, question: 'What is the sum of angles in a triangle?', options: ['90°', '180°', '270°', '360°'], correct: 1, explanation: 'All triangles have angles summing to 180°' },
      { id: 2, question: 'What is the sum of angles in a quadrilateral?', options: ['180°', '270°', '360°', '450°'], correct: 2, explanation: 'All quadrilaterals have angles summing to 360°' },
      { id: 3, question: 'Two angles are 50° and 80°. What is the third angle in a triangle?', options: ['40°', '50°', '60°', '70°'], correct: 2, explanation: '180° - 50° - 80° = 50°' },
      { id: 4, question: 'What type of angle is 45°?', options: ['Acute', 'Right', 'Obtuse', 'Reflex'], correct: 0, explanation: '45° is less than 90°, so it\'s acute' },
      { id: 5, question: 'What type of angle is 120°?', options: ['Acute', 'Right', 'Obtuse', 'Reflex'], correct: 2, explanation: '120° is between 90° and 180°, so it\'s obtuse' },
      { id: 6, question: 'What are vertically opposite angles?', options: ['Equal', 'Supplementary', 'Complementary', 'Reflex'], correct: 0, explanation: 'Vertically opposite angles are always equal' },
      { id: 7, question: 'What type of angle is 90°?', options: ['Acute', 'Right', 'Obtuse', 'Reflex'], correct: 1, explanation: '90° is a right angle' },
      { id: 8, question: 'Two angles on a straight line sum to...', options: ['90°', '180°', '270°', '360°'], correct: 1, explanation: 'Angles on a straight line are supplementary (sum to 180°)' },
      { id: 9, question: 'If one angle is 35°, what is its complement?', options: ['45°', '55°', '65°', '75°'], correct: 1, explanation: '90° - 35° = 55°' },
      { id: 10, question: 'If one angle is 120°, what is its supplement?', options: ['30°', '50°', '60°', '80°'], correct: 2, explanation: '180° - 120° = 60°' }
    ]
  },

  // ============ Year 10 ============
  {
    id: 'y10-trigonometry-basic',
    title: 'Year 10 Trigonometry - Basics',
    category: 'Year 10',
    year: '10',
    difficulty: 'Hard',
    topic: 'Trigonometry',
    icon: '📏',
    description: 'Introduction to trigonometry',
    timeLimit: 480,
    totalQuestions: 10,
    questions: [
      { id: 1, question: 'In a right triangle, which side is opposite the right angle?', options: ['Adjacent', 'Hypotenuse', 'Opposite', 'Base'], correct: 1, explanation: 'The hypotenuse is the longest side opposite the right angle' },
      { id: 2, question: 'What does SOH CAH TOA stand for?', options: ['Sine, Cosine, Tangent', 'Sum, Cos, Tan', 'Side, Cos, Tan', 'Sine, Complement, Tan'], correct: 0, explanation: 'SOH CAH TOA: Sin=Opp/Hyp, Cos=Adj/Hyp, Tan=Opp/Adj' },
      { id: 3, question: 'In sin(θ) = opposite/hypotenuse, what is hypotenuse?', options: ['Longest side', 'Shortest side', 'Adjacent side', 'Vertical side'], correct: 0, explanation: 'The hypotenuse is the longest side in a right triangle' },
      { id: 4, question: 'What is cos(0°)?', options: ['0', '1', '-1', '0.5'], correct: 1, explanation: 'cos(0°) = 1' },
      { id: 5, question: 'What is sin(90°)?', options: ['0', '1', '-1', '0.5'], correct: 1, explanation: 'sin(90°) = 1' },
      { id: 6, question: 'What is tan(45°)?', options: ['0', '0.5', '1', '2'], correct: 2, explanation: 'tan(45°) = 1' },
      { id: 7, question: 'If sin(θ) = 0.5, what is θ?', options: ['30°', '45°', '60°', '90°'], correct: 0, explanation: 'sin(30°) = 0.5' },
      { id: 8, question: 'If cos(θ) = 0.866, what is θ (approximately)?', options: ['30°', '45°', '60°', '90°'], correct: 2, explanation: 'cos(60°) ≈ 0.866' },
      { id: 9, question: 'Find sin(30°)', options: ['0.5', '0.866', '1', '0.707'], correct: 0, explanation: 'sin(30°) = 0.5 or 1/2' },
      { id: 10, question: 'In a right triangle, one angle is 90°. If another is 35°, what is the third?', options: ['45°', '55°', '65°', '75°'], correct: 1, explanation: '180° - 90° - 35° = 55°' }
    ]
  },
  {
    id: 'y10-quadratics',
    title: 'Year 10 Algebra - Quadratics',
    category: 'Year 10',
    year: '10',
    difficulty: 'Hard',
    topic: 'Quadratics',
    icon: '📈',
    description: 'Quadratic equations and functions',
    timeLimit: 480,
    totalQuestions: 10,
    questions: [
      { id: 1, question: 'What is the coefficient of x² in 3x² + 2x + 1?', options: ['1', '2', '3', '6'], correct: 2, explanation: 'The coefficient of x² is 3' },
      { id: 2, question: 'Solve x² = 16', options: ['±2', '±4', '±8', '±16'], correct: 1, explanation: 'x = √16 = ±4' },
      { id: 3, question: 'Solve x² - 4 = 0', options: ['±1', '±2', '±3', '±4'], correct: 1, explanation: 'x² = 4, so x = ±2' },
      { id: 4, question: 'Expand (x + 2)(x + 3)', options: ['x² + 5x + 6', 'x² + 6x + 5', 'x² + 7x + 6', 'x² + 4x + 5'], correct: 0, explanation: 'x² + 3x + 2x + 6 = x² + 5x + 6' },
      { id: 5, question: 'Factorize x² + 7x + 12', options: ['(x+3)(x+4)', '(x+2)(x+6)', '(x+1)(x+12)', '(x+3)(x+5)'], correct: 0, explanation: 'x² + 7x + 12 = (x + 3)(x + 4)' },
      { id: 6, question: 'What is the vertex of y = (x - 2)² + 3?', options: ['(2, 3)', '(-2, 3)', '(2, -3)', '(-2, -3)'], correct: 0, explanation: 'Vertex form: y = (x - h)² + k, so vertex is (2, 3)' },
      { id: 7, question: 'Solve x² - 5x + 6 = 0', options: ['2, 3', '1, 6', '2, 4', '3, 4'], correct: 0, explanation: '(x - 2)(x - 3) = 0, so x = 2 or 3' },
      { id: 8, question: 'Expand (x - 1)²', options: ['x² - 2x + 1', 'x² + 2x + 1', 'x² - x + 1', 'x² + x + 1'], correct: 0, explanation: '(x - 1)² = x² - 2x + 1' },
      { id: 9, question: 'What is the y-intercept of y = x² - 3x + 5?', options: ['0', '3', '5', '-3'], correct: 2, explanation: 'When x = 0, y = 5' },
      { id: 10, question: 'Solve 2x² - 8 = 0', options: ['±1', '±2', '±3', '±4'], correct: 1, explanation: '2x² = 8, x² = 4, x = ±2' }
    ]
  },

  // ============ GCSE ============
  {
    id: 'gcse-calculus-basic',
    title: 'GCSE Calculus - Differentiation',
    category: 'GCSE',
    year: 'GCSE',
    difficulty: 'Hard',
    topic: 'Calculus',
    icon: '∫',
    description: 'Introduction to differentiation',
    timeLimit: 600,
    totalQuestions: 10,
    questions: [
      { id: 1, question: 'What is the derivative of x²?', options: ['x', '2x', 'x²', '2'], correct: 1, explanation: 'd/dx(x²) = 2x' },
      { id: 2, question: 'What is the derivative of 3x³?', options: ['3x²', '6x²', '9x²', '12x²'], correct: 2, explanation: 'd/dx(3x³) = 9x²' },
      { id: 3, question: 'What is the derivative of 5?', options: ['0', '5', '1', '10'], correct: 0, explanation: 'd/dx(constant) = 0' },
      { id: 4, question: 'What is the derivative of x?', options: ['0', '1', 'x', '2x'], correct: 1, explanation: 'd/dx(x) = 1' },
      { id: 5, question: 'Find the derivative of x³ + 2x²', options: ['3x² + 4x', '3x² + 2x', 'x² + 4x', '3x + 4'], correct: 0, explanation: 'd/dx(x³ + 2x²) = 3x² + 4x' },
      { id: 6, question: 'What is the derivative of x⁴?', options: ['x³', '2x³', '4x³', '3x⁴'], correct: 2, explanation: 'd/dx(x⁴) = 4x³' },
      { id: 7, question: 'Find the derivative of 2x³ - 3x + 1', options: ['6x² - 3', '6x - 3', '2x² - 3', '6x² + 3'], correct: 0, explanation: 'd/dx(2x³ - 3x + 1) = 6x² - 3' },
      { id: 8, question: 'What is the derivative of √x (or x^0.5)?', options: ['1/(2√x)', '1/√x', '2/√x', '√x/2'], correct: 0, explanation: 'd/dx(x^0.5) = 0.5x^(-0.5) = 1/(2√x)' },
      { id: 9, question: 'At what point is the derivative of x² - 4x + 3 equal to 0?', options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'], correct: 1, explanation: 'd/dx = 2x - 4 = 0, so x = 2' },
      { id: 10, question: 'Find the derivative of x⁵ + x²', options: ['5x⁴ + 2x', '5x⁴ + x', 'x⁴ + 2x', '5x⁵ + 2x²'], correct: 0, explanation: 'd/dx(x⁵ + x²) = 5x⁴ + 2x' }
    ]
  },
  {
    id: 'gcse-statistics',
    title: 'GCSE Statistics & Probability',
    category: 'GCSE',
    year: 'GCSE',
    difficulty: 'Hard',
    topic: 'Statistics',
    icon: '📊',
    description: 'Statistics and probability analysis',
    timeLimit: 600,
    totalQuestions: 10,
    questions: [
      { id: 1, question: 'What is the mean of 2, 4, 6, 8, 10?', options: ['5', '6', '7', '8'], correct: 1, explanation: 'Mean = (2+4+6+8+10)/5 = 30/5 = 6' },
      { id: 2, question: 'What is the median of 1, 3, 5, 7, 9?', options: ['3', '5', '7', '9'], correct: 1, explanation: 'Median is the middle value = 5' },
      { id: 3, question: 'What is the mode of 2, 2, 3, 4, 4, 4, 5?', options: ['2', '3', '4', '5'], correct: 2, explanation: 'Mode is the most frequent value = 4' },
      { id: 4, question: 'What is the range of 5, 10, 15, 20, 25?', options: ['15', '20', '25', '30'], correct: 2, explanation: 'Range = 25 - 5 = 20' },
      { id: 5, question: 'Probability of rolling a 6 on a fair die?', options: ['1/4', '1/6', '1/5', '1/3'], correct: 1, explanation: 'P(6) = 1/6' },
      { id: 6, question: 'Probability of getting heads or tails on a fair coin?', options: ['1/4', '1/3', '1/2', '1'], correct: 2, explanation: 'P(heads or tails) = 1' },
      { id: 7, question: 'What is the standard deviation used for?', options: ['Finding the mean', 'Measuring spread', 'Finding the median', 'Finding the range'], correct: 1, explanation: 'Standard deviation measures how spread out data is from the mean' },
      { id: 8, question: 'If P(A) = 0.3, what is P(not A)?', options: ['0.3', '0.5', '0.7', '0.9'], correct: 2, explanation: 'P(not A) = 1 - 0.3 = 0.7' },
      { id: 9, question: 'Mean of 10, 20, 30, 40, 50?', options: ['25', '30', '35', '40'], correct: 2, explanation: 'Mean = (10+20+30+40+50)/5 = 150/5 = 30' },
      { id: 10, question: 'Probability of drawing an ace from a standard deck?', options: ['1/26', '1/13', '1/12', '1/6'], correct: 1, explanation: 'P(ace) = 4/52 = 1/13' }
    ]
  }
]

// Get quizzes by category
export function getQuizzesByCategory(category) {
  return quizzes.filter(quiz => quiz.category === category)
}

// Get all categories
export function getCategories() {
  return [...new Set(quizzes.map(q => q.category))]
}

// Get quiz by ID
export function getQuizById(id) {
  return quizzes.find(quiz => quiz.id === id)
}
