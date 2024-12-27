"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useTransition } from "react";
import { updateSettings } from "@/actions/update-settings";

const SettingsPage = () => {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    image: session?.user?.image || "",
  });
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(
    session?.user?.isTwoFactorEnabled || false
  );
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <p className="text-lg">Cargando...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <p className="text-lg">No estás autenticado.</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const email = session?.user?.email;

    if (!email) {
      setError("El correo electrónico no está disponible en la sesión.");
      return;
    }

    startTransition(() => {
      updateSettings({ ...formData, email }) // Combinar todos los cambios en una sola acción
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            setSuccess("Información actualizada con éxito.");
          }
        })
        .catch(() => setError("Algo salió mal. Inténtalo de nuevo."));
    });
  };

  const handleToggleTwoFactor = () => {
    setError(null);
    setSuccess(null);

    const email = session?.user?.email;

    if (!email) {
      setError("El correo electrónico no está disponible en la sesión.");
      return;
    }

    startTransition(() => {
      updateSettings({ 
        email, 
        toggleTwoFactor: !isTwoFactorEnabled 
      })
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            setIsTwoFactorEnabled(data.user?.isTwoFactorEnabled || false);
            setSuccess(
              `La autenticación de dos factores se ha ${
                data.user?.isTwoFactorEnabled ? "activado" : "desactivado"
              }.`
            );
          }
        })
        .catch(() =>
          setError("No se pudo actualizar 2FA. Inténtalo de nuevo.")
        );
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Configuración de Usuario
      </h2>

      {success && (
        <div className="p-4 mb-4 text-sm text-green-500 bg-green-900 rounded-md">
          {success}
        </div>
      )}
      {error && (
        <div className="p-4 mb-4 text-sm text-red-500 bg-red-900 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-400">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={isPending}
            className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-400">
            URL de la Imagen
          </label>
          <input
            id="image"
            name="image"
            type="text"
            value={formData.image}
            onChange={handleChange}
            disabled={isPending}
            className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {isPending ? "Guardando..." : "Guardar Cambios"}
        </button>
      </form>

      <div className="bg-zinc-800 p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
          Autenticación de Dos Factores (2FA)
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Activar 2FA:</span>
          <button
            onClick={handleToggleTwoFactor}
            disabled={isPending}
            className={`px-4 py-2 rounded-md transition ${
              isTwoFactorEnabled
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isTwoFactorEnabled ? "Desactivar" : "Activar"}
          </button>
        </div>
      </div>

      <button
        onClick={() => signOut()}
        className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default SettingsPage;
