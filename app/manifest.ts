import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Om Jewel Studio - Premium Lab Grown Diamonds',
    short_name: 'Om Jewel Studio',
    description: 'Certified lab grown diamonds, HPHT & CVD diamonds, fancy shape and fancy colour diamonds. Diamond rings, earrings, and pendants.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#111827',
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['shopping', 'jewelry', 'diamonds'],
    lang: 'en-IN',
    dir: 'ltr',
  };
}