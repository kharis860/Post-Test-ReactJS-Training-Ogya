import React from "react";
import Navbar from "../components/Navbar";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
export default function Profil() {
  return (
    <div>
      <Navbar />
      <div>
        <div
          className="flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <div className="card " style={{ width: "25rem" }}>
            <Card title="User Profil">
              <div className="flex flex-column align-items-center justify-content-center gap-3">
                <Avatar image="/pp.jpg" size="xlarge" shape="circle" />
                <h2 className="m-0 font-bold">Kharis Rahmat Hidayat</h2>
                <p className="text-sm text-500">Kharisrahmat686@gmail.com</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
