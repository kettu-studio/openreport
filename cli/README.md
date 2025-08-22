# OpenReport CLI 🚀

Herramienta de línea de comandos para OpenReport que permite subir reportes de seguridad y escanear proyectos automáticamente.

## 📦 Instalación

### Descarga Directa

```bash
# Descargar, hacer ejecutable y mover a PATH en una sola línea
curl -L -o openreport https://raw.githubusercontent.com/kettu-studio/openreport/main/cli/openreport && chmod +x openreport && sudo mv openreport /usr/local/bin/

# Verificar instalación
openreport --help
```

### Verificación

```bash
# Verificar que está en el PATH
which openreport

# Verificar versión
openreport --help
```

## 🎯 Comandos Disponibles

### 1. `upload` - Subir Reporte Existente

Sube un archivo JSON de reporte ya generado.

```bash
# Sintaxis
openreport upload <archivo> -p <proyecto> --api <url>

# Ejemplos
openreport upload trivy-results.json -p mi-proyecto --api https://openreport.kettu.tech
openreport upload gitleaks-scan.json -p proyecto-prod --api https://openreport.kettu.tech
```

**Parámetros:**
- `<archivo>`: Ruta al archivo JSON del reporte
- `-p, --project`: Nombre del proyecto de destino
- `--api`: URL base de la API de OpenReport

### 2. `scan` - Escaneo Automático ⭐

**NUEVO**: Escanea un directorio completo con Trivy y Gitleaks, y sube los reportes automáticamente.

```bash
# Sintaxis
openreport scan [directorio] -p <proyecto> --api <url>

# Ejemplos
# Escanear directorio actual
openreport scan ./ -p mi-proyecto --api https://openreport.kettu.tech

# Escanear directorio específico
openreport scan /path/to/project -p proyecto-prod --api https://openreport.kettu.tech

# Escanear directorio padre
openreport scan ../ -p proyecto-padre --api https://openreport.kettu.tech
```

**Parámetros:**
- `[directorio]`: Ruta al directorio a escanear (opcional, por defecto: `./`)
- `-p, --project`: Nombre del proyecto de destino
- `--api`: URL base de la API de OpenReport

## 🔧 Funcionalidades del Comando `scan`

### Instalación Automática

La CLI detecta automáticamente si Trivy y Gitleaks están instalados:

- **Si no están instalados**: Los instala automáticamente
- **Si ya están instalados**: Los usa directamente
- **Soporte multiplataforma**: Linux y macOS

### Escaneo Dual

Ejecuta ambos escáneres de seguridad:

1. **Trivy**: Análisis de vulnerabilidades en dependencias y archivos
2. **Gitleaks**: Detección de secretos y credenciales expuestas

### Proceso Automatizado

```bash
openreport scan ./ -p mi-proyecto --api https://openreport.kettu.tech
```

**Lo que sucede:**

1. ✅ **Verificación**: Comprueba que el directorio existe
2. 🔧 **Instalación**: Instala Trivy y Gitleaks si es necesario
3. 🔍 **Escaneo Trivy**: Analiza vulnerabilidades
4. 🔍 **Escaneo Gitleaks**: Detecta secretos
5. 📤 **Subida**: Sube ambos reportes al proyecto
6. 🧹 **Limpieza**: Elimina archivos temporales
7. 🎉 **Confirmación**: Muestra enlaces a los reportes

## 🖥️ Soporte de Sistemas Operativos

### Linux

- **Instalación**: Script de instalación automático
- **Requisitos**: `curl` disponible
- **Ubicación**: `/usr/local/bin/`

### macOS

- **Instalación**: Homebrew automático
- **Requisitos**: Homebrew instalado
- **Ubicación**: `/usr/local/bin/`

### Windows

- **Estado**: No soportado actualmente
- **Alternativa**: Usar WSL2 con Linux

## 📊 Ejemplos de Uso

### Escaneo de Proyecto Node.js

```bash
# Navegar al proyecto
cd /path/to/nodejs-project

# Escanear y subir reportes
openreport scan ./ -p nodejs-app --api https://openreport.kettu.tech
```

### Escaneo de Proyecto Python

```bash
# Escanear proyecto Python
openreport scan /home/user/python-project -p python-app --api https://openreport.kettu.tech
```

### Escaneo de Múltiples Proyectos

```bash
# Escanear varios proyectos
for project in project1 project2 project3; do
  openreport scan "./$project" -p "$project" --api https://openreport.kettu.tech
done
```

## 🚨 Troubleshooting

### Error: "No se pudo instalar Trivy"

**Solución:**
```bash
# En Linux, verificar permisos
sudo chmod +x /usr/local/bin

# En macOS, verificar Homebrew
brew --version
```

### Error: "No se pudo instalar Gitleaks"

**Solución:**
```bash
# En Linux, verificar curl
curl --version

# En macOS, reinstalar Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Error: "El directorio no existe"

**Solución:**
```bash
# Verificar la ruta
ls -la /path/to/directory

# Usar ruta absoluta
openreport scan /absolute/path/to/directory -p proyecto --api https://openreport.kettu.tech
```

### Error: "No se pudo subir el reporte"

**Solución:**
```bash
# Verificar conectividad a la API
curl -I https://openreport.kettu.tech

# Verificar credenciales del proyecto
# El proyecto debe existir en OpenReport
```

### Códigos de Salida de los Escáneres

**Trivy:**
- **0**: Sin vulnerabilidades encontradas
- **1**: Vulnerabilidades encontradas (esto es normal)

**Gitleaks:**
- **0**: Sin secretos encontrados
- **1**: Secretos encontrados (esto es normal)

**Nota**: La CLI considera exitoso el escaneo si se crea el archivo de salida, independientemente del código de salida. Esto es porque encontrar vulnerabilidades o secretos es el objetivo del escaneo.

## 🔒 Seguridad

### Archivos Temporales

La CLI crea una carpeta `.openreport` en el directorio actual para almacenar temporalmente los reportes:

```
.openreport/
├── trivy-scan_20241215_143022.json    # Reporte de Trivy con timestamp
└── gitleaks-scan_20241215_143022.json  # Reporte de Gitleaks con timestamp
```

**Características:**
- **Ubicación**: Carpeta `.openreport` en el directorio de trabajo
- **Nomenclatura**: Archivos con timestamp para evitar conflictos
- **Limpieza**: Se eliminan automáticamente después de la subida
- **Debugging**: Útil para revisar reportes antes de la subida
- **Persistencia**: La carpeta se mantiene si hay errores para debugging

**Nota**: Los archivos se eliminan automáticamente después de subir exitosamente. Si hay errores, los archivos permanecen para revisión.

### Permisos

- La CLI requiere permisos de escritura en `/usr/local/bin/`
- Los escaneos se ejecutan con los permisos del usuario actual
- No se requieren permisos de administrador para los escaneos

### Red

- Las comunicaciones con la API usan HTTPS
- No se envían datos sensibles del código fuente
- Solo se suben los reportes de seguridad generados

## 📝 Logs y Debugging

### Verbose Mode

Para obtener más información durante la ejecución:

```bash
# Ver todos los pasos del proceso
bash -x openreport scan ./ -p proyecto --api https://openreport.kettu.tech
```

### Archivos de Log

La CLI muestra información detallada en tiempo real:
- Estado de instalación de herramientas
- Progreso de los escaneos
- URLs de los reportes subidos
- Errores y advertencias

## 🚀 Integración con CI/CD

### GitHub Actions

```yaml
name: Security Scan
on: [push, pull_request]
jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run OpenReport Scan
        run: |
          curl -L -o openreport https://raw.githubusercontent.com/kettu-studio/openreport/main/cli/openreport
          chmod +x openreport
          ./openreport scan ./ -p ${{ github.repository }} --api ${{ secrets.OPENREPORT_API }}
```

### GitLab CI

```yaml
security-scan:
  stage: test
  script:
    - curl -L -o openreport https://raw.githubusercontent.com/kettu-studio/openreport/main/cli/openreport
    - chmod +x openreport
    - ./openreport scan ./ -p $CI_PROJECT_NAME --api $OPENREPORT_API
```

## 📞 Soporte

- **Issues**: [GitHub Issues](https://github.com/kettu-studio/openreport/issues)
- **Discussions**: [GitHub Discussions](https://github.com/kettu-studio/openreport/discussions)
- **Documentación**: [README Principal](../README.md)

---

**OpenReport CLI** - Haciendo la seguridad más accesible desde la línea de comandos 🛡️⚡
