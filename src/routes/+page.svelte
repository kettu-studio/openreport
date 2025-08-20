<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Avatar, AvatarFallback } from "$lib/components/ui/avatar";
	import { Badge } from "$lib/components/ui/badge";
	import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
	import { Separator } from "$lib/components/ui/separator";
	import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "$lib/components/ui/dropdown-menu";
	import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "$lib/components/ui/tooltip";

	let name = "Svelte";
	const submit = () => alert(`Hola ${name}!`);
</script>

<div class="mx-auto max-w-4xl p-6 space-y-8">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<Avatar class="h-10 w-10">
				<AvatarFallback>SV</AvatarFallback>
			</Avatar>
			<div>
				<h1 class="text-2xl font-bold tracking-tight">Demo UI con shadcn-svelte</h1>
				<p class="text-sm text-muted-foreground">SvelteKit + Tailwind + shadcn-svelte</p>
			</div>
		</div>
		<div class="flex items-center gap-2">
			<Badge>v1</Badge>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="secondary">Ayuda</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Ejemplo de Tooltip</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	</div>

	<Tabs value="perfil" class="w-full">
		<TabsList>
			<TabsTrigger value="perfil">Perfil</TabsTrigger>
			<TabsTrigger value="form">Formulario</TabsTrigger>
			<TabsTrigger value="menu">Menú</TabsTrigger>
		</TabsList>

		<TabsContent value="perfil">
			<Card>
				<CardHeader>
					<CardTitle>Perfil</CardTitle>
					<CardDescription>Información básica</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="flex items-center gap-4">
						<Avatar class="h-12 w-12">
							<AvatarFallback>SV</AvatarFallback>
						</Avatar>
						<div>
							<p class="font-medium">Usuario de ejemplo</p>
							<p class="text-sm text-muted-foreground">user@example.com</p>
						</div>
					</div>
					<Separator />
					<p class="text-sm text-muted-foreground">Este es un ejemplo de Card con contenido y separadores.</p>
				</CardContent>
				<CardFooter class="justify-end">
					<Button>Editar</Button>
				</CardFooter>
			</Card>
		</TabsContent>

		<TabsContent value="form">
			<Card>
				<CardHeader>
					<CardTitle>Formulario</CardTitle>
					<CardDescription>Introduce tu nombre y envía</CardDescription>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="grid gap-2">
						<Label for="name">Nombre</Label>
						<Input id="name" placeholder="Tu nombre" bind:value={name} />
					</div>
					<div class="grid gap-2">
						<Label htmlFor="about">Acerca de ti</Label>
						<Textarea id="about" placeholder="Escribe algo..." rows={4} />
					</div>
				</CardContent>
				<CardFooter class="justify-end">
					<Button on:click={submit}>Enviar</Button>
				</CardFooter>
			</Card>
		</TabsContent>

		<TabsContent value="menu">
			<Card>
				<CardHeader>
					<CardTitle>Menú desplegable</CardTitle>
					<CardDescription>Ejemplo con DropdownMenu</CardDescription>
				</CardHeader>
				<CardContent>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button>Acciones</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Opciones</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Perfil</DropdownMenuItem>
							<DropdownMenuItem>Configuración</DropdownMenuItem>
							<DropdownMenuItem>Salir</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</CardContent>
			</Card>
		</TabsContent>
	</Tabs>
</div>
