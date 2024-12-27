"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.push("/login"); // Cambia '/login' por la ruta real de tu página de login
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-semibold mb-4">Algo salió mal</h1>
      <p className="text-gray-400 mb-8">
        Por favor, intenta nuevamente más tarde.
      </p>
      <button
        onClick={handleBackToLogin}
        className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300"
      >
        Volver al Login
      </button>
    </div>
  );
};

export default ErrorPage;
