import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { CarritoItem } from "../../domain/carrito/CarritoItem";
import { Juego } from "../../domain/juegos/Juego";

interface CarritoContextType {
  items: CarritoItem[];
  agregarAlCarrito: (juego: Juego, cantidad?: number) => void;
  eliminarDelCarrito: (juegoId: string) => void;
  actualizarCantidad: (juegoId: string, cantidad: number) => void;
  vaciarCarrito: () => void;
  total: number;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const CarritoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CarritoItem[]>([]);

  useEffect(() => {
    const guardado = localStorage.getItem("gamevault_carrito");
    if (guardado) setItems(JSON.parse(guardado));
  }, []);

  useEffect(() => {
    localStorage.setItem("gamevault_carrito", JSON.stringify(items));
  }, [items]);

  const agregarAlCarrito = (juego: Juego, cantidad = 1) => {
    setItems(prev => {
      const existe = prev.find(i => i.juego.id === juego.id);

      if (existe) {
        return prev.map(i =>
          i.juego.id === juego.id
            ? { ...i, cantidad: i.cantidad + cantidad }
            : i
        );
      }

      return [...prev, { juego, cantidad }];
    });
  };

  const eliminarDelCarrito = (juegoId: string) => {
    setItems(prev => prev.filter(i => i.juego.id !== juegoId));
  };

  const actualizarCantidad = (juegoId: string, cantidad: number) => {
    setItems(prev =>
      prev
        .map(i => (i.juego.id === juegoId ? { ...i, cantidad } : i))
        .filter(i => i.cantidad > 0)
    );
  };

  const vaciarCarrito = () => setItems([]);

  const total = items.reduce(
    (acc, item) => acc + item.cantidad * item.juego.precio,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        items,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        vaciarCarrito,
        total,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = (): CarritoContextType => {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return ctx;
};
