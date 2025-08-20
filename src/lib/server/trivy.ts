export type PreparedTrivyData = {
  report: any;
  schemaVersion: number | string | undefined;
  createdAt: string | undefined;
  artifactName: string | undefined;
  artifactType: string | undefined;
  metadata: Record<string, any>;
  results: any[];
  summary: { total: number; bySeverity: Record<string, number> };
  typeTotals: { vulnerabilities: number; misconfigurations: number; secrets: number; licenses: number };
};

export function prepareTrivyData(report: any): PreparedTrivyData {
  const schemaVersion = report?.SchemaVersion;
  const createdAt = report?.CreatedAt;
  const artifactName = report?.ArtifactName;
  const artifactType = report?.ArtifactType;
  const metadata = report?.Metadata ?? {};
  const rawResults = report?.Results ?? [];

  const severityOrder = ["CRITICAL", "HIGH", "MEDIUM", "LOW", "UNKNOWN", "NEGLIGIBLE", "INFO"];
  const severityIndex = (s?: string) => {
    const idx = severityOrder.indexOf((s || "UNKNOWN").toUpperCase());
    return idx === -1 ? severityOrder.length : idx;
  };

  const results = rawResults.map((r: any) => {
    const v = Array.isArray(r?.Vulnerabilities) ? [...r.Vulnerabilities] : [];
    v.sort((a: any, b: any) => {
      const ai = severityIndex(a?.Severity);
      const bi = severityIndex(b?.Severity);
      if (ai !== bi) return ai - bi;
      const as = a?.CVSS?.ghsa?.V3Score ?? a?.CVSS?.nvd?.V3Score ?? 0;
      const bs = b?.CVSS?.ghsa?.V3Score ?? b?.CVSS?.nvd?.V3Score ?? 0;
      return bs - as;
    });
    return { ...r, Vulnerabilities: v };
  });

  const summary = results.reduce(
    (acc: any, r: any) => {
      const vulns: any[] = r.Vulnerabilities ?? [];
      for (const v of vulns) {
        acc.total++;
        const sev = (v.Severity || 'UNKNOWN').toUpperCase();
        acc.bySeverity[sev] = (acc.bySeverity[sev] || 0) + 1;
      }
      return acc;
    },
    { total: 0, bySeverity: {} as Record<string, number> }
  );

  const typeTotals = results.reduce(
    (acc: any, r: any) => {
      acc.vulnerabilities += (r.Vulnerabilities?.length || 0);
      acc.misconfigurations += (r.Misconfigurations?.length || 0);
      acc.secrets += (r.Secrets?.length || 0);
      acc.licenses += (r.Licenses?.length || r.LicenseFindings?.length || 0);
      return acc;
    },
    { vulnerabilities: 0, misconfigurations: 0, secrets: 0, licenses: 0 }
  );

  return {
    report,
    schemaVersion,
    createdAt,
    artifactName,
    artifactType,
    metadata,
    results,
    summary,
    typeTotals
  };
}


