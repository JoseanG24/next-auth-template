"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const UserButton = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!session || !session.user) {
    return null; // No mostrar el botón si no hay sesión
  }

  return (
    <div className="relative">
      {/* Botón principal */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
      >
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "Usuario"}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-sm">
            {session.user.name?.[0]?.toUpperCase() || "U"}
          </div>
        )}
        <span>{session.user.name || "Usuario"}</span>
      </button>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <div className="px-4 py-2">
            <p className="text-sm text-gray-700">
              <strong>Correo:</strong> {session.user.email}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Rol:</strong> {session.user.role || "Usuario"}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <button
              onClick={() => signOut()}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserButton;
