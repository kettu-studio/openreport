<script lang="ts">
  let { data } = $props<any>();
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import { buttonVariants } from "$lib/components/ui/button/button.svelte";
  const orderedSeverities = ['CRITICAL','HIGH','MEDIUM','LOW'];
</script>

<div class="mx-auto max-w-5xl p-6 space-y-6">
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
</div>


