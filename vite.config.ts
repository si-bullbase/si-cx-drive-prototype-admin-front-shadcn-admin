import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = process.env.VITE_API_TARGET || env.VITE_API_TARGET 
  
  console.log('🔧 Vite Config - Mode:', mode)
  console.log('🔧 Vite Config - Environment variables loaded:', {
    'process.env.VITE_API_TARGET': process.env.VITE_API_TARGET,
    'env.VITE_API_TARGET': env.VITE_API_TARGET,
    'final apiTarget': apiTarget
  })
  
  return {
  define: {
    'process.env.VITE_API_TARGET': JSON.stringify(apiTarget),
  },
  plugins: [
    TanStackRouterVite({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),

      // fix loading all icon chunks in dev mode
      // https://github.com/tabler/tabler-icons/issues/1233
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
        secure: false,
        rejectUnauthorized: false,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.error('🚨 Proxy Error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('🔄 Proxy Request - Sending to target:', {
              method: req.method,
              url: req.url,
              target: apiTarget,
              headers: proxyReq.getHeaders()
            });
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('🔄 Proxy Response - Received from target:', {
              status: proxyRes.statusCode,
              url: req.url,
              headers: proxyRes.headers
            });
          });
        },
      },
    },
  },
  }
})
