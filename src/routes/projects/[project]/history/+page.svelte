<script lang="ts">
  let { data } = $props<any>();
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  const orderedSeverities = ['CRITICAL','HIGH','MEDIUM','LOW'];

  function sevVariant(sev: string) {
    return (sev==='CRITICAL'||sev==='HIGH') ? 'destructive' : (sev==='MEDIUM' ? 'secondary' : 'outline');
  }

  function reportLink(project: string, r: any) {
    // Si conocemos el tipo, vamos al viewer adecuado
    return `/projects/${project}/reports/${r.id}`; // ambos tipos van al mismo viewer de detalle
  }
</script>

<div class="mx-auto max-w-6xl p-6 space-y-6">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-bold tracking-tight">Historial: {data.project}</h1>
    <a class="text-sm underline underline-offset-2" href={`/projects/${data.project}`}>Volver</a>
  </div>

  <Card>
    <CardHeader>
      <CardTitle>Reportes</CardTitle>
      <CardDescription>Ordenados por fecha desc</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="text-left text-muted-foreground">
            <tr class="border-b">
              <th class="py-2 pr-4">Fecha</th>
              <th class="py-2 pr-4">ID</th>
              <th class="py-2 pr-4">Tipo</th>
              <th class="py-2 pr-4">Total</th>
              <th class="py-2 pr-4">Severidades</th>
              <th class="py-2 pr-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {#each data.reports as r}
              <tr class="border-b last:border-0">
                <td class="py-2 pr-4">{new Date(r.createdAt).toLocaleString()}</td>
                <td class="py-2 pr-4">{r.id}</td>
                <td class="py-2 pr-4">{r.type || 'unknown'}</td>
                <td class="py-2 pr-4">{r.totals.total}</td>
                <td class="py-2 pr-4">
                  <div class="flex flex-wrap gap-1">
                    {#each orderedSeverities as sev}
                      {#if r.totals.bySeverity[sev]}
                        <Badge variant={sevVariant(sev)}>{sev}: {r.totals.bySeverity[sev]}</Badge>
                      {/if}
                    {/each}
                  </div>
                </td>
                <td class="py-2 pr-4">
                  <a class="underline underline-offset-2" href={reportLink(data.project, r)}>Ver</a>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
</div>


