import type { PageServerLoad } from './$types';
import { listProjectReports, readProjectReport } from '$lib/server/storage';
import { prepareTrivyData } from '$lib/server/trivy';
import { detectReportType } from '$lib/server/reports';
import { prepareGitleaksData } from '$lib/server/gitleaks';

export const load: PageServerLoad = async ({ params }) => {
  const { project } = params;
  const reports = listProjectReports(project);
  const latest = reports[0];
  // Preparar ambos tipos si existen entre los reportes
  let latestTrivy: any = null;
  let latestGitleaks: any = null;
  for (const r of reports) {
    const json = readProjectReport(project, r.id);
    const t = detectReportType(json);
    if (!latestTrivy && t === 'trivy') latestTrivy = { id: r.id, prepared: prepareTrivyData(json) };
    if (!latestGitleaks && t === 'gitleaks') latestGitleaks = { id: r.id, prepared: prepareGitleaksData(json) };
    if (latestTrivy && latestGitleaks) break;
  }
  return { project, reports, latest, latestTrivy, latestGitleaks };
};


