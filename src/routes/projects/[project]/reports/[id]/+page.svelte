<script lang="ts">
  let { data, params } = $props<any>();
  import ReportView from '$lib/report/ReportView.svelte';
  import GitleaksView from '$lib/report/GitleaksView.svelte';
  
  async function deleteReport() {
    if (!confirm('¿Estás seguro de que quieres eliminar este reporte? Esta acción no se puede deshacer.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/projects/${encodeURIComponent(params.project)}/reports/${encodeURIComponent(params.id)}/delete`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        // Redirigir al historial del proyecto
        window.location.href = `/projects/${encodeURIComponent(params.project)}/history`;
      } else {
        const error = await response.json();
        alert(`Error al eliminar el reporte: ${error.error || 'Error desconocido'}`);
      }
    } catch (error) {
      alert('Error al eliminar el reporte');
    }
  }
</script>

{#if data.notFound}
  <div class="p-6 text-sm text-muted-foreground">Reporte no encontrado.</div>
{:else}
  {#if data.kind === 'trivy'}
    <ReportView 
      prepared={data.prepared} 
      project={params.project}
      onDelete={deleteReport}
    />
  {:else if data.kind === 'gitleaks'}
    <GitleaksView 
      prepared={data.prepared}
      project={params.project}
      onDelete={deleteReport}
    />
  {:else}
    <div class="p-6 text-sm text-muted-foreground">Formato de reporte no reconocido.</div>
  {/if}
{/if}


