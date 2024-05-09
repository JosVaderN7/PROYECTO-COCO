import { initEmailSender } from "./core/index.js";

const emailProvider = {
  type: "dummy",
} as const;

// PUBLIC API
export const emailSender = initEmailSender(emailProvider);

// PUBLIC API
export type { Email, EmailFromField } from "./core/types.js";
