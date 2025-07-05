import { ofetch } from 'ofetch';

export const $api = ofetch.create({
  baseURL: 'https://genfash.online',
  headers: {
    'x-api-key': 'ba29d203-2a28-4bf2-9b55-579e7a788427',
  },
});
