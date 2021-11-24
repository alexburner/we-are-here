import { forceLink, forceManyBody, forceSimulation, forceX } from 'd3-force'
import type { SimulationNodeDatum, SimulationLinkDatum, Force } from 'd3-force'
import { WIDTH, HEIGHT } from './constants'
import type { StageType, StageName } from './models'

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

export interface Node extends SimulationNodeDatum {
  type: StageType
  name?: StageName
}

export interface Link extends SimulationLinkDatum<Node> {
  distance: number
  source: Node
  target: Node
}

const createNodes = (initNodes: InitNode[]): Node[] =>
  initNodes.map((initNode) => ({
    type: initNode.type,
    name: initNode.name,
  }))

const createLinks = (initLinks: InitLink[], nodes: Node[]): Link[] =>
  initLinks.map((initLink) => {
    const source = nodes[initLink.sourceIndex]
    const target = nodes[initLink.targetIndex]
    if (!source || !target) throw new Error('failed to create link')
    return {
      distance: initLink.distance,
      source,
      target,
    }
  })

export const createSimulation = (
  initNodes: InitNode[],
  initLinks: InitLink[],
  onTick: (nodes: Node[], links: Link[]) => void,
): void => {
  const nodes = createNodes(initNodes)
  const links = createLinks(initLinks, nodes)
  const simulation = forceSimulation<Node, Link>(nodes).alphaDecay(0)
  // simulation.force('link', forceLink(links).distance(5).strength(1))
  simulation.force('link', forceFixedLink(links))
  simulation.force('charge', forceManyBody().strength(-10))
  simulation.force(
    'x',
    forceX((d) => {
      switch (d.type) {
        case 'core':
          return 0
        case 'micro':
          return WIDTH / 2
        case 'macro':
          return -WIDTH / 2
      }
    }),
  )

  nodes.forEach((node) => {
    if (node.name === 'Big Bloom') {
      node.fx = 0
      node.fy = -HEIGHT * (4 / 10)
    }
    if (node.name === 'Oneness') {
      node.fx = 0
      node.fy = HEIGHT * (4 / 10)
    }
  })

  simulation.on('tick', () => {
    onTick(nodes, links)
  })
}

const forceFixedLink =
  (links: Link[]): Force<Node, Link> =>
  () =>
    links.forEach((link) => {
      const { source, target, distance } = link
      if (
        source.x === undefined ||
        source.y === undefined ||
        target.x === undefined ||
        target.y === undefined
      ) {
        console.warn('Undefined node coords in link force')
        return
      }
      const distanceSq = distance * distance
      const x = source.x - target.x
      const y = source.y - target.y
      const lengthSq = x * x + y * y
      const diffSq = distanceSq - lengthSq
      if (diffSq === 0) return
      // Direct each node toward each other to reduce diff
      const halfDiffSq = diffSq / 2
      const magnitude = lengthSq / halfDiffSq / 10
      const sourceVector = {
        vx: (source.x - target.x) * magnitude,
        vy: (source.y - target.y) * magnitude,
      }
      const targetVector = {
        vx: (target.x - source.x) * magnitude,
        vy: (target.y - source.y) * magnitude,
      }
      // Update nodes with new vectors
      source.vx = source.vx ? source.vx + sourceVector.vx : sourceVector.vx
      source.vy = source.vy ? source.vy + sourceVector.vy : sourceVector.vy
      target.vx = target.vx ? target.vx + targetVector.vx : targetVector.vx
      target.vy = target.vy ? target.vy + targetVector.vy : targetVector.vy
    })
