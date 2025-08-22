# Guía de Contribución 🤝

¡Gracias por tu interés en contribuir a OpenReport! Este documento te guiará a través del proceso de contribución.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo Contribuir?](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Flujo de Trabajo](#flujo-de-trabajo)
- [Estándares de Código](#estándares-de-código)
- [Testing](#testing)
- [Documentación](#documentación)
- [Reportar Issues](#reportar-issues)
- [Preguntas Frecuentes](#preguntas-frecuentes)

## 🚀 Código de Conducta

Este proyecto y sus participantes se rigen por el [Código de Conducta de Contribuidores](CODE_OF_CONDUCT.md). Al participar, se espera que respetes este código.

## 🎯 ¿Cómo Contribuir?

### Tipos de Contribuciones

- 🐛 **Reportar bugs** y problemas
- 💡 **Sugerir nuevas funcionalidades**
- 📝 **Mejorar la documentación**
- 🔧 **Arreglar bugs** existentes
- ✨ **Implementar nuevas funcionalidades**
- 🧪 **Agregar o mejorar tests**
- 🌐 **Traducciones** a otros idiomas
- 🎨 **Mejoras de UI/UX**

### Antes de Empezar

1. **Revisa los issues existentes** para evitar duplicados
2. **Únete a las discusiones** en GitHub Discussions
3. **Lee la documentación** del proyecto
4. **Familiarízate** con el código existente

## 🛠️ Configuración del Entorno

### Requisitos

- Node.js 24+
- npm 9+
- Git
- Editor de código (VS Code recomendado)

### Configuración Inicial

```bash
# Fork y clona el repositorio
git clone https://github.com/TU_USUARIO/openreport.git
cd openreport

# Agrega el repositorio original como upstream
git remote add upstream https://github.com/kettu-studio/openreport.git

# Instala dependencias
npm install

# Verifica que todo funcione
npm run check
npm run dev
```

### Extensiones de VS Code Recomendadas

- **Svelte for VS Code** - Soporte para Svelte
- **TypeScript Importer** - Importación automática de tipos
- **Tailwind CSS IntelliSense** - Autocompletado de Tailwind
- **ESLint** - Linting de JavaScript/TypeScript
- **Prettier** - Formateo de código

## 🔄 Flujo de Trabajo

### 1. Crear una Rama

```bash
# Actualiza tu rama principal
git checkout main
git pull upstream main

# Crea una nueva rama para tu feature
git checkout -b feature/nombre-de-la-funcionalidad
```

### 2. Desarrollar

- **Haz commits frecuentes** con mensajes descriptivos
- **Mantén tu rama actualizada** con `main`
- **Sigue los estándares de código** del proyecto
- **Escribe tests** para nuevas funcionalidades

### 3. Commit y Push

```bash
# Agrega tus cambios
git add .

# Haz commit con mensaje descriptivo
git commit -m "feat: agregar nueva funcionalidad de exportación"

# Push a tu fork
git push origin feature/nombre-de-la-funcionalidad
```

### 4. Crear Pull Request

1. Ve a tu fork en GitHub
2. Haz clic en "New Pull Request"
3. Selecciona tu rama de feature
4. Completa la plantilla del PR
5. Espera la revisión

## 📝 Estándares de Código

### Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):



- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Documentación
- `style:` Cambios de formato
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Cambios en build, config, etc.

```bash
# Formato
<tipo>(<alcance>): <descripción>

# Ejemplos
feat: agregar soporte para reportes de OWASP ZAP
fix(ui): corregir alineación de botones en móvil
docs: actualizar guía de instalación
style: aplicar formato consistente en componentes
refactor(api): simplificar lógica de validación
test: agregar tests para función de exportación
chore: actualizar dependencias de desarrollo
```

### Estructura de Archivos

```
src/
├── routes/           # Rutas de la aplicación
├── lib/              # Librerías y utilidades
│   ├── components/   # Componentes reutilizables
│   ├── server/       # Lógica del servidor
│   └── utils/        # Funciones utilitarias
└── app.html          # Template HTML principal
```

### Nomenclatura

- **Archivos**: kebab-case (`user-profile.svelte`)
- **Componentes**: PascalCase (`UserProfile.svelte`)
- **Funciones**: camelCase (`getUserData`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Tipos**: PascalCase (`UserProfile`)

### Estilo de Código

- **Indentación**: 2 espacios
- **Punto y coma**: No usar
- **Comillas**: Dobles para strings
- **Longitud de línea**: Máximo 100 caracteres
- **Imports**: Agrupados y ordenados

## 🧪 Testing

### Escribir Tests

```typescript
// Ejemplo de test para un componente
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import UserProfile from './UserProfile.svelte';

describe('UserProfile', () => {
  it('should display user name', () => {
    const user = { name: 'John Doe', email: 'john@example.com' };
    render(UserProfile, { props: { user } });
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

### Ejecutar Tests

```bash
# Tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Cobertura de tests
npm run test:coverage
```

## 📚 Documentación

### Documentar Código

```typescript
/**
 * Calcula la severidad de una vulnerabilidad basada en su CVSS score
 * @param cvssScore - Puntuación CVSS (0-10)
 * @returns Nivel de severidad como string
 */
export function calculateSeverity(cvssScore: number): string {
  if (cvssScore >= 9.0) return 'CRITICAL';
  if (cvssScore >= 7.0) return 'HIGH';
  if (cvssScore >= 4.0) return 'MEDIUM';
  return 'LOW';
}
```

### Actualizar README

- Mantén la documentación actualizada
- Agrega ejemplos de uso
- Documenta nuevas funcionalidades
- Incluye capturas de pantalla cuando sea relevante

## 🐛 Reportar Issues

### Antes de Reportar

1. **Busca en issues existentes** para evitar duplicados
2. **Verifica que el problema** no esté en tu entorno local
3. **Revisa la documentación** y FAQs

### Plantilla de Issue

```markdown
## Descripción
Descripción clara y concisa del problema.

## Pasos para Reproducir
1. Ve a '...'
2. Haz clic en '...'
3. Desplázate hacia abajo hasta '...'
4. Ve el error

## Comportamiento Esperado
Descripción de lo que debería suceder.

## Comportamiento Actual
Descripción de lo que está sucediendo.

## Capturas de Pantalla
Si es aplicable, agrega capturas de pantalla.

## Entorno
- OS: [ej. macOS 14.0]
- Navegador: [ej. Chrome 120]
- Versión: [ej. 1.2.3]

## Información Adicional
Cualquier otra información relevante.
```

## ❓ Preguntas Frecuentes

### ¿Puedo contribuir si soy principiante?

¡Absolutamente! Las contribuciones de principiantes son muy bienvenidas. Empieza con:
- Documentación
- Tests
- Issues de "good first issue"
- Mejoras menores de UI

### ¿Qué pasa si mi PR es rechazado?

No te desanimes. Los maintainers te darán feedback constructivo:
- Revisa los comentarios cuidadosamente
- Haz los cambios sugeridos
- Pregunta si algo no está claro
- Resubmit cuando esté listo

### ¿Cómo puedo obtener ayuda?

- **GitHub Discussions**: Para preguntas generales
- **GitHub Issues**: Para bugs y problemas
- **Pull Requests**: Para feedback sobre código
- **Discord/Slack**: Si está disponible

### ¿Cuándo se revisan los PRs?

Los maintainers revisan PRs regularmente:
- **Días laborables**: 1-2 días
- **Fines de semana**: 3-5 días
- **Releases**: Puede tomar más tiempo

## 🎉 Reconocimiento

Todas las contribuciones son reconocidas:
- **Contributors**: Lista en GitHub
- **Changelog**: Menciones en releases
- **Documentación**: Créditos en README
- **Comunidad**: Agradecimiento público

---

**¡Gracias por hacer OpenReport mejor para todos! 🚀**

Si tienes preguntas sobre esta guía, no dudes en abrir un issue o unirse a las discusiones.
