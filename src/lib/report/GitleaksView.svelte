<script lang="ts">
  import type { PreparedGitleaksData } from '$lib/server/gitleaks';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import { Tabs, TabsList, TabsTrigger, TabsContent } from "$lib/components/ui/tabs";
  import { buttonVariants } from "$lib/components/ui/button/button.svelte";

  let { prepared, project, onDelete }: { 
    prepared: PreparedGitleaksData; 
    project?: string; 
    onDelete?: () => void; 
  } = $props();
</script>

<div class="mx-auto max-w-6xl p-6 space-y-4">
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

  <!-- Información del repositorio -->
  <div class="flex flex-wrap items-center justify-between gap-3">
    <div>
      <h1 class="text-2xl font-bold tracking-tight">Gitleaks Report</h1>
      
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
            <span class="font-medium">{new Date(prepared.createdAt || Date.now()).toLocaleString()}</span>
          </div>
        </div>
      {:else}
        <div class="mt-2 text-sm text-muted-foreground">
          📅 Generado: {new Date(prepared.createdAt || Date.now()).toLocaleString()}
        </div>
      {/if}
    </div>
    
    <!-- Resumen de hallazgos -->
    <div class="text-right">
      <div class="text-2xl font-bold text-destructive">{prepared.summary.total}</div>
      <div class="text-sm text-muted-foreground">Secretos detectados</div>
    </div>
  </div>

  <Card>
    <CardHeader>
      <CardTitle>Gitleaks</CardTitle>
      <CardDescription>Resumen por regla</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex flex-wrap gap-2">
        {#each Object.entries(prepared.summary.byRule) as [rule, count]}
          <Badge>{rule}: {count}</Badge>
        {/each}
        {#if prepared.summary.total === 0}
          <p class="text-sm text-muted-foreground">Sin hallazgos.</p>
        {/if}
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Hallazgos</CardTitle>
      <CardDescription>Listado de secretos detectados</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="text-left text-muted-foreground">
            <tr class="border-b">
              <th class="py-2 pr-4">Rule</th>
              <th class="py-2 pr-4">File</th>
              <th class="py-2 pr-4">Commit</th>
              <th class="py-2 pr-4">Author</th>
              <th class="py-2 pr-4">Date</th>
              <th class="py-2 pr-4">Message</th>
              <th class="py-2 pr-4">Link</th>
            </tr>
          </thead>
          <tbody>
            {#each prepared.findings as f}
              <tr class="border-b last:border-0 align-top">
                <td class="py-2 pr-4"><Badge>{f.RuleID}</Badge></td>
                <td class="py-2 pr-4">{f.File}</td>
                <td class="py-2 pr-4 text-xs">{f.Commit}</td>
                <td class="py-2 pr-4">{f.Author}</td>
                <td class="py-2 pr-4">{new Date(f.Date).toLocaleString?.() || f.Date}</td>
                <td class="py-2 pr-4 min-w-[16rem]">{f.Message}</td>
                <td class="py-2 pr-4">{#if f.Link}<a class="underline underline-offset-2" href={f.Link} target="_blank">ver</a>{/if}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
</div>


