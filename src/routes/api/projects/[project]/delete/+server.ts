import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { deleteProject } from '$lib/server/storage';

export const DELETE: RequestHandler = async ({ params }) => {
  const { project } = params;
  deleteProject(project);
  return json({ ok: true });
};


