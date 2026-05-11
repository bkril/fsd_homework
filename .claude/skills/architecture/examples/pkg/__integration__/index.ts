export { __integration__Client } from "./__integration__.client";
// Note: do NOT re-export the server adapter from this barrel.
// Server adapters must be imported directly via their full path:
//   import { __integration__Server } from "@/pkg/__integration__/__integration__.server";
// This prevents accidental bundling of server code into the client.
