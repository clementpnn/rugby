import { z } from 'zod'

export const AdminRegisterSchema = z.object({
    firstName: z.string().nonempty({ message: 'Prénom est obligatoire' }),
    lastName: z.string().nonempty({ message: 'Nom est obligatoire' }),
    role: z.string().nonempty({ message: 'Role est obligatoire' }),
    email: z.string().email({ message: 'Email non valide' }),
    password: z.string()
        .nonempty({ message: 'Password est obligatoire' })
        .min(8, { message: 'Mot de passe doit contenir au moins 8 caractères' })
        .refine(
        (value) => /[A-Z]/.test(value),
        { message: 'Mot de passe doit contenir au moins une majuscule' }
        )
        .refine(
        (value) => /\d/.test(value),
        { message: 'Mot de passe doit contenir au moins un chiffre' }
        )
        .refine(
        (value) => /[\W_]/.test(value),
        { message: 'Mot de passe doit contenir au moins un caractère spécial' }
        ),
        confirmPassword: z.string().nonempty({ message: 'Confirm Password est obligatoire' })
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe doivent correspondre',
    path: ['confirmPassword']
})

export const LoginSchema = z.object({
    email: z.string().email({ message: 'Email non valide' }),
    password: z.string().nonempty({ message: 'Password est obligatoire' })
})

export const UserRegisterShema = z.object({
    accreditationId: z.string().nonempty({ message: 'AccreditationId est obligatoire' }),
    firstName: z.string().nonempty({ message: 'FirstName est obligatoire' }),
    lastName: z.string().nonempty({ message: 'LastName est obligatoire' }),
    company: z.string().nonempty({ message: 'Company est obligatoire' }),
    job: z.string().refine(value => value === 'JOURNALIST' || value === 'PHOTOGRAPHER', { message: 'Job non valide'}),
    email: z.string().email({ message: 'Email non valide' })
})