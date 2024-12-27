"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas";
import { register } from "@/actions/register";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setError(null);
    setSuccess(null);

    startTransition(() => {
      register(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        } else if (data?.success) {
          setSuccess(data.success);
        }
      });
    });
  };

  const handleSocialLogin = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/dashboard", // Cambia esta URL según el redireccionamiento deseado
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Crear Cuenta
        </h2>

        {success && (
          <div className="p-4 mb-4 text-sm text-green-500">
            {success}
          </div>
        )}
        {error && (
          <div className="p-4 mb-4 text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              disabled={isPending}
              {...form.register("name")}
              className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {form.formState.errors.name && (
              <span className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              disabled={isPending}
              {...form.register("email")}
              className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {form.formState.errors.email && (
              <span className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              disabled={isPending}
              {...form.register("password")}
              className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {form.formState.errors.password && (
              <span className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              disabled={isPending}
              {...form.register("confirmPassword")}
              className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {form.formState.errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {form.formState.errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            disabled={isPending}
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300"
          >
            {isPending ? "Registrando..." : "Crear Cuenta"}
          </button>
        </form>

        {/* Botones para inicio de sesión con Google y GitHub */}
        <div className="mt-6 flex flex-col space-y-4">
          <button
            onClick={() => handleSocialLogin("google")}
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md flex items-center justify-center gap-2 transition duration-300"
          >
            <FcGoogle className="h-5 w-5" />
            Registrarse con Google
          </button>
          <button
            onClick={() => handleSocialLogin("github")}
            className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md flex items-center justify-center gap-2 transition duration-300"
          >
            <FaGithub className="h-5 w-5" />
            Registrarse con GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
