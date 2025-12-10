import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Card from "../components/Card"; 
import "./SideMenuLayout.css";

interface SideMenuLink {
  to: string;
  label: string;
  icon: string;
}

interface Props {
  title: string;
  links: SideMenuLink[];
}

const SideMenuLayout: React.FC<Props> = ({ title, links }) => {
  return (
    <div className="container py-5">
      <div className="row">
        <aside className="col-md-3 mb-4">
          <Card>
            <h3 className="mb-4">{title}</h3>
            <div
              className="list-group"
              style={(
                {
                  ["--bs-list-group-bg"]: "var(--surface-color, #1e1e1e)",
                  ["--bs-list-group-border-color"]: "var(--bs-border-color, #333)",
                } as any
              )}
            >
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="list-group-item list-group-item-action"
                >
                  <i className={`bi ${link.icon} me-2`}></i>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </Card>
        </aside>
        <section className="col-md-9">
          <Card>
            <Outlet />
          </Card>
        </section>
      </div>
    </div>
  );
};

export default SideMenuLayout;
