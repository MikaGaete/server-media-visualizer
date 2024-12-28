/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}