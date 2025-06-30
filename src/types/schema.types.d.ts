import { z } from "zod"

export {}

declare global {
    declare type SignIn = z.infer<typeof SignInSchema>
    declare type SignUp = z.infer<typeof SignUpSchema>
}