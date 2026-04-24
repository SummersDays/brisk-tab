/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly CRX_BUILD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
