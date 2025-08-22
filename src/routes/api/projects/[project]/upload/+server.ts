import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { saveProjectReport } from '$lib/server/storage';
import { detectReportType } from '$lib/server/reports';

export const POST: RequestHandler = async ({ params, request, url }) => {
  const { project } = params;
  let report: any;
  try {
    report = await request.json();
  } catch (e) {
    return json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const type = detectReportType(report);
  const meta = saveProjectReport(project, report);
  
  // Construir la URL del reporte
  const baseUrl = url.origin;
  const reportUrl = `${baseUrl}/projects/${encodeURIComponent(project)}/reports/${meta.id}`;
  return json({ 
    ok: true, 
    type, 
    meta,
    reportUrl 
  });
};


