import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import viteCompression from "vite-plugin-compression";
import { minifyHtml } from "vite-plugin-html";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 23333,
    proxy: {
      "/hitokoto-api": {
        target: `https://v1.hitokoto.cn`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hitokoto-api/, ``),
      },
      "/konachan-api": {
        target: `https://konachan.net/post.json`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/konachan-api/, ``),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/style/var.scss";`,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: `@`,
        replacement: path.resolve(__dirname, `src`),
      },
      {
        find: `@style`,
        replacement: path.resolve(__dirname, `src/style`),
      },
      {
        find: `@store`,
        replacement: path.resolve(__dirname, `src/store`),
      },
      {
        find: `@router`,
        replacement: path.resolve(__dirname, `src/router`),
      },
      {
        find: `@components`,
        replacement: path.resolve(__dirname, `src/components`),
      },
      {
        find: `@assets`,
        replacement: path.resolve(__dirname, `src/assets`),
      },
      {
        find: `@compositions`,
        replacement: path.resolve(__dirname, `src/compositions`),
      },
      {
        find: `@api`,
        replacement: path.resolve(__dirname, `src/api`),
      },
      {
        find: `@views`,
        replacement: path.resolve(__dirname, `src/views`),
      },
    ],
  },
  plugins: [
    vue(),
    legacy({
      targets: [`> 0%`],
    }),
    viteCompression({
      // RegExp or (file: string) => boolean 指定哪些资源不压缩 /\.(js|mjs|json|css|html)$/i
      // filter: ``,
      // 是否禁用
      //disable: false,
      //是否在控制台输出压缩结果
      //verbose: true,
      // 压缩算法： 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw'
      algorithm: `brotliCompress`,
      // 压缩后是否删除源文件
      //deleteOriginFile: false,
      // 生成的压缩包后缀
      // ext: `.gz`,
    }),
    minifyHtml({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
    }),
  ],
});
