# OpenReport Kubernetes Deployment

Este directorio contiene todos los archivos necesarios para desplegar OpenReport en Kubernetes.

## Archivos Incluidos

- **`namespace.yaml`** - Define el namespace `openreport`
- **`persistent-volume.yaml`** - PersistentVolumeClaim para el directorio `/data` usando GCP standard-rwo
- **`deployment.yaml`** - Deployment, Service e Ingress
- **`kustomization.yaml`** - Archivo de Kustomize para el despliegue

## Requisitos Previos

1. **Cluster de Kubernetes en GCP** funcionando
2. **kubectl** configurado y conectado al cluster
3. **kustomize** instalado (opcional, para usar kustomization.yaml)
4. **Ingress Controller** (nginx-ingress) instalado en el cluster
5. **Storage Class `standard-rwo`** disponible (incluido por defecto en GKE)

## Despliegue

### Opción 1: Usando Kustomize (Recomendado)

```bash
# Aplicar todos los recursos
kubectl apply -k .

# Verificar el estado
kubectl get all -n openreport
kubectl get pvc -n openreport
```

### Opción 2: Aplicar archivos individualmente

```bash
# Crear el namespace
kubectl apply -f namespace.yaml

# Crear el almacenamiento persistente
kubectl apply -f persistent-volume.yaml

# Desplegar la aplicación
kubectl apply -f deployment.yaml
```

## Verificación

```bash
# Verificar el estado del deployment
kubectl get deployment -n openreport

# Verificar los pods
kubectl get pods -n openreport

# Verificar los servicios
kubectl get svc -n openreport

# Verificar el ingress
kubectl get ingress -n openreport

# Verificar el almacenamiento
kubectl get pvc -n openreport
```

## Configuración

### Cambiar el dominio del Ingress

Edita `deployment.yaml` y cambia `openreport.local` por tu dominio real:

```yaml
spec:
  rules:
  - host: tu-dominio.com  # Cambiar aquí
```

### Cambiar el tamaño del almacenamiento

Edita `persistent-volume.yaml` y modifica la capacidad:

```yaml
spec:
  resources:
    requests:
      storage: 5Gi  # Cambiar según necesidades
```

### Cambiar la imagen de Docker

Edita `deployment.yaml` o `kustomization.yaml`:

```yaml
# En deployment.yaml
image: kettustudio/openreport:v1.2.3

# O en kustomization.yaml
images:
  - name: kettustudio/openreport
    newTag: v1.2.3
```

## Almacenamiento

Este deployment utiliza el **Storage Class `standard-rwo` de GCP**, que:

- Proporciona almacenamiento SSD regional
- Soporta múltiples zonas para alta disponibilidad
- Se aprovisiona automáticamente cuando se crea el PVC
- Es el storage class estándar recomendado para GKE

## Acceso a la Aplicación

Una vez desplegado, la aplicación estará disponible en:

- **Interno**: `http://openreport-service.openreport.svc.cluster.local`
- **Externo**: Según la configuración del Ingress (ej: `http://openreport.local`)

## Troubleshooting

### Ver logs de la aplicación

```bash
kubectl logs -f deployment/openreport -n openreport
```

### Verificar el estado del PersistentVolumeClaim

```bash
kubectl describe pvc openreport-data-pvc -n openreport
kubectl get events -n openreport --sort-by='.lastTimestamp'
```

### Verificar la conectividad del servicio

```bash
kubectl port-forward svc/openreport-service 8080:80 -n openreport
# Luego acceder a http://localhost:8080
```

## Limpieza

Para eliminar todos los recursos:

```bash
# Usando Kustomize
kubectl delete -k .

# O manualmente
kubectl delete -f deployment.yaml
kubectl delete -f persistent-volume.yaml
kubectl delete -f namespace.yaml
```

**Nota**: Al usar `standard-rwo` de GCP, el almacenamiento se eliminará automáticamente cuando se elimine el PVC.
