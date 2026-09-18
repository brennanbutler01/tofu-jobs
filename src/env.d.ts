/// <reference types="vite/client" />
//https://vitejs.dev/guide/env-and-mode.html
interface ImportMetaEnv {
  readonly VITE_VISITOR_DEMO?: string
  readonly VITE_AUTH0_DOMAIN: string
  readonly VITE_AUTH0_CLIENT_ID: string
  readonly VITE_AUTH0_CALLBACK_URL: string
  readonly VITE_AUTH0_API: string
  readonly VITE_BACKEND_API: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
