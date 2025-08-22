import { SERVER_CONFIG } from '$lib/server/config';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  
  return { domain: SERVER_CONFIG.getDomain() };
};


