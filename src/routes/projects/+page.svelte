<script lang="ts">
  let { data } = $props<any>();
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import { buttonVariants } from "$lib/components/ui/button/button.svelte";
  const orderedSeverities = ['CRITICAL','HIGH','MEDIUM','LOW'];
</script>

<div class="mx-auto max-w-6xl p-6 space-y-6">
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-bold tracking-tight">Projects</h1>
    <a href="/projects/create" class={buttonVariants({ variant: 'default' })}>Crear proyecto</a>
  </div>

  

  <div class="grid gap-4 sm:grid-cols-2">
    {#each data.projects as p}
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center justify-between">
            <a href={`/projects/${p.name}`} class="underline underline-offset-2">{p.name}</a>
            <Badge>Reportes: {p.reportCount}</Badge>
          </CardTitle>
          <CardDescription>Último: {p.latest?.createdAt ? new Date(p.latest.createdAt).toLocaleString() : '—'}</CardDescription>
        </CardHeader>
        <CardContent>
          {#if p.latest}
            <div class="flex flex-wrap gap-2">
              {#each orderedSeverities as sev}
                {#if p.latest.totals.bySeverity[sev]}
                  <Badge variant={sev==='CRITICAL' || sev==='HIGH' ? 'destructive' : (sev==='MEDIUM' ? 'secondary' : 'outline')}>
                    {sev}: {p.latest.totals.bySeverity[sev]}
                  </Badge>
                {/if}
              {/each}
            </div>
          {:else}
            <p class="text-sm text-muted-foreground">Sin reportes.</p>
          {/if}
        </CardContent>
      </Card>
    {/each}
  </div>

  <!-- CLI Information Card -->
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        🚀 CLI de OpenReport
      </CardTitle>
      <CardDescription>
        Instala y usa la CLI para escanear repositorios automáticamente
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <div>
        <h4 class="font-medium mb-2">📥 Instalación:</h4>
        <div class="bg-muted p-3 rounded-md font-mono text-sm">
          curl -L -o openreport https://raw.githubusercontent.com/kettu-studio/openreport/main/cli/openreport && chmod +x openreport && sudo mv openreport /usr/local/bin/
        </div>
      </div>
      
      <div>
        <h4 class="font-medium mb-2">🔍 Comando de escaneo:</h4>
        <div class="bg-muted p-3 rounded-md font-mono text-sm">
          openreport scan ./ -p nombre-proyecto --api https://openreport.kettu.tech
        </div>
        <p class="text-sm text-muted-foreground mt-2">
          Este comando instalará automáticamente Trivy, Gitleaks y Syft, escaneará el directorio actual y subirá los reportes al proyecto especificado.
        </p>
      </div>

      <div>
        <h4 class="font-medium mb-2">📤 Subir reporte existente:</h4>
        <div class="bg-muted p-3 rounded-md font-mono text-sm">
          openreport upload reporte.json -p nombre-proyecto --api https://openreport.kettu.tech
        </div>
      </div>

      <div class="pt-2 border-t">
        <p class="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> La CLI detecta automáticamente el tipo de reporte (Trivy, Gitleaks, Syft) y lo procesa correctamente. Syft analiza dependencias y paquetes del proyecto.
        </p>
      </div>
    </CardContent>
  </Card>
</div>


