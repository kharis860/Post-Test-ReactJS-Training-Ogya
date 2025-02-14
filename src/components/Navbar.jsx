import React from "react";
import { MegaMenu } from "primereact/megamenu";
import { useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";

export default function Navbar() {
  const Navigate = useNavigate();
  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      command: () => Navigate("/"),
    },
    {
      label: "Form",
      icon: "pi pi-file",
      command: () => Navigate("/form"),
    },
    {
      label: "Profil",
      icon: "pi pi-user",
      command: () => Navigate("/profil"),
    },
  ];

  const start = (
    <img
      src="/logo.png"
      height="30px"
      alt="logo"
      className="flex mr-4"
      onClick={() => Navigate("/")}
    />
  );
  const end = (
    <Avatar
      image="/pp.jpg"
      size="large"
      shape="circle"
      onClick={() => Navigate("/profil")}
    />
  );
  return (
    <div className="card">
      <MegaMenu model={items} start={start} breakpoint="960px" end={end} />
    </div>
  );
}
