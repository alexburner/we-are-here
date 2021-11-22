export const nodes = [
  // beginning
  { name: 'Big Bloom' },
  // micro
  { name: 'Quantum Fields' },
  { name: 'Particles' },
  { name: 'Atoms' },
  { name: 'Molecules' },
  { name: 'Biomolecules' },
  { name: 'Cells' },
  { name: 'Organs' },
  { name: 'Us' }, // crossover
  { name: 'Awareness' },
  { name: 'Meaning' },
  // end
  { name: 'Oneness' },
  // macro
  { name: 'Cultures' },
  { name: 'Collectives' },
  { name: 'Organisms' },
  { name: 'Biospheres' },
  { name: 'Geospheres' },
  { name: 'Planets' },
  { name: 'Stars' },
  { name: 'Galaxies' },
  { name: 'Cosmic Web' },
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
  { source: 'Collectives', target: 'Organisms' },
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
