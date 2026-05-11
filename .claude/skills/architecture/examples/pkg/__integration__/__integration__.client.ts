// Client-side adapter for the __integration__ third-party library.
// Runs in the browser. No "server-only" imports.

export const __integration__Client = {
  init() {
    // initialize the integration on the client
  },

  call(input: unknown) {
    // wrap the underlying SDK call
    return input;
  },
};
