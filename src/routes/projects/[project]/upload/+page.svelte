<script lang="ts">
  let { params } = $props<any>();
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import { buttonVariants } from "$lib/components/ui/button/button.svelte";

  let jsonText = $state('');
  let message = $state('');

  async function submit() {
    message = '';
    let data: any;
    try {
      data = JSON.parse(jsonText);
    } catch (e) {
      message = 'JSON inválido';
      return;
    }
    const res = await fetch(`/api/projects/${encodeURIComponent(params.project)}/upload`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    });
    const out = await res.json();
    if (!res.ok) {
      message = out?.error || 'Error subiendo el reporte';
      return;
    }
    message = 'Reporte subido';
    window.location.href = `/projects/${encodeURIComponent(params.project)}`;
  }

  function onFile(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      jsonText = String(reader.result || '');
    };
    reader.readAsText(file);
  }
</script>

<div class="mx-auto max-w-3xl p-6">
  <Card>
    <CardHeader>
      <CardTitle>Subir reporte a {params.project}</CardTitle>
      <CardDescription>Pega o sube el JSON de Trivy</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="grid gap-2">
        <Label for="file">Archivo .json</Label>
        <Input id="file" type="file" accept="application/json" onchange={onFile} />
      </div>
      <div class="grid gap-2">
        <Label for="json">JSON</Label>
        <Textarea id="json" bind:value={jsonText} rows={14} placeholder="Pegue aquí el JSON de Trivy" />
      </div>
      {#if message}
        <p class="text-sm text-muted-foreground">{message}</p>
      {/if}
    </CardContent>
    <CardFooter class="justify-end">
      <button class={buttonVariants({ variant: 'default' })} onclick={submit} type="button">Publicar</button>
    </CardFooter>
  </Card>
</div>


