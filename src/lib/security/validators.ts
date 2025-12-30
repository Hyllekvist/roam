import { z } from "zod";

export const usernameSchema = z
  .string()
  .min(3)
  .max(24)
  .regex(/^[a-z0-9_\.]+$/, "Use a-z, 0-9, underscore or dot")
  .transform((s) => s.toLowerCase());

export const passwordSchema = z
  .string()
  .min(8)
  .max(72)
  .regex(/[a-z]/i, "Include a letter")
  .regex(/[0-9]/, "Include a number");

export const signupSchema = z.object({
  username: usernameSchema,
  email: z.string().email().transform((s) => s.toLowerCase()),
  password: passwordSchema,
  ageVerified: z.boolean().refine((v) => v === true, "You must be 18+")
});

export const loginSchema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(1)
});

export const usernameLookupSchema = z.object({
  username: usernameSchema
});

export const feedbackSchema = z.object({
  matchId: z.string().uuid(),
  again: z.boolean(),
  respectful: z.boolean()
});

export const messageSchema = z.object({
  matchId: z.string().uuid(),
  body: z.string().min(1).max(500)
});
