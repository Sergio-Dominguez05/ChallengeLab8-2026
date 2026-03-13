// =============================================================================
// APP COMPONENT - Module 2: Real Estate React
// =============================================================================
// Componente raíz de la aplicación que configura:
// - Routing con React Router
// - Layout general
// - Providers globales (si los hubiera)
//
// ## React Router v7
// React Router es el estándar para routing en aplicaciones React.
// Usamos Routes y Route para definir las páginas de la aplicación.
// =============================================================================

import type React from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Home, Building2 } from 'lucide-react';
import { HomePage } from '@/pages/HomePage';
import { NewPropertyPage } from '@/pages/NewPropertyPage';
import { PropertyDetailPage } from '@/pages/PropertyDetailPage';
import { ComparePage } from '@/pages/ComparePage';

//Aqui agregue los imports de useState y de React

/**
 * Componente principal de la aplicación.
 *
 * ## Estructura:
 * - Header con navegación
 * - Main con las rutas
 * - Footer con créditos
 */
function App(): React.ReactElement {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  //Este estado de aqui lo que hace es hacer que los IDs se guarden con las propiedades
  //Con las que se seleccionaron, para eso usa un State

  const toggleCompare = (id: string): void => {

    //Esta funcion lo que hace en resumidas cuentas es:
    if (compareIds.includes(id)) { //Si el ID ya esta...
      setCompareIds(compareIds.filter((item) => item !== id));  //Entonces que lo quite
      return;
    }

    //Si el ID no esta...

    if (compareIds.length < 3) { //Verificar que hayan menos de 3 porque eso es el limite 
      //Nota: 3 es el limite de cuantas se pueden comparar a la vez
      setCompareIds([...compareIds, id]); //Si hay menos de 3 entonces lo agrega
    }// Si no hay menos de 3 entonces no hace nada
  };
  return (
    <>
      {/* Toaster para notificaciones - fuera del layout para evitar problemas de z-index */}
      <Toaster position="top-right" richColors closeButton />

      <div className="min-h-screen flex flex-col bg-background">
        {/* ===================================================================
          HEADER / NAVEGACIÓN
          =================================================================== */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 items-center px-4">
            {/**Titulo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <Building2 className="h-6 w-6 text-primary" />
              <span>RealEstate</span>
            </Link>
            {/** Navegacion */}
            <nav className="ml-auto flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="h-4 w-4" />
                Inicio
              </Link>

              <Link
                to="/compare"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Comparar ({compareIds.length})
              </Link>
            </nav>
          </div>
        </header>
        </header>

        {/* ===================================================================
          CONTENIDO PRINCIPAL
          ===================================================================
          Routes define las diferentes "páginas" de la aplicación.
          Cada Route mapea una URL a un componente.
          =================================================================== */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  compareIds={compareIds}
                  onToggleCompare={toggleCompare}
                />  {/**Esto de aqui lo que hace es pasar los props a la Home Page con una ruta */}
              }
            />

            <Route path="/new" element={<NewPropertyPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />

            <Route
              path="/compare"
              element={
                <ComparePage
                  compareIds={compareIds}
                  onToggleCompare={toggleCompare}
                />
              }
            /> {/**Aqui agrego la ruta compare, osea lo que hace que comparePage se renderize
            Mediante el React Router, que basicamente react lo que hace es interceptar el link
            para poder cambiar de pestaña sin actualizar el navegador */}

            <Route
              path="*"
              element={
                <div className="container mx-auto px-4 py-16 text-center">
                  <h1 className="text-4xl font-bold mb-4">404</h1>
                  <p className="text-muted-foreground mb-6">Página no encontrada</p>
                  <Link to="/" className="text-primary hover:underline">
                    Volver al inicio
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>

        {/* ===================================================================
          FOOTER
          =================================================================== */}
        <footer className="border-t py-6 mt-auto">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>Portal Inmobiliario - Módulo 2 del Curso de Desarrollo Web</p>
            <p className="mt-1">Desarrollado con React 19, Tailwind CSS y Shadcn UI</p>
          </div>
        </footer>
      </div>
    </>
  );
}
export default App;
