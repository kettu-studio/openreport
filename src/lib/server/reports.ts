export type ReportType = 'trivy' | 'gitleaks' | 'syft' | 'unknown';

export function detectReportType(json: any): ReportType {
  if (json && typeof json === 'object' && !Array.isArray(json)) {
    if ('Results' in json && ('SchemaVersion' in json || 'ArtifactName' in json)) return 'trivy';
    if ('artifacts' in json && Array.isArray(json.artifacts)) return 'syft';
  }
  if (Array.isArray(json)) {
    // gitleaks typically outputs an array of objects with RuleID/File/Commit
    if (json.length === 0) return 'gitleaks';
    const e = json[0] || {};
    if ('RuleID' in e && 'File' in e) return 'gitleaks';
  }
  return 'unknown';
}


