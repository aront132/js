import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./presentation/layouts/MainLayout";
import PerfilLayout from "./presentation/layouts/PerfilLayout";
import AdminLayout from "./presentation/layouts/AdminLayout";

import HomePage from "./presentation/pages/HomePage";
import NosotrosPage from "./presentation/pages/NosotrosPage";

import ProductosPage from "./presentation/pages/Producto/ProductosPage";
import ProductoDetallePage from "./presentation/pages/Producto/ProductoDetallePage";

import LoginPage from "./presentation/pages/Auth/LoginPage";
import RegistroPage from "./presentation/pages/Auth/RegistroPage";

import PerfilPage from "./presentation/pages/Cliente/PerfilPage";
import CarritoPage from "./presentation/pages/Cliente/CarritoPage";
import HistorialPage from "./presentation/pages/Cliente/HistorialPage";
import CheckoutPage from "./presentation/pages/Pago/CheckoutPage";

import AdminProductosPage from "./presentation/pages/Admin/AdminProductosPage";
import NotFound from "./presentation/components/NotFound";

import { AuthProvider, useAuth } from "./presentation/hooks/useAuth";
import { CarritoProvider } from "./presentation/hooks/useCarrito";

const RutaProtegida: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { usuario, cargando } = useAuth();
  if (cargando) return <p className="text-center mt-4">Cargando...</p>;
  if (!usuario) return <Navigate to="/auth/login" replace />;
  return children;
};

const RutaAdmin: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { usuario, cargando } = useAuth();
  if (cargando) return <p className="text-center mt-4">Cargando...</p>;
  if (!usuario || usuario.rol !== "admin")
    return <Navigate to="/productos" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Inicio */}
            <Route index element={<HomePage />} />

            {/* Nosotros */}
            <Route path="nosotros" element={<NosotrosPage />} />

            {/* Productos */}
            <Route path="productos" element={<ProductosPage />} />
            <Route path="producto/:id" element={<ProductoDetallePage />} />

            {/* Auth */}
            <Route path="auth">
              <Route path="login" element={<LoginPage />} />
              <Route path="registro" element={<RegistroPage />} />
            </Route>

            {/* Cliente (perfil/carrito/historial) */}
            <Route
              path="cliente"
              element={
                <RutaProtegida>
                  <PerfilLayout />
                </RutaProtegida>
              }
            >
              <Route path="perfil" element={<PerfilPage />} />
              <Route path="carrito" element={<CarritoPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="historial" element={<HistorialPage />} />
            </Route>

            {/* Admin */}
            <Route
              path="admin"
              element={
                <RutaAdmin>
                  <AdminLayout />
                </RutaAdmin>
              }
            >
              <Route path="productos" element={<AdminProductosPage />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
