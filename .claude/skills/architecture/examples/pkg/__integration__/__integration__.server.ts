import "server-only";

// Server-side adapter for the __integration__ third-party library.
// Runs in the server runtime. The "server-only" import enforces this — any
// attempt to import this from a client component will fail at build time.

export const __integration__Server = {
  async getSession() {
    // return the current server session, if any
    return null;
  },

  async perform(input: unknown) {
    return input;
  },
};
