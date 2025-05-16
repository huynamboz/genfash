import { ofetch } from 'ofetch';

export const $api = ofetch.create({
  baseURL: 'https://quizzfly.site',
  headers: {
    'x-api-key': 'bdfef3d7-8789-4450-aa09-fe384c38c7d0',
  },
});
