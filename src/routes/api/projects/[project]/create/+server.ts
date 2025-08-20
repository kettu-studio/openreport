import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { ensureProject } from '$lib/server/storage';

export const POST: RequestHandler = async ({ params }) => {
  const { project } = params;
  ensureProject(project);
  return json({ ok: true });
};


