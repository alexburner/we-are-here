<script lang="ts">
  import { forceLink, forceManyBody, forceSimulation, forceX } from 'd3-force'
  import type { ForceLink, ForceNode } from '../new/simulation'
  import { HEIGHT, WIDTH } from '../new/constants'
  import { forceLinks, forceNodes } from '../new/creation'

  const simulation = forceSimulation(forceNodes)
    .force(
      'link',
      forceLink(forceLinks)
        .distance((x) => x.distance)
        .strength(1),
    )
    .force('charge', forceManyBody().strength(-100))
    .force(
      'x',
      forceX((x: ForceNode) => {
        switch (x.type) {
          case 'core':
            return 0
          case 'micro':
            return WIDTH / 2
          case 'macro':
            return -WIDTH / 2
        }
      }).strength(0.04),
    )

  $: reactiveNodes = new Array<ForceNode>()
  $: reactiveLinks = new Array<ForceLink>()

  simulation.on('tick', () => {
    reactiveLinks = [...forceLinks]
    reactiveNodes = [...forceNodes]
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
