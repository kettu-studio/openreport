<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import { Separator } from "$lib/components/ui/separator";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
  import { 
    DownloadIcon, 
    TerminalIcon, 
    UploadIcon, 
    SearchIcon, 
    ShieldIcon, 
    AlertTriangleIcon, 
    PackageIcon,
    CodeIcon,
    FileTextIcon,
    GithubIcon
  } from "@lucide/svelte/icons";
</script>

<div class="mx-auto max-w-6xl p-6 space-y-8">
  <!-- Header de la documentación -->
  <div class="text-center space-y-4">
    <h1 class="text-4xl font-bold tracking-tight">📚 Documentación de OpenReport</h1>
    <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
      Guía completa para instalar y usar la CLI de OpenReport para análisis de seguridad y dependencias
    </p>
  </div>

  <!-- Tabs principales -->
  <Tabs value="instalacion" class="w-full">
    <TabsList class="grid w-full grid-cols-4">
      <TabsTrigger value="instalacion">🚀 Instalación</TabsTrigger>
      <TabsTrigger value="comandos">⚡ Comandos</TabsTrigger>
      <TabsTrigger value="ejemplos">💡 Ejemplos</TabsTrigger>
      <TabsTrigger value="formato">📋 Formatos</TabsTrigger>
    </TabsList>

    <!-- Tab de Instalación -->
    <TabsContent value="instalacion" class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <DownloadIcon class="w-5 h-5" />
            Instalación de la CLI
          </CardTitle>
          <CardDescription>
            Instala OpenReport CLI en tu sistema para comenzar a analizar proyectos
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          
          <!-- Instalación automática -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">🔧 Instalación Automática (Recomendada)</h3>
            <div class="bg-muted p-4 rounded-lg">
              <p class="text-sm text-muted-foreground mb-2">Ejecuta este comando en tu terminal:</p>
              <div class="bg-background p-3 rounded font-mono text-sm border">
                curl -L -o openreport https://raw.githubusercontent.com/kettu-studio/openreport/main/cli/openreport && chmod +x openreport && sudo mv openreport /usr/local/bin/
              </div>
            </div>
            <p class="text-sm text-muted-foreground">
              Este comando descarga la CLI, le da permisos de ejecución y la instala en tu PATH del sistema.
            </p>
          </div>

          <Separator />

          <!-- Instalación manual -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">📁 Instalación Manual</h3>
            <div class="space-y-3">
              <div class="bg-muted p-3 rounded">
                <p class="text-sm font-medium mb-1">1. Descargar la CLI:</p>
                <div class="bg-background p-2 rounded font-mono text-xs border">
                  curl -L -o openreport https://raw.githubusercontent.com/kettu-studio/openreport/main/cli/openreport
                </div>
              </div>
              
              <div class="bg-muted p-3 rounded">
                <p class="text-sm font-medium mb-1">2. Dar permisos de ejecución:</p>
                <div class="bg-background p-2 rounded font-mono text-xs border">
                  chmod +x openreport
                </div>
              </div>
              
              <div class="bg-muted p-3 rounded">
                <p class="text-sm font-medium mb-1">3. Mover a PATH del sistema:</p>
                <div class="bg-background p-2 rounded font-mono text-xs border">
                  sudo mv openreport /usr/local/bin/
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <!-- Verificación -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">✅ Verificar Instalación</h3>
            <div class="bg-muted p-3 rounded">
              <p class="text-sm text-muted-foreground mb-2">Verifica que la CLI esté instalada correctamente:</p>
              <div class="bg-background p-2 rounded font-mono text-xs border">
                openreport --help
              </div>
            </div>
            <p class="text-sm text-muted-foreground">
              Deberías ver la ayuda de la CLI con todos los comandos disponibles.
            </p>
          </div>

          <!-- Requisitos del sistema -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">💻 Requisitos del Sistema</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <h4 class="font-medium">Linux</h4>
                <ul class="text-sm text-muted-foreground space-y-1">
                  <li>• curl disponible</li>
                  <li>• Permisos de escritura en /usr/local/bin/</li>
                  <li>• Instalación automática de Trivy, Gitleaks y Syft</li>
                </ul>
              </div>
              <div class="space-y-2">
                <h4 class="font-medium">macOS</h4>
                <ul class="text-sm text-muted-foreground space-y-1">
                  <li>• Homebrew instalado</li>
                  <li>• Permisos de escritura en /usr/local/bin/</li>
                  <li>• Instalación automática de Trivy, Gitleaks y Syft</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <!-- Tab de Comandos -->
    <TabsContent value="comandos" class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <TerminalIcon class="w-5 h-5" />
            Comandos Disponibles
          </CardTitle>
          <CardDescription>
            Todos los comandos y opciones de la CLI de OpenReport
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          
          <!-- Comando scan -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold flex items-center gap-2">
              <SearchIcon class="w-5 h-5" />
              Comando: scan
            </h3>
            <p class="text-sm text-muted-foreground">
              Escanea un directorio completo y ejecuta automáticamente Trivy, Gitleaks y Syft.
            </p>
            
            <div class="bg-muted p-4 rounded-lg">
              <p class="text-sm font-medium mb-2">Sintaxis:</p>
              <div class="bg-background p-3 rounded font-mono text-sm border">
                openreport scan [directorio] -p [proyecto] --api [url]
              </div>
            </div>

            <div class="space-y-3">
              <h4 class="font-medium">Parámetros:</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <Badge variant="outline">[directorio]</Badge>
                    <span class="text-sm">Ruta al directorio a escanear</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Badge variant="outline">-p</Badge>
                    <span class="text-sm">Nombre del proyecto</span>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <Badge variant="outline">--api</Badge>
                    <span class="text-sm">URL de la API de OpenReport</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <h4 class="font-medium">Características:</h4>
              <ul class="text-sm text-muted-foreground space-y-1">
                <li>• Instalación automática de herramientas (Trivy, Gitleaks, Syft)</li>
                <li>• Escaneo completo del directorio especificado</li>
                <li>• Subida automática de reportes al proyecto</li>
                <li>• Limpieza automática de archivos temporales</li>
                <li>• Soporte multiplataforma (Linux, macOS)</li>
              </ul>
            </div>
          </div>

          <Separator />

          <!-- Comando upload -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold flex items-center gap-2">
              <UploadIcon class="w-5 h-5" />
              Comando: upload
            </h3>
            <p class="text-sm text-muted-foreground">
              Sube un reporte existente (Trivy, Gitleaks o Syft) a un proyecto específico.
            </p>
            
            <div class="bg-muted p-4 rounded-lg">
              <p class="text-sm font-medium mb-2">Sintaxis:</p>
              <div class="bg-background p-3 rounded font-mono text-sm border">
                openreport upload [archivo] -p [proyecto] --api [url]
              </div>
            </div>

            <div class="space-y-3">
              <h4 class="font-medium">Parámetros:</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <Badge variant="outline">[archivo]</Badge>
                    <span class="text-sm">Ruta al archivo de reporte</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Badge variant="outline">-p</Badge>
                    <span class="text-sm">Nombre del proyecto</span>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <Badge variant="outline">--api</Badge>
                    <span class="text-sm">URL de la API de OpenReport</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <h4 class="font-medium">Formatos Soportados:</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="text-center p-3 bg-muted rounded">
                  <ShieldIcon class="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p class="font-medium">Trivy</p>
                  <p class="text-xs text-muted-foreground">Vulnerabilidades</p>
                </div>
                <div class="text-center p-3 bg-muted rounded">
                  <AlertTriangleIcon class="w-8 h-8 mx-auto mb-2 text-red-600" />
                  <p class="font-medium">Gitleaks</p>
                  <p class="text-xs text-muted-foreground">Secretos</p>
                </div>
                <div class="text-center p-3 bg-muted rounded">
                  <PackageIcon class="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <p class="font-medium">Syft</p>
                  <p class="text-xs text-muted-foreground">Dependencias</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <!-- Comando help -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold flex items-center gap-2">
              <CodeIcon class="w-5 h-5" />
              Comando: help
            </h3>
            <p class="text-sm text-muted-foreground">
              Muestra la ayuda completa de la CLI con todos los comandos disponibles.
            </p>
            
            <div class="bg-muted p-4 rounded-lg">
              <p class="text-sm font-medium mb-2">Sintaxis:</p>
              <div class="bg-background p-3 rounded font-mono text-sm border">
                openreport --help
              </div>
            </div>

            <p class="text-sm text-muted-foreground">
              Este comando muestra información detallada sobre todos los comandos, parámetros y ejemplos de uso.
            </p>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <!-- Tab de Ejemplos -->
    <TabsContent value="ejemplos" class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <FileTextIcon class="w-5 h-5" />
            Ejemplos de Uso
          </CardTitle>
          <CardDescription>
            Casos de uso prácticos y ejemplos reales de la CLI
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          
          <!-- Escaneo de proyecto actual -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">📁 Escanear Proyecto Actual</h3>
            <p class="text-sm text-muted-foreground">
              Escanea el directorio actual y sube los reportes al proyecto "mi-app":
            </p>
            <div class="bg-muted p-3 rounded font-mono text-sm border">
              openreport scan ./ -p mi-app --api https://openreport.kettu.tech
            </div>
            <p class="text-sm text-muted-foreground">
              Este comando instalará automáticamente las herramientas necesarias, escaneará el directorio actual 
              y subirá los reportes de Trivy, Gitleaks y Syft al proyecto "mi-app".
            </p>
          </div>

          <Separator />

          <!-- Escaneo de directorio específico -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">🔍 Escanear Directorio Específico</h3>
            <p class="text-sm text-muted-foreground">
              Escanea un directorio específico y sube los reportes al proyecto "backend-api":
            </p>
            <div class="bg-muted p-3 rounded font-mono text-sm border">
              openreport scan /home/user/projects/backend-api -p backend-api --api https://openreport.kettu.tech
            </div>
            <p class="text-sm text-muted-foreground">
              Útil cuando quieres escanear un proyecto que no está en el directorio actual.
            </p>
          </div>

          <Separator />

          <!-- Subir reporte existente -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">📤 Subir Reporte Existente</h3>
            <p class="text-sm text-muted-foreground">
              Sube un reporte de Trivy existente al proyecto "frontend-app":
            </p>
            <div class="bg-muted p-3 rounded font-mono text-sm border">
              openreport upload trivy-results.json -p frontend-app --api https://openreport.kettu.tech
            </div>
            <p class="text-sm text-muted-foreground">
              Perfecto cuando ya tienes reportes generados y solo quieres subirlos a OpenReport.
            </p>
          </div>

          <Separator />

          <!-- Uso en CI/CD -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">🔄 Uso en CI/CD (GitHub Actions)</h3>
            <p class="text-sm text-muted-foreground">
              Integra OpenReport en tu pipeline de CI/CD:
            </p>
                         <div class="bg-muted p-3 rounded font-mono text-sm border">
               <pre>- name: Security Scan
  run: |
    curl -L -o openreport https://raw.githubusercontent.com/kettu-studio/openreport/main/cli/openreport
    chmod +x openreport
    ./openreport scan ./ -p $CI_PROJECT_NAME --api $OPENREPORT_API</pre>
             </div>
            <p class="text-sm text-muted-foreground">
              Escanea automáticamente tu código en cada push o pull request.
            </p>
          </div>

          <Separator />

          <!-- Uso en GitLab CI -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">🔄 Uso en GitLab CI</h3>
            <p class="text-sm text-muted-foreground">
              Integra OpenReport en tu pipeline de GitLab CI:
            </p>
                         <div class="bg-muted p-3 rounded font-mono text-sm border">
               <pre>security_scan:
  stage: test
  script:
    - curl -L -o openreport https://raw.githubusercontent.com/kettu-studio/openreport/main/cli/openreport
    - chmod +x openreport
    - ./openreport scan ./ -p $CI_PROJECT_NAME --api $OPENREPORT_API</pre>
             </div>
            <p class="text-sm text-muted-foreground">
              Escanea tu código en cada pipeline de GitLab CI.
            </p>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <!-- Tab de Formatos -->
    <TabsContent value="formato" class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <CodeIcon class="w-5 h-5" />
            Formatos de Reporte Soportados
          </CardTitle>
          <CardDescription>
            Estructura y ejemplos de los formatos de reporte que acepta OpenReport
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          
          <!-- Formato Trivy -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold flex items-center gap-2">
              <ShieldIcon class="w-5 h-5 text-blue-600" />
              Formato Trivy (Vulnerabilidades)
            </h3>
            <p class="text-sm text-muted-foreground">
              Reporte de vulnerabilidades generado por Trivy:
            </p>
            <div class="bg-muted p-4 rounded-lg">
              <p class="text-sm font-medium mb-2">Estructura básica:</p>
                             <div class="bg-background p-3 rounded font-mono text-xs border overflow-x-auto">
                 <pre>{`{
  "CreatedAt": "2024-01-15T10:30:45.123Z",
  "Results": [
    {
      "Target": "package-lock.json",
      "Vulnerabilities": [
        {
          "VulnerabilityID": "CVE-2024-1234",
          "Severity": "HIGH",
          "Title": "Vulnerabilidad de seguridad crítica",
          "Description": "Descripción de la vulnerabilidad...",
          "FixedVersion": "2.1.0"
        }
      ]
    }
  ]
}`}</pre>
               </div>
            </div>
            <p class="text-sm text-muted-foreground">
              OpenReport detecta automáticamente este formato y lo procesa como un reporte de vulnerabilidades.
            </p>
          </div>

          <Separator />

          <!-- Formato Gitleaks -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold flex items-center gap-2">
              <AlertTriangleIcon class="w-5 h-5 text-red-600" />
              Formato Gitleaks (Secretos)
            </h3>
            <p class="text-sm text-muted-foreground">
              Reporte de secretos detectados por Gitleaks:
            </p>
            <div class="bg-muted p-4 rounded-lg">
              <p class="text-sm font-medium mb-2">Estructura básica:</p>
              <div class="bg-background p-3 rounded font-mono text-xs border overflow-x-auto">
{`[
  {
    "RuleID": "github-pat",
    "File": "config.json",
    "Commit": "abc123def456",
    "Author": "developer@example.com",
    "Date": "2024-01-15T10:30:45.123Z",
    "Secret": "ghp_xxxxxxxxxxxxxxxxxxxx",
    "Line": 42
  }
]`}
              </div>
            </div>
            <p class="text-sm text-muted-foreground">
              OpenReport detecta automáticamente este formato y lo procesa como un reporte de secretos.
            </p>
          </div>

          <Separator />

          <!-- Formato Syft -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold flex items-center gap-2">
              <PackageIcon class="w-5 h-5 text-green-600" />
              Formato Syft (Dependencias)
            </h3>
            <p class="text-sm text-muted-foreground">
              Reporte de dependencias generado por Syft:
            </p>
            <div class="bg-muted p-4 rounded-lg">
              <p class="text-sm font-medium mb-2">Estructura básica:</p>
              <div class="bg-background p-3 rounded font-mono text-xs border overflow-x-auto">
                <pre>{`{
  "artifacts": [
    {
      "id": "abc123",
      "name": "react",
      "version": "18.2.0",
      "type": "npm",
      "language": "javascript",
      "purl": "pkg:npm/react@18.2.0",
      "cpes": ["cpe:2.3:a:facebook:react:18.2.0:*:*:*:*:*:*:*"],
      "licenses": ["MIT"]
    }
  ],
  "metadata": {
    "createdAt": "2024-01-15T10:30:45.123Z"
  }
}`}</pre>
              </div>
            </div>
            <p class="text-sm text-muted-foreground">
              OpenReport detecta automáticamente este formato y lo procesa como un reporte de dependencias.
            </p>
          </div>

          <Separator />

          <!-- Detección automática -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">🤖 Detección Automática de Formatos</h3>
            <p class="text-sm text-muted-foreground">
              OpenReport detecta automáticamente el tipo de reporte basándose en su estructura:
            </p>
            <ul class="text-sm text-muted-foreground space-y-2">
              <li>• <strong>Trivy</strong>: Si contiene <code>"Results"</code> y <code>"Vulnerabilities"</code></li>
              <li>• <strong>Gitleaks</strong>: Si es un array de objetos con <code>"RuleID"</code></li>
              <li>• <strong>Syft</strong>: Si contiene <code>"artifacts"</code> y <code>"metadata"</code></li>
            </ul>
            <p class="text-sm text-muted-foreground">
              No necesitas especificar el tipo de reporte manualmente, la CLI lo detecta automáticamente.
            </p>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>

  <!-- Sección de ayuda adicional -->
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <GithubIcon class="w-5 h-5" />
        ¿Necesitas Ayuda?
      </CardTitle>
      <CardDescription>
        Recursos adicionales y soporte para la CLI de OpenReport
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-3">
          <h4 class="font-medium">📖 Recursos</h4>
          <ul class="text-sm text-muted-foreground space-y-2">
            <li>• <a href="https://github.com/kettu-studio/openreport" target="_blank" class="text-blue-600 hover:underline">Repositorio en GitHub</a></li>
            <li>• <a href="https://github.com/kettu-studio/openreport/issues" target="_blank" class="text-blue-600 hover:underline">Reportar problemas</a></li>
            <li>• <a href="https://github.com/kettu-studio/openreport/discussions" target="_blank" class="text-blue-600 hover:underline">Discusiones</a></li>
          </ul>
        </div>
        <div class="space-y-3">
          <h4 class="font-medium">🛠️ Herramientas</h4>
          <ul class="text-sm text-muted-foreground space-y-2">
            <li>• <a href="https://trivy.dev/" target="_blank" class="text-blue-600 hover:underline">Trivy - Scanner de vulnerabilidades</a></li>
            <li>• <a href="https://gitleaks.io/" target="_blank" class="text-blue-600 hover:underline">Gitleaks - Detector de secretos</a></li>
            <li>• <a href="https://github.com/anchore/syft" target="_blank" class="text-blue-600 hover:underline">Syft - Análisis de dependencias</a></li>
          </ul>
        </div>
      </div>
      
      <Separator />
      
      <div class="text-center">
        <p class="text-sm text-muted-foreground">
          ¿Tienes alguna pregunta o sugerencia? ¡Contribuye al proyecto en GitHub!
        </p>
        <a 
          href="https://github.com/kettu-studio/openreport" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 mt-2 text-blue-600 hover:underline font-medium"
        >
          <GithubIcon class="w-4 h-4" />
          Ver en GitHub
        </a>
      </div>
    </CardContent>
  </Card>
</div>
