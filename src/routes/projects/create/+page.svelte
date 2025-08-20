<script lang="ts">
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { buttonVariants } from "$lib/components/ui/button/button.svelte";
  let project = $state('');
  let message = $state('');

  async function create() {
    message = '';
    const name = project.trim();
    if (!name) {
      message = 'Indica un nombre de proyecto';
      return;
    }
    // Crear proyecto vacío
    const res = await fetch(`/api/projects/${encodeURIComponent(name)}/create`, { method: 'POST' });
    if (!res.ok) {
      message = 'No se pudo crear el proyecto';
      return;
    }
    window.location.href = `/projects/${encodeURIComponent(name)}`;
  }
</script>

<div class="mx-auto max-w-md p-6">
  <Card>
    <CardHeader>
      <CardTitle>Crear proyecto</CardTitle>
      <CardDescription>Define el nombre y crea el proyecto vacío</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="grid gap-2">
        <Label for="project">Nombre del proyecto</Label>
        <Input id="project" bind:value={project} placeholder="mi-proyecto" />
      </div>
      {#if message}
        <p class="text-sm text-muted-foreground">{message}</p>
      {/if}
    </CardContent>
    <CardFooter class="justify-end">
      <button class={buttonVariants({ variant: 'default' })} type="button" onclick={create}>Crear</button>
    </CardFooter>
  </Card>
  <p class="mt-3 text-xs text-muted-foreground">Una vez creado, podrás subir reportes desde la página del proyecto.</p>
</div>


