"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {/* Encabezado */}
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">¡Bienvenido a Nuestra Plataforma!</h1>
        <p className="text-lg sm:text-xl text-gray-300">
          Únete ahora para disfrutar de una experiencia personalizada.
        </p>
      </header>

      {/* Imagen Principal */}
      <div className="mb-8">
        <Image
          src="/next.svg"
          alt="Logo principal"
          width={200}
          height={50}
          priority
          className="dark:invert"
        />
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => handleNavigate("/auth/login")}
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300"
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => handleNavigate("/auth/register")}
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition duration-300"
        >
          Registrarse
        </button>
      </div>

      {/* Sección de Beneficios */}
      <section className="mt-12 text-center max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">¿Por qué elegirnos?</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Acceso rápido y seguro.</li>
          <li>Interfaz intuitiva y fácil de usar.</li>
          <li>Soporte técnico 24/7.</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-gray-400 text-sm text-center">
        © {new Date().getFullYear()} TuEmpresa. Todos los derechos reservados.
      </footer>
    </div>
  );
}
