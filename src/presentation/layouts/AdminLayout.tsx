import SideMenuLayout from "./SideMenuLayout";

const adminLinks = [
  { to: "/admin/productos", label: "Productos", icon: "bi-box-seam" },
  
];

const AdminLayout = () => {
  return <SideMenuLayout title="Panel de Admin" links={adminLinks} />;
};

export default AdminLayout;