import { $api } from '@/api/ofetch';
import { useAuthStore } from '@/stores/auth';

export const GenerateImageApi = async ({
  prompt,
  selectedStyle,
  name,
  isPublic,
}: {
  prompt: string;
  selectedStyle: string;
  name: string;
  isPublic: boolean;
}) => {
  const { user } = useAuthStore.getState();
  return await $api('/generate-image', {
    method: 'POST',
    body: {
      prompt,
      publisher_id: user?.id,
      selected_style: selectedStyle,
      name,
      is_public: isPublic,
    },
  });
};

export const GetResultImageApi = async (collection_id: string) => {
  return await $api(`/result/${collection_id}`, {
    method: 'GET',
  });
};
