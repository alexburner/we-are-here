<script lang="ts">
  import {
    forceLink,
    forceManyBody,
    forceSimulation,
    forceX,
    SimulationNodeDatum,
  } from 'd3-force'
  import { HEIGHT, WIDTH } from '../new/constants'
  import { links, nodes } from '../new/creation'

  const simulation = forceSimulation(nodes as unknown as SimulationNodeDatum[])
    .force(
      'link',
      forceLink(links)
        .distance((link) => link.distance)
        .strength((link) => link.strength),
    )
    .force('charge', forceManyBody().strength(-10))
    .force(
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

  $: reactiveLinks = []
  $: reactiveNodes = []

  simulation.on('tick', () => {
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
    reactiveLinks = links.map((link) => link)
    reactiveNodes = nodes.map((node) => node)
  })
</script>

<svelte:head>
  <title>we are here</title>
</svelte:head>

<h1>we are here</h1>

<svg width={WIDTH} height={HEIGHT}>
  <g>
    {#each reactiveLinks as link}
      <line
        stroke="#999"
        stroke-opacity="0.6"
        x1={link.source.x + WIDTH / 2}
        y1={link.source.y + HEIGHT / 2}
        x2={link.target.x + WIDTH / 2}
        y2={link.target.y + HEIGHT / 2}
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
        cx={node.x + WIDTH / 2}
        cy={node.y + HEIGHT / 2}
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
