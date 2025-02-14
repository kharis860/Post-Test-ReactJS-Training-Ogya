import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-column align-items-center justify-content-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Halaman tidak ditemukan</h1>
      <p className="text-xl mb-4">Halaman yang Anda cari tidak ada yaa.....</p>
      <Button
        label="Back to Home"
        icon="pi pi-home"
        onClick={() => navigate("/")}
      />
    </div>
  );
}
