<script lang="ts">
  import type { PreparedGitleaksData } from '$lib/server/gitleaks';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import { Tabs, TabsList, TabsTrigger, TabsContent } from "$lib/components/ui/tabs";

  let { prepared }: { prepared: PreparedGitleaksData } = $props();
</script>

<div class="mx-auto max-w-6xl p-6 space-y-4">
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


