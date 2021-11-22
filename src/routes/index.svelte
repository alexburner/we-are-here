<script lang="ts">
  import { forceSimulation } from 'd3-force'
  import { links, nodes } from 'src/data/graph'

  console.log(nodes)
  console.log(links)

  const simulation = forceSimulation([])
</script>

<svelte:head>
  <title>we are here</title>
</svelte:head>

<h1>we are here</h1>

<svg width="600" height="800" />

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
