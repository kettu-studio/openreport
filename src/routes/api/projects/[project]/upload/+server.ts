import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { saveProjectReport } from '$lib/server/storage';
import { detectReportType } from '$lib/server/reports';

export const POST: RequestHandler = async ({ params, request }) => {
  const { project } = params;
  let report: any;
  try {
    report = await request.json();
  } catch (e) {
    return json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const type = detectReportType(report);
  const meta = saveProjectReport(project, report);
  return json({ ok: true, type, meta });
};


