import type { Dirent } from 'fs';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, rmSync } from 'fs';
import { join } from 'path';

const DATA_ROOT = 'data';

export type StoredReportMeta = {
  id: string; // ISO timestamp
  createdAt: string;
  totals: { total: number; bySeverity: Record<string, number> };
  type?: 'trivy' | 'gitleaks' | 'unknown';
};

export function ensureProject(project: string) {
  const dir = join(process.cwd(), DATA_ROOT, project);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return dir;
}

export function listProjects(): string[] {
  const root = join(process.cwd(), DATA_ROOT);
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true })
    .filter((d: Dirent) => d.isDirectory())
    .map((d) => d.name);
}

export function listProjectReports(project: string): StoredReportMeta[] {
  const dir = ensureProject(project);
  const files = readdirSync(dir).filter((f: string) => f.endsWith('.json'));
  const metas: StoredReportMeta[] = files.map((f) => {
    const full = join(dir, f);
    const report = JSON.parse(readFileSync(full, 'utf8'));
    const createdAt = report?.CreatedAt || new Date().toISOString();
    const results = report?.Results || [];
    const totals = results.reduce(
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
    let type: 'trivy' | 'gitleaks' | 'unknown' = 'unknown';
    if (report && typeof report === 'object' && !Array.isArray(report) && 'Results' in report) type = 'trivy';
    if (Array.isArray(report)) type = 'gitleaks';
    return { id: f.replace(/\.json$/, ''), createdAt, totals, type };
  });
  metas.sort((a, b) => b.id.localeCompare(a.id));
  return metas;
}

export function saveProjectReport(project: string, reportJson: any): StoredReportMeta {
  const dir = ensureProject(project);
  const id = new Date().toISOString().replace(/[:]/g, '-');
  const file = join(dir, `${id}.json`);
  writeFileSync(file, JSON.stringify(reportJson, null, 2), 'utf8');
  const list = listProjectReports(project);
  return list.find((m) => m.id === id)!;
}

export function readProjectReport(project: string, id: string): any | null {
  const file = join(process.cwd(), DATA_ROOT, project, `${id}.json`);
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, 'utf8'));
}

export function deleteProjectReport(project: string, id: string): boolean {
  const file = join(process.cwd(), DATA_ROOT, project, `${id}.json`);
  if (!existsSync(file)) return false;
  try {
    rmSync(file, { force: true });
    return true;
  } catch (error) {
    return false;
  }
}

export function deleteProject(project: string) {
  const dir = join(process.cwd(), DATA_ROOT, project);
  if (!existsSync(dir)) return;
  rmSync(dir, { recursive: true, force: true });
}


