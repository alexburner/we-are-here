import type { SimulationNodeDatum, SimulationLinkDatum, Force } from 'd3-force'
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
  source: ForceNode
  target: ForceNode
}

/**
 * Fixed-length links
 */

export const forceLinkFixed =
  (links: ForceLink[]): Force<ForceNode, ForceLink> =>
  (alpha) => {
    links.forEach((link) => {
      const { source, target, distance } = link
      if (
        source.x === undefined ||
        source.y === undefined ||
        target.x === undefined ||
        target.y === undefined
      ) {
        console.warn('Undefined node position in fixed link force')
        return
      }
      if (
        source.vx === undefined ||
        source.vy === undefined ||
        target.vx === undefined ||
        target.vy === undefined
      ) {
        console.warn('Undefined node velocity in fixed link force')
        return
      }
      const distanceSq = distance * distance
      const x = source.x - target.x
      const y = source.y - target.y
      const lengthSq = x * x + y * y
      const diffSq = distanceSq - lengthSq
      if (diffSq === 0) return
      const magnitude = (diffSq / lengthSq / 2) * alpha
      const sourceVector = {
        vx: (source.x - target.x) * magnitude,
        vy: (source.y - target.y) * magnitude,
      }
      // Update nodes with new vectors
      source.vx += sourceVector.vx
      source.vy += sourceVector.vy
    })
  }
