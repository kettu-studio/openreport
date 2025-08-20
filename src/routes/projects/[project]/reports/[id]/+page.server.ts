import type { PageServerLoad } from './$types';
import { readProjectReport } from '$lib/server/storage';
import { prepareTrivyData } from '$lib/server/trivy';
import { detectReportType } from '$lib/server/reports';
import { prepareGitleaksData } from '$lib/server/gitleaks';

export const load: PageServerLoad = async ({ params }) => {
  const { project, id } = params;
  const report = readProjectReport(project, id);
  if (!report) return { project, id, notFound: true };
  const type = detectReportType(report);
  if (type === 'trivy') {
    return { project, id, kind: 'trivy', prepared: prepareTrivyData(report) };
  }
  if (type === 'gitleaks') {
    return { project, id, kind: 'gitleaks', prepared: prepareGitleaksData(report) };
  }
  return { project, id, kind: 'unknown', raw: report };
};


