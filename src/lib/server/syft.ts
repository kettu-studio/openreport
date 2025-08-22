export interface SyftArtifact {
  id: string;
  name: string;
  version?: string;
  type: string;
  language?: string;
  purl?: string;
  cpes?: Array<string | { cpe: string; source?: string }>;
  licenses?: string[];
  foundBy?: string;
  locations?: Array<{ path: string }>;
  metadata?: {
    description?: string;
    homepage?: string;
    [key: string]: any;
  };
}

export interface SyftMetadata {
  repoURL?: string;
  branch?: string;
  commit?: string;
  author?: string;
  [key: string]: any;
}

export interface SyftReport {
  artifacts: SyftArtifact[];
  metadata?: SyftMetadata;
  createdAt?: string;
  source?: any;
  distro?: any;
  descriptor?: any;
  schema?: any;
  [key: string]: any;
}

export interface PreparedSyftData {
  artifacts: SyftArtifact[];
  metadata: SyftMetadata;
  createdAt: string;
  summary: {
    total: number;
    byType: Record<string, number>;
  };
}

export function prepareSyftData(report: SyftReport): PreparedSyftData {
  const artifacts = report?.artifacts || [];
  const metadata = report?.metadata || {};
  
  // Extraer createdAt del reporte o usar timestamp actual
  let createdAt = report?.createdAt;
  if (!createdAt) {
    // Si no hay createdAt en metadata, intentar extraerlo de otras fuentes
    if (report?.metadata?.createdAt) {
      createdAt = report.metadata.createdAt;
    } else if (report?.descriptor?.timestamp) {
      createdAt = report.descriptor.timestamp;
    } else {
      createdAt = new Date().toISOString();
    }
  }

  // Agrupar artefactos por tipo
  const byType: Record<string, number> = {};
  artifacts.forEach(artifact => {
    const type = artifact.type || 'unknown';
    byType[type] = (byType[type] || 0) + 1;
  });

  return {
    artifacts,
    metadata,
    createdAt,
    summary: {
      total: artifacts.length,
      byType
    }
  };
}
