import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().trim().email({
    message: 'Not a valid e-mail'
  }),
  password: z.string().trim().min(1, {
    message: 'Password is required'
  })
});

export const RegisterSchema = z
  .object({
    email: z.string().trim().email({ message: 'Not a valid e-mail' }),
    name: z.string().trim().min(3, {
      message: 'Username has to be at least 3 characters'
    }),
    password: z.string().trim().min(8, {
      message: 'Minimum 8 characters'
    }),
    confirmPassword: z.string().trim().min(8, {
      message: 'Minimum 8 characters'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

export const ResetSchema = z.object({
  email: z.string().trim().email({ message: 'Not a valid e-mail' })
});

export const NewPasswordSchema = z
  .object({
    token: z.string(),
    password: z.string().trim().min(8, {
      message: 'Minimum 8 characters'
    }),
    confirmPassword: z.string().trim().min(8, {
      message: 'Minimum 8 characters'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

export const GameScoreSchema = z.object({
  totalTime: z.number(),
  splitTimes: z.array(
    z.object({
      label: z.string(),
      time: z.number()
    })
  )
});

export const UpdatePasswordSchema = z
  .object({
    isOAuthAccount: z.boolean(),
    oldPassword: z.string().trim().min(8, {
      message: 'Minimum 8 characters'
    }),
    newPassword: z.string().trim().min(8, {
      message: 'Minimum 8 characters'
    }),
    confirmNewPassword: z.string().trim().min(8, {
      message: 'Minimum 8 characters'
    })
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword']
  });
