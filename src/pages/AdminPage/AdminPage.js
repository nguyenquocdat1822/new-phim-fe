import AdminComponent from "../../components/AdminComponent/AdminComponent";
import AdminHeader from "../../layouts/headers/adminHeader/AdminHeader";

function AdminPage() {
  return (
    <div className="admin-page_container">
      <AdminHeader />
      <AdminComponent />
    </div>
  );
}

export default AdminPage;
