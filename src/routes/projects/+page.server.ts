import type { PageServerLoad } from './$types';
import { listProjects, listProjectReports } from '$lib/server/storage';

export const load: PageServerLoad = async () => {
  const projects = listProjects().map((name) => {
    const reports = listProjectReports(name);
    const latest = reports[0];
    return { name, reportCount: reports.length, latest };
  });
  return { projects };
};


