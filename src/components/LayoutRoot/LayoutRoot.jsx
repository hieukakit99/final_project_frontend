import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Dashboard from "../DashBoard/DashBoard";

export default function LayoutRoot() {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <div>
          <Dashboard />
        </div>
        <div style={{ flex: 2 }}>
          <Outlet />{" "}
        </div>
      </div>
    </div>
  );
}
