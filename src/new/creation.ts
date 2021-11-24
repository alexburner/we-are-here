import { stageLinks, stageSeeds, substageSeeds } from './models'
import type { InitNode, InitLink } from './simulation'
import type { Body, Line, Label } from './elements'
import type { StageName, StageType } from './models'

export const nodes: InitNode[] = []
export const links: InitLink[] = []

const nodesByName = new Map<StageName, InitNode>()
const stageLabelNodesByName = new Map<StageName, InitNode>()

const addNode = (node: InitNode): number => {
  if (node.name) nodesByName.set(node.name, node)
  nodes.push(node)
  return nodes.length - 1
}

const addLink = (link: InitLink): number => {
  links.push(link)
  return links.length - 1
}

export const bodies: Body[] = stageSeeds.map((seed) => ({
  nodeIndex: addNode({
    index: nodes.length,
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
    index: nodes.length,
    type,
  })
  const childNodeIndex = addNode({
    index: nodes.length,
    type,
  })
  if (isStageLabel) {
    stageLabelNodesByName.set(text, nodes[childNodeIndex])
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
