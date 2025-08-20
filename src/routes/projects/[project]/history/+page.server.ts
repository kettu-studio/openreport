import type { PageServerLoad } from './$types';
import { listProjectReports } from '$lib/server/storage';

export const load: PageServerLoad = async ({ params }) => {
  const { project } = params;
  const reports = listProjectReports(project);
  return { project, reports };
};


