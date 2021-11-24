import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force'
import type { StageType, StageName } from './models'

/**
 * Types for pre-simulation initialization
 */

export interface InitNode {
  index: number
  type: StageType // for ForceX
  name?: StageName // for pinning beginning & end
}

export interface InitLink {
  distance: number // width of label, or default
  strength: number
  sourceIndex: number
  targetIndex: number
}

/**
 * Types for running simulation
 */

export interface ForceNode extends SimulationNodeDatum {
  type: StageType // for ForceX
  name?: StageName // for pinning beginning & end
  x: number
  y: number
}

export interface ForceLink extends SimulationLinkDatum<ForceNode> {
  distance: number
  strength: number
  source: ForceNode
  target: ForceNode
}
