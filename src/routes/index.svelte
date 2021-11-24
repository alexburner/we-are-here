<script lang="ts">
  import { createSimulation } from '../new/simulation'
  import type { Node, Link } from '../new/simulation'
  import { HEIGHT, WIDTH } from '../new/constants'
  import { links, nodes } from '../new/creation'

  $: reactiveNodes = new Array<Node>()
  $: reactiveLinks = new Array<Link>()

  createSimulation(nodes, links, (forceNodes, forceLinks) => {
    reactiveNodes = [...forceNodes]
    reactiveLinks = [...forceLinks]
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
        cx={node.x ?? 0 + WIDTH / 2}
        cy={node.y ?? 0 + HEIGHT / 2}
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
