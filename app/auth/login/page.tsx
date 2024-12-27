"use client";

import * as z from "zod";
import { loginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/actions/login";
import { useTransition, useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState(""); // Estado para el código 2FA
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError(null);
    setSuccess(null);

    startTransition(() => {
      const loginData = showTwoFactor
        ? { email: values.email, password: values.password, code: twoFactorCode } // Incluir código 2FA si es necesario
        : values;

      login(loginData)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          } else if (data?.success) {
            form.reset();
            setSuccess(data.success);
            router.push("/dashboard"); // Redirigir después del inicio de sesión exitoso
          } else if (data?.twoFactor) {
            setShowTwoFactor(true); // Mostrar el campo 2FA si se requiere
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  const handleSocialLogin = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/settings",
    });
  };

  const handleRegisterRedirect = () => {
    router.push("/auth/register"); // Cambia esta ruta si es diferente
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Iniciar Sesión
        </h2>

        {success && (
          <div className="p-4 mb-4 text-sm text-green-500">{success}</div>
        )}
        {error && <div className="p-4 mb-4 text-sm text-red-500">{error}</div>}

        {!showTwoFactor ? (
          // Formulario de inicio de sesión estándar
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400"
              >
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400"
              >
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

            <button
              disabled={isPending}
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300"
            >
              {isPending ? "Iniciando..." : "Iniciar Sesión"}
            </button>
          </form>
        ) : (
          // Formulario de verificación 2FA
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <label
              htmlFor="twoFactorCode"
              className="block text-sm font-medium text-gray-400"
            >
              Código de Verificación 2FA
            </label>
            <input
              id="twoFactorCode"
              type="text"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)} // Actualizar el estado con el código 2FA
              disabled={isPending}
              className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              disabled={isPending}
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300"
            >
              {isPending ? "Verificando..." : "Enviar Código"}
            </button>
          </form>
        )}

        {/* Botones para inicio de sesión con Google y GitHub */}
        <div className="mt-6 flex flex-col space-y-4">
          <button
            onClick={() => handleSocialLogin("google")}
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md flex items-center justify-center gap-2 transition duration-300"
          >
            <FcGoogle className="h-5 w-5" />
            Iniciar sesión con Google
          </button>
          <button
            onClick={() => handleSocialLogin("github")}
            className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md flex items-center justify-center gap-2 transition duration-300"
          >
            <FaGithub className="h-5 w-5" />
            Iniciar sesión con GitHub
          </button>
        </div>

        {/* Enlace para registrarse si no tiene cuenta */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">¿No tienes una cuenta?</p>
          <button
            onClick={handleRegisterRedirect}
            className="text-indigo-500 hover:text-indigo-600 font-semibold transition duration-300"
          >
            Regístrate aquí
          </button>
        </div>

        {/* Enlace para los usuarios que olvidaron su contraseña */}
        <div className="mt-4 text-center">
          <Link
            href="/auth/reset"
            className="text-red-500 hover:text-red-600 font-semibold transition duration-300"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
