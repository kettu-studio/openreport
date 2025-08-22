import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { deleteProjectReport } from '$lib/server/storage';

export const DELETE: RequestHandler = async ({ params }) => {
  const { project, id } = params;
  
  if (!project || !id) {
    return json({ error: 'Project and report ID are required' }, { status: 400 });
  }

  const success = deleteProjectReport(project, id);
  
  if (success) {
    return json({ ok: true, message: 'Report deleted successfully' });
  } else {
    return json({ error: 'Report not found or could not be deleted' }, { status: 404 });
  }
};
