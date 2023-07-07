import { z } from 'zod'

export const AdminSchema = z.object({
  firstName: z.string().nonempty({ message: 'Required' }),
  lastName: z.string().nonempty({ message: 'Required' }),
  role: z.string().nonempty({ message: 'Required' }),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string()
    .nonempty({ message: 'Required' })
    .min(8, { message: 'Mot de passe doit contenir au moins 8 caractères' })
    .refine(
      (value) => /[a-z]/.test(value),
      { message: 'Password must contain at least one lowercase letter' }
    )
    .refine(
      (value) => /[A-Z]/.test(value),
      { message: 'Password must contain at least one capital letter' }
    )
    .refine(
      (value) => /\d/.test(value),
      { message: 'Password must contain at least one number' }
    )
    .refine(
      (value) => /[\W_]/.test(value),
      { message: 'Password must contain at least one special character' }
    ),
  confirmPassword: z.string().nonempty({ message: 'Required' })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword']
})

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().nonempty({ message: 'Password est obligatoire' })
})

export const UserSchema = z.object({
  accreditationId: z.string().nonempty({ message: 'Required' }),
  firstName: z.string().nonempty({ message: 'Required' }),
  lastName: z.string().nonempty({ message: 'Required' }),
  company: z.string().nonempty({ message: 'Required' }),
  job: z.string().refine(value => value === 'JOURNALIST' || value === 'PHOTOGRAPHER', { message: 'Invalid Job' }),
  email: z.string().email({ message: 'Invalid email format' })
})

export const MFASchema = z.object({
  numberOne: z.string().transform(Number),
  numberTwo: z.string().transform(Number),
  numberThree: z.string().transform(Number),
  numberFour: z.string().transform(Number),
  numberFive: z.string().transform(Number),
  numberSix: z.string().transform(Number)
})

export const TribuneSchema = z.object({
  name: z.string().nonempty({ message: 'Required' }),
  matchId: z.string().nonempty({ message: 'Required' }),
  type: z.string().refine(value => value === 'JOURNALIST' || value === 'PHOTOGRAPHER', { message: 'Invalid Job' }),
  places: z.string().transform(Number)
})

export const TeamSchema = z.object({
  country: z.string().nonempty({ message: 'Required' }),
  poule: z.string().refine(value => value === 'A' || value === 'B' || value === 'C' || value === 'D', { message: 'Invalid Poule' })
})

export const MatchSchema = z.object({
  // date: z.string().transform(value => new Date(value)),
  date: z.string().nonempty({ message: 'Required' }),
  hour: z.string().nonempty({ message: 'Required' }),
  minute: z.string().nonempty({ message: 'Required' }),
  phase: z.string().refine(value => value === 'POULE_A' || value === 'POULE_B' || value === 'POULE_C' || value === 'POULE_D' || value === 'QUARTERFINAL' || value === 'SEMI_FINAL' || value === 'FINAL', { message: 'Invalid Type' }),
  stadium: z.string().nonempty({ message: 'Required' }),
  teamOne: z.string().nonempty({ message: 'Required' }),
  teamTwo: z.string().nonempty({ message: 'Required' })
})

export const DemandSchema = z.object({
  userId: z.string().nonempty({ message: 'Required' }),
  matchId: z.string().nonempty({ message: 'Required' }),
  state: z.string().refine(value => value === 'ACCEPTED' || value === 'IN_PROGRESS' || value === 'REJECTED', { message: 'Invalid State' })
})
