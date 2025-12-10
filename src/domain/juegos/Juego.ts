

export interface Juego {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  stock: number;
  plataforma: string;
  genero: string;   
  desarrollador: string;
  lanzamiento: string; 
  imgFile: string;
  destacado: boolean;
}