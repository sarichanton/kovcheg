import type { BenchmarkType } from '../../types/benchmark'

/**
 * How a benchmark result's headline score should be presented. A partial run
 * (System Only / AI Only) is NOT the NOMAD Score -- the NOMAD Score is the full
 * benchmark composite -- so partial results are flagged to avoid users
 * mistaking a partial number for their NOMAD Score. The stored score for a
 * partial run is already renormalized to that category's own 0-100 range
 * (see BenchmarkService._calculateNomadScore).
 */
export function getScoreDisplay(type: BenchmarkType): { isPartial: boolean } {
  return { isPartial: type === 'system' || type === 'ai' }
}
