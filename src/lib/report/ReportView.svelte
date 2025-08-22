<script lang="ts">
  import type { PreparedTrivyData } from '$lib/server/trivy';
  import { Badge } from "$lib/components/ui/badge";
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Separator } from "$lib/components/ui/separator";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
  import { Alert, AlertDescription, AlertTitle } from "$lib/components/ui/alert";
  import { buttonVariants } from "$lib/components/ui/button/button.svelte";

  let { prepared, project, onDelete }: { 
    prepared: PreparedTrivyData; 
    project?: string; 
    onDelete?: () => void; 
  } = $props();

  const severityToVariant = (severity: string) => {
    const s = (severity || '').toUpperCase();
    if (s === 'CRITICAL') return 'destructive';
    if (s === 'HIGH') return 'destructive';
    if (s === 'MEDIUM') return 'secondary';
    if (s === 'LOW') return 'outline';
    return 'outline';
  };

  const formatDate = (iso?: string) => (iso ? new Date(iso).toLocaleString() : '');
  const orderedSeverities = ['CRITICAL','HIGH','MEDIUM','LOW'];
</script>

<div class="mx-auto max-w-6xl p-6 space-y-6">
  {#if project && onDelete}
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <a href={`/projects/${encodeURIComponent(project)}`} class={buttonVariants({ variant: 'outline', size: 'sm' })}>
          ← Volver a {project}
        </a>
      </div>
      <button
        onclick={onDelete}
        class={buttonVariants({ variant: 'destructive', size: 'sm' })}
        type="button"
      >
        Eliminar reporte
      </button>
    </div>
  {/if}

  <div class="flex flex-wrap items-center justify-between gap-3">
    <div>
      <h1 class="text-2xl font-bold tracking-tight">Trivy Report</h1>
      
      <!-- Información del repositorio -->
      {#if prepared.metadata?.RepoURL}
        <div class="mt-2 space-y-1">
          <div class="flex items-center gap-2 text-sm">
            <span class="text-muted-foreground">📁 Repo:</span>
            <span class="font-medium">{prepared.metadata.RepoURL}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-muted-foreground">🌿 Rama:</span>
            <span class="font-medium">{prepared.metadata.Branch}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-muted-foreground">🔗 Commit:</span>
            <span class="font-mono text-xs bg-muted px-2 py-1 rounded">
              {prepared.metadata.Commit?.slice(0,7) || '—'}
            </span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-muted-foreground">📅 Generado:</span>
            <span class="font-medium">{formatDate(prepared.createdAt)}</span>
          </div>
        </div>
      {:else}
        <div class="mt-2 text-sm text-muted-foreground">
          📅 Generado: {formatDate(prepared.createdAt)}
        </div>
      {/if}
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-md sm:max-w-none sm:w-auto">
      <div class={`rounded-md border p-3 ${prepared.typeTotals.vulnerabilities ? '' : 'opacity-50'}`}>
        <div class="text-xs text-muted-foreground">Vulnerabilities</div>
        <div class="mt-1 text-xl font-semibold text-destructive">{prepared.typeTotals.vulnerabilities}</div>
      </div>
      <div class={`rounded-md border p-3 ${prepared.typeTotals.secrets ? '' : 'opacity-50'}`}>
        <div class="text-xs text-muted-foreground">Secrets</div>
        <div class="mt-1 text-xl font-semibold">{prepared.typeTotals.secrets}</div>
      </div>
      <div class={`rounded-md border p-3 ${prepared.typeTotals.misconfigurations ? '' : 'opacity-50'}`}>
        <div class="text-xs text-muted-foreground">Misconfigurations</div>
        <div class="mt-1 text-xl font-semibold">{prepared.typeTotals.misconfigurations}</div>
      </div>
      <div class={`rounded-md border p-3 ${prepared.typeTotals.licenses ? '' : 'opacity-50'}`}>
        <div class="text-xs text-muted-foreground">Licenses</div>
        <div class="mt-1 text-xl font-semibold">{prepared.typeTotals.licenses}</div>
      </div>
    </div>
  </div>

  <Card>
    <CardHeader>
      <CardTitle>Resumen</CardTitle>
      <CardDescription>Recuento por severidad y metadatos</CardDescription>
    </CardHeader>
    <CardContent class="space-y-3">
      {#if prepared.summary.total === 0}
        <Alert>
          <AlertTitle>Sin vulnerabilidades detectadas</AlertTitle>
          <AlertDescription>El análisis no ha encontrado vulnerabilidades.</AlertDescription>
        </Alert>
      {:else}
        <div class="flex flex-wrap gap-2">
          {#each orderedSeverities as sev}
            {#if prepared.summary.bySeverity[sev]}
              <Badge variant={severityToVariant(sev)}>{sev}: {prepared.summary.bySeverity[sev]}</Badge>
            {/if}
          {/each}
        </div>
      {/if}
      <Separator />
      <div class="grid gap-1 text-sm">
        <div><span class="text-muted-foreground">Repositorio:</span> {prepared.metadata?.RepoURL || '—'}</div>
        <div><span class="text-muted-foreground">Branch:</span> {prepared.metadata?.Branch || '—'}</div>
        <div><span class="text-muted-foreground">Commit:</span> {prepared.metadata?.Commit || '—'}</div>
        <div><span class="text-muted-foreground">Autor:</span> {prepared.metadata?.Author || '—'}</div>
      </div>
    </CardContent>
    <CardFooter class="justify-end">
      <button
        class={buttonVariants({ variant: 'default', size: 'default' })}
        onclick={() => navigator.clipboard.writeText(JSON.stringify(prepared.report, null, 2))}
        type="button"
      >
        Copiar JSON
      </button>
    </CardFooter>
  </Card>

  <Tabs value="targets" class="w-full">
    <TabsList>
      <TabsTrigger value="targets">Targets</TabsTrigger>
      <TabsTrigger value="raw">JSON</TabsTrigger>
    </TabsList>

    <TabsContent value="targets" class="space-y-4">
      {#each prepared.results as result, i (result.Target + i)}
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center justify-between gap-3">
              <span class="truncate">{result.Target}</span>
            </CardTitle>
            <CardDescription>{result.Type} • {result.Class}</CardDescription>
          </CardHeader>
          <CardContent class="space-y-3">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div class={`rounded-md border p-2 ${result.Vulnerabilities?.length ? '' : 'opacity-50'}`}>
                <div class="text-[10px] uppercase tracking-wide text-muted-foreground">Vulnerabilities</div>
                <div class="mt-0.5 text-lg font-semibold text-destructive">{(result.Vulnerabilities?.length) || 0}</div>
              </div>
              <div class={`rounded-md border p-2 ${result.Secrets?.length ? '' : 'opacity-50'}`}>
                <div class="text-[10px] uppercase tracking-wide text-muted-foreground">Secrets</div>
                <div class="mt-0.5 text-lg font-semibold">{(result.Secrets?.length) || 0}</div>
              </div>
              <div class={`rounded-md border p-2 ${result.Misconfigurations?.length ? '' : 'opacity-50'}`}>
                <div class="text-[10px] uppercase tracking-wide text-muted-foreground">Misconfigurations</div>
                <div class="mt-0.5 text-lg font-semibold">{(result.Misconfigurations?.length) || 0}</div>
              </div>
              <div class={`rounded-md border p-2 ${(result.Licenses?.length || result.LicenseFindings?.length) ? '' : 'opacity-50'}`}>
                <div class="text-[10px] uppercase tracking-wide text-muted-foreground">Licenses</div>
                <div class="mt-0.5 text-lg font-semibold">{(result.Licenses?.length || result.LicenseFindings?.length) || 0}</div>
              </div>
            </div>

            {#if result.Vulnerabilities && result.Vulnerabilities.length > 0}
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead class="text-left text-muted-foreground">
                    <tr class="border-b">
                      <th class="py-2 pr-4">ID</th>
                      <th class="py-2 pr-4">Paquete</th>
                      <th class="py-2 pr-4">Versión</th>
                      <th class="py-2 pr-4">Fix</th>
                      <th class="py-2 pr-4">Severidad</th>
                      <th class="py-2 pr-4">CVSS</th>
                      <th class="py-2 pr-4">Título</th>
                      <th class="py-2 pr-4">Fuente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {#each result.Vulnerabilities as v}
                      <tr class="border-b last:border-0 align-top">
                        <td class="py-2 pr-4">
                          {#if v.PrimaryURL}
                            <a href={v.PrimaryURL} target="_blank" class="underline underline-offset-2">{v.VulnerabilityID}</a>
                          {:else}
                            {v.VulnerabilityID}
                          {/if}
                        </td>
                        <td class="py-2 pr-4">
                          <div class="font-medium">{v.PkgName}</div>
                          <div class="text-xs text-muted-foreground">{v.PkgID}</div>
                        </td>
                        <td class="py-2 pr-4">{v.InstalledVersion || '—'}</td>
                        <td class="py-2 pr-4">{v.FixedVersion || '—'}</td>
                        <td class="py-2 pr-4">
                          <Badge variant={severityToVariant(v.Severity)}>{v.Severity || 'UNKNOWN'}</Badge>
                        </td>
                        <td class="py-2 pr-4">
                          {#if v.CVSS?.ghsa?.V3Score}
                            {v.CVSS.ghsa.V3Score}
                          {:else if v.CVSS?.nvd?.V3Score}
                            {v.CVSS.nvd.V3Score}
                          {:else}
                            —
                          {/if}
                        </td>
                        <td class="py-2 pr-4 min-w-[16rem]">{v.Title}</td>
                        <td class="py-2 pr-4 text-xs text-muted-foreground">{v.SeveritySource}</td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            {:else}
              <p class="text-sm text-muted-foreground">Sin vulnerabilidades.</p>
            {/if}

            {#if result.Secrets?.length}
              <Separator />
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Secrets</h3>
                <ul class="list-disc pl-5 text-sm">
                  {#each result.Secrets as s}
                    <li>{JSON.stringify(s)}</li>
                  {/each}
                </ul>
              </div>
            {/if}
            {#if result.Misconfigurations?.length}
              <Separator />
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Misconfigurations</h3>
                <ul class="list-disc pl-5 text-sm">
                  {#each result.Misconfigurations as m}
                    <li>{JSON.stringify(m)}</li>
                  {/each}
                </ul>
              </div>
            {/if}
            {#if (result.Licenses?.length || result.LicenseFindings?.length)}
              <Separator />
              <div class="space-y-2">
                <h3 class="text-sm font-medium">Licenses</h3>
                <ul class="list-disc pl-5 text-sm">
                  {#each (result.Licenses || result.LicenseFindings) as l}
                    <li>{JSON.stringify(l)}</li>
                  {/each}
                </ul>
              </div>
            {/if}
          </CardContent>
        </Card>
      {/each}
    </TabsContent>

    <TabsContent value="raw">
      <Card>
        <CardHeader>
          <CardTitle>Raw JSON</CardTitle>
          <CardDescription>Datos completos del reporte</CardDescription>
        </CardHeader>
        <CardContent>
          <pre class="rounded-md bg-muted p-4 text-xs overflow-x-auto max-h-[60vh]">{JSON.stringify(prepared.report, null, 2)}</pre>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</div>


