/**
 * Daily Math Facts Management System
 * 
 * This module provides utilities for managing and automating the Daily Math Facts feature.
 * 
 * USAGE:
 * 1. Add new facts to src/data/mathFacts.jsx
 * 2. The system automatically rotates facts based on the day of the year
 * 3. Facts are persisted and users see the same fact throughout the day
 * 
 * IMPLEMENTATION DETAILS:
 * - getTodaysFact() calculates which fact to show based on day of year
 * - Formula: dayOfYear % mathFacts.length ensures even distribution
 * - No database required - works with static data
 */

import { mathFacts, getTodaysFact } from '../data/mathFacts'

/**
 * Initialize daily fact system
 * Call once when app loads to set up any necessary tracking
 */
export function initializeDailyFactsSystem() {
  const todaysFact = getTodaysFact()
  console.log('📊 Daily Math Facts System Initialized')
  console.log(`📅 Today's Fact: ${todaysFact.title}`)
  console.log(`📚 Total Facts Available: ${mathFacts.length}`)
}

/**
 * Get analytics about fact distribution
 * @returns {Object} Statistics about facts and categories
 */
export function getFactsAnalytics() {
  const categories = {}
  const difficulties = {}

  mathFacts.forEach(fact => {
    categories[fact.category] = (categories[fact.category] || 0) + 1
    difficulties[fact.difficulty] = (difficulties[fact.difficulty] || 0) + 1
  })

  return {
    totalFacts: mathFacts.length,
    categoriesCount: Object.keys(categories).length,
    categories,
    difficulties,
    averageFactsPerCategory: (mathFacts.length / Object.keys(categories).length).toFixed(2),
    factsCycleLength: mathFacts.length + ' days'
  }
}

/**
 * Log fact schedule for the next N days
 * @param {number} days - Number of days to preview
 */
export function previewFactSchedule(days = 7) {
  console.log(`📅 Math Facts Schedule for the next ${days} days:`)
  console.log('─'.repeat(60))

  const today = new Date()
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000)

  for (let i = 0; i < days; i++) {
    const futureDate = new Date(today)
    futureDate.setDate(futureDate.getDate() + i)
    const futureDayOfYear = Math.floor((futureDate - new Date(futureDate.getFullYear(), 0, 0)) / 86400000)
    const factIndex = (futureDayOfYear - 1) % mathFacts.length
    const fact = mathFacts[factIndex]

    console.log(`${futureDate.toDateString()}: ${fact.title} (${fact.category})`)
  }
  console.log('─'.repeat(60))
}

/**
 * AUTOMATION SETUP:
 * 
 * Option 1: Backend Scheduled Job (Recommended for production)
 * ─────────────────────────────────────────────────────────
 * Set up a cron job on your backend (Node.js, Python, etc.) to:
 * - Trigger every 24 hours at midnight
 * - Call API endpoint to notify clients of new fact
 * - Optional: Log fact views/engagement
 * 
 * Example Node.js with node-cron:
 * 
 *   const cron = require('node-cron');
 *   
 *   cron.schedule('0 0 * * *', async () => {
 *     const todaysFact = getTodaysFact();
 *     await notifyClients(todaysFact);
 *     await logFactEngagement(todaysFact);
 *   });
 * 
 * 
 * Option 2: Browser-based (Current Implementation)
 * ─────────────────────────────────────────────────
 * The system uses client-side date calculation:
 * - Day of year % number of facts
 * - Automatically shows new fact every 24 hours
 * - No server needed for rotation
 * - Works offline
 * 
 * 
 * Option 3: Firebase/Cloud Functions
 * ────────────────────────────────────
 * 
 *   exports.dailyMathFact = functions.pubsub
 *     .schedule('every day 00:00')
 *     .timeZone('America/New_York')
 *     .onRun(async (context) => {
 *       const fact = getTodaysFact();
 *       await admin.database().ref('currentFact').set(fact);
 *     });
 * 
 * 
 * HOW TO ADD NEW FACTS:
 * ────────────────────
 * 1. Open src/data/mathFacts.jsx
 * 2. Add new object to the mathFacts array with:
 *    - id: next sequential number
 *    - date: YYYY-MM-DD format
 *    - title: Brief fact title
 *    - fact: Full fact description
 *    - category: One of the existing categories
 *    - difficulty: 'Easy', 'Medium', or 'Hard'
 *    - icon: Relevant emoji
 * 
 * Example:
 *   {
 *     id: 21,
 *     date: '2024-01-21',
 *     title: 'Graham\'s Number',
 *     fact: 'Graham\'s number is so large...',
 *     category: 'Large Numbers',
 *     difficulty: 'Hard',
 *     icon: '🚀'
 *   }
 * 
 * 3. Facts will automatically cycle in order
 * 
 * 
 * NOTIFICATION SYSTEM (For Future Enhancement):
 * ──────────────────────────────────────────────
 * 
 * export async function subscribeToDailyFacts(email) {
 *   // Subscribe user to daily email notifications
 *   const subscription = {
 *     email,
 *     subscribedAt: new Date(),
 *     frequency: 'daily'
 *   };
 *   await saveSubscription(subscription);
 * }
 * 
 * export async function sendDailyFactEmail() {
 *   const fact = getTodaysFact();
 *   const subscribers = await getSubscribers();
 *   
 *   for (const subscriber of subscribers) {
 *     await sendEmail({
 *       to: subscriber.email,
 *       subject: `📊 Today's Math Fact: ${fact.title}`,
 *       body: fact.fact
 *     });
 *   }
 * }
 */

/**
 * Export these for external integrations
 */
export { getTodaysFact } from '../data/mathFacts'
export { getRandomFact, getAllCategories, getFactsByCategory } from '../data/mathFacts'
