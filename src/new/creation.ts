import { stageLinks, stageSeeds, substageSeeds } from './models'
import type { InitNode, InitLink, ForceNode, ForceLink } from './simulation'
import type { Body, Line, Label } from './elements'
import type { StageName, StageType } from './models'
import { HEIGHT } from './constants'
import { jiggle } from './util'

export const initNodes: InitNode[] = []
export const initLinks: InitLink[] = []

const nodesByName = new Map<StageName, InitNode>()
const stageLabelNodesByName = new Map<StageName, InitNode>()

const addNode = (node: InitNode): number => {
  if (node.name) nodesByName.set(node.name, node)
  initNodes.push(node)
  return initNodes.length - 1
}

const addLink = (link: InitLink): number => {
  initLinks.push(link)
  return initLinks.length - 1
}

export const bodies: Body[] = stageSeeds.map((seed) => ({
  nodeIndex: addNode({
    index: initNodes.length,
    type: seed.type,
    name: seed.name,
  }),
}))

export const lines: Line[] = stageLinks.map((link) => {
  const source = nodesByName.get(link.source)
  const target = nodesByName.get(link.target)
  if (!source || !target) throw new Error('link line failed')
  return {
    linkIndex: addLink({
      distance: 1,
      strength: 1,
      sourceIndex: source.index,
      targetIndex: target.index,
    }),
  }
})

const addLabel = (
  type: StageType,
  text: string,
  targetNodeIndex: number,
  isStageLabel?: boolean,
): Label => {
  const parentNodeIndex = addNode({
    index: initNodes.length,
    type,
  })
  const childNodeIndex = addNode({
    index: initNodes.length,
    type,
  })
  if (isStageLabel) {
    const name = text as StageName
    const node = initNodes[childNodeIndex]
    if (!node) throw new Error('add stage label failed')
    stageLabelNodesByName.set(name, node)
  }
  const bodyLinkIndex = addLink({
    distance: 10, // TODO measure text
    strength: 3,
    sourceIndex: parentNodeIndex,
    targetIndex: childNodeIndex,
  })
  addLink({
    distance: 0.01,
    strength: 3,
    sourceIndex: parentNodeIndex,
    targetIndex: targetNodeIndex,
  })
  return {
    text,
    linkIndex: bodyLinkIndex,
  }
}

export const labels: Label[] = [
  ...stageSeeds.map((seed) => {
    const targetNode = nodesByName.get(seed.name)
    if (!targetNode) throw new Error('stageSeeds line failed')
    return addLabel(seed.type, seed.name, targetNode.index, true)
  }),
  ...substageSeeds.map((seed) => {
    const stageNode = nodesByName.get(seed.parent)
    const targetNode = stageLabelNodesByName.get(seed.parent)
    if (!stageNode || !targetNode) throw new Error('substageSeed line failed')
    return addLabel(stageNode.type, seed.name, targetNode.index)
  }),
]

export const forceNodes: ForceNode[] = initNodes.map((initNode) => ({
  type: initNode.type,
  name: initNode.name,
  x: jiggle(0, 100),
  y: jiggle(0, 100),
}))

forceNodes.forEach((node) => {
  if (node.name === 'Big Bloom') {
    node.fx = 0
    node.fy = -HEIGHT * (4 / 10)
  }
  if (node.name === 'Oneness') {
    node.fx = 0
    node.fy = HEIGHT * (4 / 10)
  }
})

export const forceLinks: ForceLink[] = initLinks.map((initLink) => {
  const source = forceNodes[initLink.sourceIndex]
  const target = forceNodes[initLink.targetIndex]
  if (!source || !target) throw new Error('failed to create link')
  return {
    distance: initLink.distance,
    strength: initLink.strength,
    source,
    target,
  }
})
