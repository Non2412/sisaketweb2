// Global JSX fallback for editor/TS server
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
