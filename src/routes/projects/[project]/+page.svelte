<script lang="ts">
  let { data } = $props<any>();
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import { buttonVariants } from "$lib/components/ui/button/button.svelte";
  import { Tabs, TabsList, TabsTrigger, TabsContent } from "$lib/components/ui/tabs";
  import ReportView from '$lib/report/ReportView.svelte';
  import GitleaksView from '$lib/report/GitleaksView.svelte';
  import SyftView from '$lib/report/SyftView.svelte';
  const orderedSeverities = ['CRITICAL','HIGH','MEDIUM','LOW'];
  function sevVariant(sev: string) {
    return (sev==='CRITICAL'||sev==='HIGH') ? 'destructive' : (sev==='MEDIUM' ? 'secondary' : 'outline');
  }
</script>

<div class="mx-auto max-w-6xl p-6 space-y-6">
  <div class="flex items-center justify-between gap-3">
    <h1 class="text-2xl font-bold tracking-tight">Proyecto: {data.project}</h1>
    <div class="flex items-center gap-2">
      <a href={`/projects/${data.project}/history`} class={buttonVariants({ variant: 'outline' })}>Ver historial</a>
      <a href={`/projects/${data.project}/upload`} class={buttonVariants({ variant: 'default' })}>Subir reporte</a>
      <button class={buttonVariants({ variant: 'outline' })} onclick={async()=>{if(confirm('¿Eliminar proyecto?')){await fetch(`/api/projects/${encodeURIComponent(data.project)}/delete`,{method:'DELETE'});window.location.href='/projects';}}}>Eliminar</button>
    </div>
  </div>

  <Tabs value={(() => {
    if (data.latestTrivy) return 'vulnerabilidades';
    if (data.latestGitleaks) return 'secretos';
    if (data.latestSyft) return 'dependencias';
    return 'vulnerabilidades';
  })()} class="w-full">
    <TabsList>
      <TabsTrigger value="vulnerabilidades">Vulnerabilidades</TabsTrigger>
      <TabsTrigger value="secretos">Secretos</TabsTrigger>
      <TabsTrigger value="dependencias">Dependencias</TabsTrigger>
    </TabsList>

    <TabsContent value="vulnerabilidades" class="space-y-4">
      {#if data.latestTrivy}
        <ReportView prepared={data.latestTrivy.prepared} />
      {:else}
        <p class="text-sm text-muted-foreground">Sin reportes de vulnerabilidades aún.</p>
      {/if}
    </TabsContent>

    <TabsContent value="secretos" class="space-y-4">
      {#if data.latestGitleaks}
        <GitleaksView prepared={data.latestGitleaks.prepared} />
      {:else}
        <p class="text-sm text-muted-foreground">Sin reportes de secretos aún.</p>
      {/if}
    </TabsContent>

    <TabsContent value="dependencias" class="space-y-4">
      {#if data.latestSyft}
        <SyftView prepared={data.latestSyft.prepared} />
      {:else}
        <p class="text-sm text-muted-foreground">Sin reportes de dependencias aún.</p>
      {/if}
    </TabsContent>
  </Tabs>
</div>


