export const getImageUrl = (imgFile: string | undefined) => {
  if (!imgFile) return "https://via.placeholder.com/300x400?text=No+Image";

 
  if (imgFile.startsWith("data:") || imgFile.startsWith("http")) {
    return imgFile;
  }

 
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