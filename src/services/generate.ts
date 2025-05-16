import { $api } from '@/api/ofetch';

export const GenerateImageApi = async (prompt: string) => {
  return await $api('/generate-image', {
    method: 'POST',
    body: {
      prompt,
    },
  });
};

export const GetResultImageApi = async (job_id: string) => {
  return await $api(`/result/${job_id}`, {
    method: 'GET',
  });
};
