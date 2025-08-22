<script lang="ts">
  import type { PreparedSyftData } from '$lib/server/syft';
  import { Badge } from "$lib/components/ui/badge";
  import { buttonVariants } from "$lib/components/ui/button/button.svelte";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Separator } from "$lib/components/ui/separator";
  import Trash2Icon from "@lucide/svelte/icons/trash-2";
  import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
  import { createEventDispatcher } from "svelte";

  let { prepared, project, onDelete }: { 
    prepared: PreparedSyftData; 
    project?: string; 
    onDelete?: () => void; 
  } = $props();
  const dispatch = createEventDispatcher();

  // Extraer metadatos del reporte
  const metadata = $derived(prepared?.metadata || {});
  const artifacts = $derived(prepared?.artifacts || []);
  const createdAt = $derived(prepared?.createdAt || new Date().toISOString());

  // Agrupar artefactos por tipo
  const artifactsByType = $derived(artifacts.reduce((acc: Record<string, any[]>, artifact: any) => {
    const type = artifact.type || 'unknown';
    if (!acc[type]) acc[type] = [];
    acc[type].push(artifact);
    return acc;
  }, {}));

  // Obtener tipos únicos ordenados
  const artifactTypes = $derived(Object.keys(artifactsByType).sort());
  
  // Función para formatear CPEs de manera legible
  function formatCPE(cpeString: string): string {
    if (!cpeString) return '';
    
    // Parsear el CPE: cpe:2.3:a:vendor:product:version:...
    const parts = cpeString.split(':');
    if (parts.length >= 6) {
      const vendor = parts[3];
      const product = parts[4];
      const version = parts[5];
      
      let formatted = `${vendor}/${product}`;
      if (version && version !== '*' && version !== '-') {
        formatted += ` (${version})`;
      }
      return formatted;
    }
    
    return cpeString;
  }
  

</script>

<div class="mx-auto max-w-6xl p-6 space-y-6">
  <!-- Header con botones de navegación -->
  {#if project && onDelete}
    <div class="flex items-center justify-between">
      <a 
        href="/projects/{encodeURIComponent(project)}" 
        class={buttonVariants({ variant: 'outline' })}
      >
        <ArrowLeftIcon class="w-4 h-4 mr-2" />
        Volver a {project}
      </a>
      <button 
        on:click={onDelete}
        class={buttonVariants({ variant: 'destructive' })}
      >
        <Trash2Icon class="w-4 h-4 mr-2" />
        Eliminar reporte
      </button>
    </div>
  {/if}

  <!-- Título principal -->
  <div class="flex flex-wrap items-center justify-between gap-3">
    <div>
      <h1 class="text-2xl font-bold tracking-tight">Syft Report</h1>
      
      <!-- Información del repositorio -->
      {#if metadata.repoURL}
        <div class="mt-2 space-y-1">
          <div class="flex items-center gap-2 text-sm">
            <span class="text-muted-foreground">📁 Repo:</span>
            <span class="font-medium">{metadata.repoURL}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-muted-foreground">🌿 Rama:</span>
            <span class="font-medium">{metadata.branch}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-muted-foreground">🔗 Commit:</span>
            <span class="font-mono text-xs bg-muted px-2 py-1 rounded">
              {metadata.commit?.slice(0,7) || '—'}
            </span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-muted-foreground">📅 Generado:</span>
            <span class="font-medium">{new Date(createdAt).toLocaleString()}</span>
          </div>
        </div>
      {:else}
        <div class="mt-2 text-sm text-muted-foreground">
          📅 Generado: {new Date(createdAt).toLocaleString()}
        </div>
      {/if}
    </div>
    
    <!-- Resumen de artefactos -->
    <div class="text-right">
      <div class="text-2xl font-bold">{artifacts.length}</div>
      <div class="text-sm text-muted-foreground">Artefactos detectados</div>
    </div>
  </div>

  <!-- Resumen por tipo -->
  <Card>
    <CardHeader>
      <CardTitle>📊 Resumen del Escaneo</CardTitle>
      <CardDescription>
        Se encontraron {artifacts.length} artefactos en {artifactTypes.length} tipos diferentes
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex flex-wrap gap-2">
        {#each artifactTypes as type}
          <Badge variant="secondary">
            {type}: {artifactsByType[type].length}
          </Badge>
        {/each}
        {#if artifacts.length === 0}
          <p class="text-sm text-muted-foreground">Sin artefactos detectados.</p>
        {/if}
      </div>
    </CardContent>
  </Card>

  <!-- Detalles por tipo -->
  {#each artifactTypes as type}
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center justify-between">
          <span>📦 {type}</span>
          <Badge variant="outline">{artifactsByType[type].length} artefactos</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          {#each artifactsByType[type] as artifact, index}
            <div class="border rounded-lg p-4 space-y-3">
              <!-- Información básica del artefacto -->
              <div class="flex items-start justify-between">
                <div class="space-y-1">
                  <h4 class="font-medium text-sm">
                    {artifact.name || 'Sin nombre'}
                  </h4>
                  {#if artifact.version}
                    <p class="text-xs text-muted-foreground">
                      Versión: {artifact.version}
                    </p>
                  {/if}
                  {#if artifact.purl}
                    <p class="text-xs text-muted-foreground font-mono">
                      PURL: {artifact.purl}
                    </p>
                  {/if}
                  {#if artifact.foundBy}
                    <p class="text-xs text-muted-foreground">
                      Detectado por: {artifact.foundBy}
                    </p>
                  {/if}
                </div>
                {#if artifact.language}
                  <Badge variant="secondary" class="text-xs">
                    {artifact.language}
                  </Badge>
                {/if}
              </div>

              <!-- Licencias -->
              {#if artifact.licenses && artifact.licenses.length > 0}
                <div class="space-y-2">
                  <h5 class="text-xs font-medium text-muted-foreground">Licencias:</h5>
                  <div class="flex flex-wrap gap-1">
                    {#each artifact.licenses as license}
                      <Badge variant="outline" class="text-xs">
                        {license}
                      </Badge>
                    {/each}
                  </div>
                </div>
              {/if}

              <!-- Metadatos adicionales -->
              {#if artifact.metadata}
                <div class="space-y-2">
                  {#if artifact.metadata.description}
                    <p class="text-sm text-muted-foreground">
                      {artifact.metadata.description}
                    </p>
                  {/if}
                  {#if artifact.metadata.homepage}
                    <a 
                      href={artifact.metadata.homepage} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="text-xs text-blue-600 hover:underline"
                    >
                      🌐 {artifact.metadata.homepage}
                    </a>
                  {/if}
                </div>
              {/if}

              <!-- CPEs si existen -->
              {#if artifact.cpes && artifact.cpes.length > 0}
                <div class="space-y-2">
                  <h5 class="text-xs font-medium text-muted-foreground">CPEs:</h5>
                  <div class="space-y-1">
                    {#each artifact.cpes as cpe}
                      {#if typeof cpe === 'string'}
                        <div class="space-y-1">
                          <p class="text-xs font-medium">
                            {formatCPE(cpe)}
                          </p>
                          <p class="text-xs font-mono bg-muted p-2 rounded text-muted-foreground">
                            {cpe}
                          </p>
                        </div>
                      {:else if cpe && typeof cpe === 'object' && cpe.cpe}
                        <div class="space-y-1">
                          <div class="flex items-center justify-between">
                            <p class="text-xs font-medium">
                              {formatCPE(cpe.cpe)}
                            </p>
                            {#if cpe.source}
                              <Badge variant="outline" class="text-xs">
                                {cpe.source}
                              </Badge>
                            {/if}
                          </div>
                          <p class="text-xs font-mono bg-muted p-2 rounded text-muted-foreground">
                            {cpe.cpe}
                          </p>
                        </div>
                      {:else}
                        <p class="text-xs font-mono bg-muted p-2 rounded">
                          {JSON.stringify(cpe)}
                        </p>
                      {/if}
                    {/each}
                  </div>
                </div>
              {/if}

              <!-- Ubicaciones si existen -->
              {#if artifact.locations && artifact.locations.length > 0}
                <div class="space-y-2">
                  <h5 class="text-xs font-medium text-muted-foreground">Ubicaciones:</h5>
                  <div class="space-y-1">
                    {#each artifact.locations as location}
                      <p class="text-xs font-mono bg-muted p-2 rounded">
                        {location.path || JSON.stringify(location)}
                      </p>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
            {#if index < artifactsByType[type].length - 1}
              <Separator />
            {/if}
          {/each}
        </div>
      </CardContent>
    </Card>
  {/each}
</div>
