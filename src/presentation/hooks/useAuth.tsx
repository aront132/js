import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Usuario } from "../../domain/usuarios/Usuario";
import AuthRepository from "../../infrastructure/repositories/authRepository";

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  iniciarSesion: (
    correo: string,
    password: string
  ) => Promise<Usuario | null>;
  cerrarSesion: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const guardado = localStorage.getItem("gamevault_usuario");
    if (guardado) setUsuario(JSON.parse(guardado));
    setCargando(false);
  }, []);

  const iniciarSesion = async (correo: string, password: string) => {
    console.log("LLAMANDO A iniciarSesion...", correo, password);
    const encontrado = await AuthRepository.login(correo, password);
    console.log("RESPUESTA DE iniciarSesion:", encontrado);
    if (encontrado) {
      setUsuario(encontrado);
      localStorage.setItem("gamevault_usuario", JSON.stringify(encontrado));
      return encontrado;
    }
    return null;
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem("gamevault_usuario");
  };

  return (
    <AuthContext.Provider
      value={{ usuario, cargando, iniciarSesion, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
