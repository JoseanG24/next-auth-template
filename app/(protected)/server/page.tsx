"use client";

import UserButton from "@/components/other/UserButton";
import { useSession, signOut } from "next-auth/react";

const ServerPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Cargando...</p>; // Mostrar un mensaje de carga mientras se obtiene la sesión
  }

  if (!session) {
    return <p>No estás autenticado.</p>; // Mostrar un mensaje si no hay sesión
  }

  return (
    <div className="p-6 bg-black text-gray-100 min-h-screen">
      <UserButton />

      <h2 className="text-2xl font-semibold mb-4">
        Bienvenido, {session.user?.name || "Usuario"}
      </h2>

      <div className="mb-6">
        <p className="text-lg">
          <strong>Email:</strong> {session.user?.email}
        </p>
        <p className="text-lg">
          <strong>Rol:</strong> {session.user?.role || "No especificado"}
        </p>
      </div>

      {/* Mostrar toda la información de la sesión */}
      <div className="bg-zinc-800 p-4 rounded-md mb-6">
        <h3 className="text-lg font-medium mb-2">Información completa:</h3>
        <pre className="text-sm bg-zinc-700 p-4 rounded-md overflow-auto">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      {/* Botón de cerrar sesión */}
      <button
        onClick={() => signOut()} // Usar signOut directamente en el cliente
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default ServerPage;
