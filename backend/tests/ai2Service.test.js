/*
 * OBA Core — AI-2 unit test
 * Tests confidence band, assumptions, and staleness.
 */

const {
    getConfidenceBand,
    generateAssumptions,
    isStale
} = require('../../lib/ai2Service')

let passed = 0
let failed = 0

function check(name, cond) {
    if (cond) {
        passed++
        console.log('  ✓', name)
    } else {
        failed++
        console.error('  ✗', name)
    }
}

console.log('\n=== OBA Core — AI-2 Unit Test ===\n')

// --------------------------------------------------
// Confidence Band
// --------------------------------------------------

check(
    '0.90 confidence returns high',
    getConfidenceBand(0.90) === 'high'
)

check(
    '0.70 confidence returns medium',
    getConfidenceBand(0.70) === 'medium'
)

check(
    '0.50 confidence returns low',
    getConfidenceBand(0.50) === 'low'
)

check(
    '0.85 confidence returns high',
    getConfidenceBand(0.85) === 'high'
)

check(
    '0.60 confidence returns medium',
    getConfidenceBand(0.60) === 'medium'
)

// --------------------------------------------------
// Assumptions
// --------------------------------------------------

const factors = {
    riskLevel: 'high',
    dependencies: 6,
    workload: 85
}

const assumptions = generateAssumptions(factors)

check(
    'Risk assumption is generated',
    assumptions.riskLevel === 'Risk data is from the last 30 days'
)

check(
    'Dependencies assumption is generated',
    assumptions.dependencies === 'Dependencies count is verified'
)

check(
    'Workload assumption is generated',
    assumptions.workload === 'Workload is up-to-date'
)

// --------------------------------------------------
// Staleness
// --------------------------------------------------

const freshDate = new Date().toISOString()

const oldDate = new Date(
    Date.now() - (31 * 24 * 60 * 60 * 1000)
).toISOString()

check(
    'Recent score is not stale',
    isStale(freshDate) === false
)

check(
    'Score older than 30 days is stale',
    isStale(oldDate) === true
)

// --------------------------------------------------
// Result
// --------------------------------------------------

console.log(`\n=== Result: ${passed} passed, ${failed} failed ===\n`)

process.exit(failed === 0 ? 0 : 1)