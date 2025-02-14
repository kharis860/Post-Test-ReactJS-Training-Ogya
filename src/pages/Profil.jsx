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
              <div className="flex flex-column align-items-center justify-content-center gap-2">
                <Avatar
                  image="/pp.jpg"
                  className="w-8rem h-8rem"
                  shape="circle"
                />
                <h2 className="m-0 font-bold">Kharis Rahmat Hidayat</h2>
                <h3 className="text-sm text-500">Divisi 1 Front End</h3>
                <h3 className="text-sm text-500">PT Ogya Tekno Nusantara</h3>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
