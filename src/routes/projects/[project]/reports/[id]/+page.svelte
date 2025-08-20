<script lang="ts">
  let { data } = $props<any>();
  import ReportView from '$lib/report/ReportView.svelte';
  import GitleaksView from '$lib/report/GitleaksView.svelte';
</script>

{#if data.notFound}
  <div class="p-6 text-sm text-muted-foreground">Reporte no encontrado.</div>
{:else}
  {#if data.kind === 'trivy'}
    <ReportView prepared={data.prepared} />
  {:else if data.kind === 'gitleaks'}
    <GitleaksView prepared={data.prepared} />
  {:else}
    <div class="p-6 text-sm text-muted-foreground">Formato de reporte no reconocido.</div>
  {/if}
{/if}


