import type Lenis from "lenis";

declare global {
  interface Window {
    /** Lenis instance exposed for development and verification tooling. */
    __zekoLenis?: Lenis;
  }
}

export {};
