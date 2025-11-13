/// <reference types="react" />

// Provide a global fallback for JSX intrinsic elements so the editor
// doesn't show missing intrinsic element errors. This file is intentionally
// ambient (no exports) so TypeScript picks it up automatically.

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

