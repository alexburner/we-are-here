export const nodes = [
  // beginning
  { name: 'Big Bloom', type: 'core' },
  // micro
  { name: 'Quantum Fields', type: 'micro' },
  { name: 'Particles', type: 'micro' },
  { name: 'Atoms', type: 'micro' },
  { name: 'Molecules', type: 'micro' },
  { name: 'Biomolecules', type: 'micro' },
  { name: 'Cells', type: 'micro' },
  { name: 'Organs', type: 'micro' },
  { name: 'Us', type: 'core' }, // crossover
  { name: 'Awareness', type: 'micro' },
  { name: 'Meaning', type: 'micro' },
  // end
  { name: 'Oneness', type: 'core' },
  // macro
  { name: 'Cultures', type: 'macro' },
  { name: 'Collectives', type: 'macro' },
  { name: 'Organisms', type: 'macro' },
  { name: 'Biospheres', type: 'macro' },
  { name: 'Geospheres', type: 'macro' },
  { name: 'Planets', type: 'macro' },
  { name: 'Stars', type: 'macro' },
  { name: 'Galaxies', type: 'macro' },
  { name: 'Cosmic Web', type: 'macro' },
] as const

type NodeName = typeof nodes[number]['name']

interface LinkSeed {
  source: NodeName
  target: NodeName
}

export const links: LinkSeed[] = [
  // composing
  { source: 'Big Bloom', target: 'Quantum Fields' },
  { source: 'Quantum Fields', target: 'Particles' },
  { source: 'Particles', target: 'Atoms' },
  { source: 'Atoms', target: 'Molecules' },
  { source: 'Molecules', target: 'Biomolecules' },
  { source: 'Biomolecules', target: 'Cells' },
  { source: 'Cells', target: 'Organs' },
  { source: 'Organs', target: 'Us' },
  { source: 'Us', target: 'Awareness' },
  { source: 'Awareness', target: 'Meaning' },
  { source: 'Meaning', target: 'Oneness' },
  // hosting
  { source: 'Oneness', target: 'Cultures' },
  { source: 'Cultures', target: 'Collectives' },
  { source: 'Collectives', target: 'Us' },
  { source: 'Us', target: 'Organisms' },
  { source: 'Organisms', target: 'Biospheres' },
  { source: 'Biospheres', target: 'Geospheres' },
  { source: 'Geospheres', target: 'Planets' },
  { source: 'Planets', target: 'Stars' },
  { source: 'Stars', target: 'Galaxies' },
  { source: 'Galaxies', target: 'Cosmic Web' },
  { source: 'Cosmic Web', target: 'Big Bloom' },
  // symmetry
  { source: 'Quantum Fields', target: 'Cosmic Web' },
  { source: 'Galaxies', target: 'Particles' },
  { source: 'Stars', target: 'Atoms' },
  { source: 'Planets', target: 'Molecules' },
  { source: 'Geospheres', target: 'Biomolecules' },
  { source: 'Biospheres', target: 'Cells' },
  { source: 'Organisms', target: 'Organs' },
  { source: 'Collectives', target: 'Awareness' },
  { source: 'Cultures', target: 'Meaning' },
]
