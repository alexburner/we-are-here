<script lang="ts">
  import {
    forceLink,
    forceManyBody,
    forceSimulation,
    forceX,
    forceY,
    SimulationNodeDatum,
  } from 'd3-force'
  import { links, nodes } from '../data/graph'

  nodes.forEach((node) => {
    node.x = 300 + 100 * Math.random() * (Math.random() > 0.5 ? -1 : 1)
    node.y = 450 + 100 * Math.random() * (Math.random() > 0.5 ? -1 : 1)
  })

  const simulation = forceSimulation(nodes as unknown as SimulationNodeDatum[])
    .force(
      'link',
      forceLink(links)
        .id((d) => d.name)
        .distance(30)
        .strength(2),
    )
    .force('charge', forceManyBody().strength(-50))
    .force(
      'x',
      forceX((d) => {
        switch (d.type) {
          case 'core':
            return 300
          case 'micro':
            return 600
          case 'macro':
            return 0
        }
      }),
    )

  $: reactiveLinks = []
  $: reactiveNodes = []

  simulation.on('tick', () => {
    nodes.forEach((node) => {
      if (node.name === 'Big Bloom') {
        node.fx = 300
        node.fy = 120
      }
      if (node.name === 'Oneness') {
        node.fx = 300
        node.fy = 660
      }
    })
    reactiveLinks = links.map((link) => Object.create(link))
    reactiveNodes = nodes.map((node) => Object.create(node))
  })
</script>

<svelte:head>
  <title>we are here</title>
</svelte:head>

<h1>we are here</h1>

<svg width="600" height="800">
  <g>
    {#each reactiveLinks as link}
      <line
        stroke="#999"
        stroke-opacity="0.6"
        x1={link.source.x}
        y1={link.source.y}
        x2={link.target.x}
        y2={link.target.y}
      />
    {/each}
  </g>
  <g>
    {#each reactiveNodes as node}
      <circle
        r="3.5"
        fill="#FFF"
        stroke="#999"
        stroke-width="1.5"
        cx={node.x}
        cy={node.y}
      />
    {/each}
  </g>
</svg>

<style>
  h1 {
    text-align: center;
  }

  svg {
    display: block;
    margin: auto;
    background-color: antiquewhite;
  }
</style>
