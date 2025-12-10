import SideMenuLayout from "./SideMenuLayout";

const profileLinks = [
  {
    to: "/cliente/perfil",
    label: "Datos personales",
    icon: "bi-person",
  },
  {
    to: "/cliente/carrito",
    label: "Carrito",
    icon: "bi-cart3",
  },
  {
    to: "/cliente/historial",
    label: "Historial de compras",
    icon: "bi-receipt-cutoff",
  },
];

const PerfilLayout = () => {
  return <SideMenuLayout title="Mi Perfil" links={profileLinks} />;
};

export default PerfilLayout;
