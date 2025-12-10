export const getImageUrl = (imgFile: string | undefined) => {
  if (!imgFile) return "https://via.placeholder.com/300x400?text=No+Image";

  // Si es una imagen nueva (Base64) o una URL externa, úsala directamente
  if (imgFile.startsWith("data:") || imgFile.startsWith("http")) {
    return imgFile;
  }

  // Si es una imagen antigua (nombre de archivo en assets), impórtala
  try {
    return new URL(
      `../../../assets/img/Producto/${imgFile}`,
      import.meta.url
    ).href;
  } catch (error) {
    console.error("Error cargando imagen:", error);
    return "https://via.placeholder.com/300x400?text=Error";
  }
};