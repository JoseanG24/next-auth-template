"use client";

import React, { useState } from "react";
import * as z from "zod";
import { useTransition } from "react";
import { reset } from "@/actions/reset";

// Esquema de validación para el correo electrónico
const resetEmailSchema = z.object({
  email: z.string().email("Debe ser un correo electrónico válido"),
});

const ResetPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validación con zod
    const validation = resetEmailSchema.safeParse({ email });
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    startTransition(() => {
      reset({ email }).then((data) => {
        if (data?.error) {
          setError(data.error);
        } else if (data?.success) {
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Restablecer Contraseña
        </h2>

        {success && (
          <div className="p-4 mb-4 text-sm text-green-500">{success}</div>
        )}
        {error && <div className="p-4 mb-4 text-sm text-red-500">{error}</div>}

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              disabled={isPending}
              className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300"
          >
            {isPending ? "Enviando..." : "Enviar correo de restablecimiento"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPage;
