"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AdminPage = () => {
  const role = useCurrentRole();
  const router = useRouter();

  useEffect(() => {
    if (role && role !== "ADMIN") {
      // Redirigir si el rol no es ADMIN
      router.push("/unauthorized");
    }
  }, [role, router]);

  if (!role) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Cargando...</p>
      </div>
    ); // Mostrar mientras se obtiene el rol
  }

  if (role !== "ADMIN") {
    return null; // Evitar parpadeos si la redirección tarda
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {/* Título principal */}
      <h1 className="text-4xl font-bold mb-6">Panel de Administrador</h1>

      {/* Secciones principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Estadísticas */}
        <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Estadísticas</h2>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span className="text-gray-400">Usuarios Totales:</span>
              <span className="text-white">1,230</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Sesiones Activas:</span>
              <span className="text-white">45</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-400">Ventas Mensuales:</span>
              <span className="text-white">$15,780</span>
            </li>
          </ul>
        </div>

        {/* Gestión de usuarios */}
        <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Gestión de Usuarios</h2>
          <button className="w-full px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition">
            Ver Usuarios
          </button>
          <button className="w-full mt-3 px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition">
            Agregar Nuevo Usuario
          </button>
        </div>

        {/* Configuración del sistema */}
        <div className="bg-zinc-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Configuración</h2>
          <ul className="space-y-3">
            <li>
              <button className="w-full px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 transition">
                Configuración General
              </button>
            </li>
            <li>
              <button className="w-full px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 transition">
                Ajustes de Seguridad
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Sección adicional: Reportes */}
      <div className="bg-zinc-800 p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Reportes</h2>
        <p className="text-gray-400 mb-4">
          Descarga reportes detallados del sistema y la actividad de los
          usuarios.
        </p>
        <button className="w-full px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition">
          Descargar Reporte
        </button>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-zinc-800 p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="w-full px-4 py-2 bg-yellow-600 rounded-md hover:bg-yellow-700 transition">
            Reiniciar Servidores
          </button>
          <button className="w-full px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition">
            Deshabilitar Usuarios
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
