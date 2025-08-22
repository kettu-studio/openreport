# OpenReport 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://hub.docker.com/r/kettustudio/openreport)
[![Svelte](https://img.shields.io/badge/Svelte-5.0-ff3e00.svg)](https://svelte.dev/)

**OpenReport** es una plataforma web moderna y de código abierto para visualizar, gestionar y analizar reportes de seguridad generados por herramientas como Trivy y Gitleaks. Proporciona una interfaz intuitiva para revisar vulnerabilidades, secretos expuestos y configuraciones incorrectas en tus proyectos.

## ✨ Características

- 🔍 **Visualización Avanzada**: Interfaz moderna y responsive para analizar reportes de seguridad
- 📊 **Múltiples Formatos**: Soporte nativo para reportes de Trivy y Gitleaks
- 🗂️ **Gestión de Proyectos**: Organiza y categoriza reportes por proyecto
- 📈 **Historial y Comparación**: Mantén un historial completo de análisis de seguridad
- 🚀 **CLI Integrada**: Herramienta de línea de comandos para automatizar la subida de reportes
- 🐳 **Docker Ready**: Despliegue simplificado con contenedores Docker
- ☁️ **Kubernetes**: Configuración completa para despliegue en GKE/GCP
- 🔒 **Almacenamiento Seguro**: Persistencia de datos con volúmenes seguros

## 🏗️ Arquitectura

- **Frontend**: SvelteKit 5 + TypeScript + Tailwind CSS
- **Backend**: API REST con SvelteKit
- **Almacenamiento**: Sistema de archivos JSON con metadatos estructurados
- **CLI**: Script Bash para automatización
- **Contenedores**: Docker multi-stage para optimización
- **Orquestación**: Kubernetes con GKE

## 🚀 Instalación Rápida

### Opción 1: Docker (Recomendado)

```bash
# Descargar la imagen
docker pull kettustudio/openreport:latest

# Ejecutar el contenedor
docker run -d \
  --name openreport \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  kettustudio/openreport:latest

# Acceder a la aplicación
open http://localhost:3000
```

### Opción 2: Desarrollo Local

```bash
# Clonar el repositorio
git clone https://github.com/kettu-studio/openreport.git
cd openreport

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📖 Uso

### Interfaz Web

1. **Crear un Proyecto**: Define un nuevo proyecto para organizar tus reportes
2. **Subir Reportes**: Usa la interfaz web o la CLI para subir archivos JSON
3. **Analizar Resultados**: Visualiza vulnerabilidades, secretos y configuraciones incorrectas
4. **Gestionar Historial**: Revisa análisis anteriores y compara resultados


### Instalacion CLI

```bash
# Descargar, hacer ejecutable y mover a PATH en una sola línea
curl -L -o openreport https://raw.githubusercontent.com/kettu-studio/openreport/main/cli/openreport && chmod +x openreport && sudo mv openreport /usr/local/bin/

# Verificar la instalación
openreport --help
```

### CLI

```bash
# Subir un reporte de Trivy
openreport upload trivy-results.json -p mi-proyecto --api https://openreport.kettu.tech

# Subir un reporte de Gitleaks
openreport upload gitleaks-results.json -p mi-proyecto --api https://openreport.kettu.tech

# Escanear un directorio completo (Trivy + Gitleaks)
openreport scan ./ -p mi-proyecto --api https://openreport.kettu.tech

# Escanear un directorio específico
openreport scan /path/to/project -p proyecto-prod --api https://openreport.kettu.tech

# Ver ayuda
openreport --help
```

#### Comando `scan`

El comando `scan` es la funcionalidad más potente de la CLI:

- **Instalación automática**: Instala Trivy y Gitleaks si no están disponibles
- **Escaneo dual**: Ejecuta tanto Trivy (vulnerabilidades) como Gitleaks (secretos)
- **Subida automática**: Sube ambos reportes al proyecto especificado
- **Soporte multiplataforma**: Funciona en Linux y macOS
- **Limpieza automática**: Elimina archivos temporales después del proceso

**Requisitos del sistema:**
- **Linux**: curl disponible (instalación automática)
- **macOS**: Homebrew instalado (instalación automática)
- **Ambos**: Permisos de escritura en `/usr/local/bin/`

### Formatos Soportados

#### Trivy
```json
{
  "CreatedAt": "2024-01-15T10:30:45.123Z",
  "Results": [
    {
      "Target": "package-lock.json",
      "Vulnerabilities": [
        {
          "VulnerabilityID": "CVE-2024-1234",
          "Severity": "HIGH",
          "Title": "Vulnerabilidad de seguridad crítica"
        }
      ]
    }
  ]
}
```

#### Gitleaks
```json
[
  {
    "RuleID": "github-pat",
    "File": "config.json",
    "Commit": "abc123",
    "Author": "developer@example.com",
    "Date": "2024-01-15T10:30:45.123Z"
  }
]
```

## 🐳 Despliegue

### Docker Compose

```yaml
version: '3.8'
services:
  openreport:
    image: kettustudio/openreport:latest
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### Kubernetes (GKE)

```bash
# Aplicar la configuración completa
kubectl apply -k deploy/gke/

# Verificar el estado
kubectl get all -n openreport
kubectl get pvc -n openreport
```

### Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `NODE_ENV` | Entorno de ejecución | `production` |
| `PORT` | Puerto de la aplicación | `3000` |
| `DATA_ROOT` | Directorio de datos | `/app/data` |

## 🛠️ Desarrollo

### Requisitos

- Node.js 24+
- npm 9+
- Git

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Vista previa de producción

# Calidad de código
npm run check        # Verificación de tipos
npm run check:watch  # Verificación en modo watch
```

### Estructura del Proyecto

```
openreport/
├── src/                    # Código fuente
│   ├── routes/            # Rutas de la aplicación
│   ├── lib/               # Librerías y utilidades
│   └── app.html           # Template HTML principal
├── cli/                   # Herramienta de línea de comandos
├── deploy/                # Configuraciones de despliegue
│   └── gke/              # Kubernetes para GKE
├── static/                # Archivos estáticos
├── Dockerfile             # Configuración de Docker
└── package.json           # Dependencias y scripts
```

### Tecnologías Utilizadas

- **Frontend**: SvelteKit 5, TypeScript, Tailwind CSS
- **UI Components**: shadcn-svelte, bits-ui
- **Build Tool**: Vite
- **Package Manager**: npm
- **Container**: Docker
- **Orchestration**: Kubernetes

## 🤝 Contribución

¡Las contribuciones son bienvenidas! OpenReport es un proyecto de código abierto y apreciamos cualquier ayuda para mejorarlo.

### Política de Pull Requests

1. **Fork del repositorio** y clona tu fork localmente
2. **Crea una rama** para tu feature/fix: `git checkout -b feature/nueva-funcionalidad`
3. **Haz commits** con mensajes descriptivos: `git commit -m "feat: agregar nueva funcionalidad"`
4. **Push a tu fork** y crea un Pull Request
5. **Espera la revisión** y responde a los comentarios si es necesario

### Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Documentación
- `style:` Cambios de formato
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Cambios en build, config, etc.

### Estándares de Código

- **TypeScript**: Uso estricto de tipos
- **Svelte**: Sigue las mejores prácticas de SvelteKit
- **CSS**: Utiliza Tailwind CSS y componentes de shadcn-svelte
- **Testing**: Agrega tests para nuevas funcionalidades
- **Documentación**: Actualiza la documentación según sea necesario

### Reportar Issues

Antes de reportar un issue:

1. **Verifica** que no haya sido reportado anteriormente
2. **Usa la plantilla** de issue apropiada
3. **Incluye** pasos para reproducir el problema
4. **Adjunta** logs y capturas de pantalla si es relevante

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT** - ver el archivo [LICENSE](LICENSE) para más detalles.


## 🙏 Agradecimientos

- **Svelte Team** por el increíble framework
- **Tailwind CSS** por el sistema de diseño
- **shadcn/ui** por los componentes de UI
- **Trivy** y **Gitleaks** por las herramientas de seguridad
- **Comunidad open source** por la inspiración y contribuciones

## 📞 Contacto

- **GitHub**: [kettu-studio/openreport](https://github.com/kettu-studio/openreport)
- **Issues**: [GitHub Issues](https://github.com/kettu-studio/openreport/issues)
- **Discussions**: [GitHub Discussions](https://github.com/kettu-studio/openreport/discussions)

---

**OpenReport** - Haciendo la seguridad más accesible y visual 🛡️✨
