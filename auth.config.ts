// well use this file to trigger the middleware
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { loginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          // Busca el usuario en la base de datos
          const user = await getUserByEmail(email);

          // Si no existe el usuario o no tiene contraseña, devuelve null
          if (!user || !user.password) {
            return null;
          }

          // Compara las contraseñas
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user;
          }
        }

        return null; // Devuelve null si no se cumplen las condiciones
      },
    }),
  ],
} satisfies NextAuthConfig;
