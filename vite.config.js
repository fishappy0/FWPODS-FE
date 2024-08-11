import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('./assets/certs/priv.pem'),
      cert: fs.readFileSync('./assets/certs/pub.pem')
    }
  },
  plugins: [react()],
})
