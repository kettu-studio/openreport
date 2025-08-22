export type PreparedGitleaksData = {
  findings: any[];
  summary: { total: number; byRule: Record<string, number> };
  lastDate?: string;
  metadata?: {
    RepoURL?: string;
    Branch?: string;
    Commit?: string;
    Author?: string;
  };
  createdAt?: string;
};

export function prepareGitleaksData(report: any[]): PreparedGitleaksData {
  const findings = Array.isArray(report) ? report : [];
  const summary = findings.reduce(
    (acc: any, f: any) => {
      acc.total++;
      const rule = String(f?.RuleID || 'unknown');
      acc.byRule[rule] = (acc.byRule[rule] || 0) + 1;
      return acc;
    },
    { total: 0, byRule: {} as Record<string, number> }
  );
  
  let lastDate: string | undefined = undefined;
  for (const f of findings) {
    const d = f?.Date ? new Date(f.Date) : undefined;
    if (d && !Number.isNaN(d.getTime())) {
      if (!lastDate || d > new Date(lastDate)) lastDate = d.toISOString();
    }
  }
  
  // Extraer metadatos del repositorio si están disponibles
  const metadata: any = {};
  if (findings.length > 0) {
    const firstFinding = findings[0];
    // Intentar extraer información del repositorio del primer hallazgo
    if (firstFinding.RepoURL) metadata.RepoURL = firstFinding.RepoURL;
    if (firstFinding.Branch) metadata.Branch = firstFinding.Branch;
    if (firstFinding.Commit) metadata.Commit = firstFinding.Commit;
    if (firstFinding.Author) metadata.Author = firstFinding.Author;
  }
  
  return { 
    findings, 
    summary, 
    lastDate,
    metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
    createdAt: lastDate || new Date().toISOString()
  };
}


