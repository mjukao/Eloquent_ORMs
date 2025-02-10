import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    publicDir: 'public', // ตรวจสอบให้แน่ใจว่า publicDir ถูกตั้งค่าให้เข้าถึงไฟล์ใน public/
});
