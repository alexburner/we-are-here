import type { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force'
import type { StageType, StageName } from './models'

export interface InitNode {
  index: number
  type: StageType // for ForceX
  name?: StageName // for pinning beginning & end
}

export interface InitLink {
  distance: number // width of label, or default
  strength: number
  source: number
  target: number
}

export type Node = InitNode & SimulationNodeDatum

export type Link = InitLink & SimulationLinkDatum<Node>
