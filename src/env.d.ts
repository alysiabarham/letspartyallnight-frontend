interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  // add other VITE_ vars here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
