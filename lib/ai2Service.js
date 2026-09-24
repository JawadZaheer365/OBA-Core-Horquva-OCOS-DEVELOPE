// backend/lib/ai2Service.js
// AI-2: Confidence Band, Assumptions & Staleness

/**
 * Convert a confidence value into a confidence band.
 *
 * Confidence:
 * >= 0.85  -> high
 * 0.60-0.84 -> medium
 * < 0.60   -> low
 *
 * @param {number} confidence
 * @returns {string}
 */
function getConfidenceBand(confidence) {
  if (typeof confidence !== 'number') {
    throw new Error('Confidence must be a number');
  }

  if (confidence < 0 || confidence > 1) {
    throw new Error('Confidence must be between 0 and 1');
  }

  if (confidence >= 0.85) {
    return 'high';
  }

  if (confidence >= 0.60) {
    return 'medium';
  }

  return 'low';
}

/**
 * Generate assumptions based on the scoring factors.
 *
 * Current factors:
 * - riskLevel
 * - dependencies
 * - workload
 *
 * @param {object} factors
 * @returns {object}
 */
function generateAssumptions(factors) {
  if (!factors) {
    throw new Error('Factors are required');
  }

  return {
    riskLevel: 'Risk data is from the last 30 days',
    dependencies: 'Dependencies count is verified',
    workload: 'Workload is up-to-date'
  };
}

/**
 * Determine whether a score is stale based on its timestamp.
 *
 * Scores older than 30 days are considered stale.
 *
 * @param {string|Date} timestamp
 * @returns {boolean}
 */
function isStale(timestamp) {
  if (!timestamp) {
    throw new Error('Timestamp is required');
  }

  const scoreDate = new Date(timestamp);

  if (Number.isNaN(scoreDate.getTime())) {
    throw new Error('Invalid timestamp');
  }

  const now = new Date();

  const ageInDays =
    (now.getTime() - scoreDate.getTime()) /
    (1000 * 60 * 60 * 24);

  return ageInDays > 30;
}

module.exports = {
  getConfidenceBand,
  generateAssumptions,
  isStale
};