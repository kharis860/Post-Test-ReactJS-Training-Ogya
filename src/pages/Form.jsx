import React from "react";
import { Fieldset } from "primereact/fieldset";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { Button } from "primereact/button";
import { format } from "date-fns";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import Swal from "sweetalert2";

import useStore from "../Zustand/store";
import Navbar from "../components/Navbar";
import "./Form.css";
import FormTransaction from "../components/FormTransaction";
export default function Form() {
  const { expensesZustand, addData, updateData, deleteData, balance } =
    useStore();
  const [visible, setVisible] = useState(false);
  const [formInput, setFormInput] = useState({
    date: "",
    amount: 0,
    description: "",
    type: "",
  });
  const [expenses, setExpenses] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const options = ["Pengeluaran", "Pemasukan"];
  const buttonBody = (rowData) => (
    <div className="flex gap-4">
      <Button
        severity="success"
        icon="pi pi-pencil"
        onClick={() => {
          setIsEdit(true);
          setVisible(true);
          console.log(rowData);
          setFormInput({ ...rowData, date: new Date(rowData.date) });
        }}
      />
      <Button
        severity="danger"
        icon="pi pi-trash"
        onClick={() => {
          Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
          }).then((result) => {
            if (result.isConfirmed) {
              deleteTransactionData(rowData);
            }
            // if (result.isConfirmed) {
            //   Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
            //   const endBalance = balance - rowData.amount;
            //   updateData(rowData.id, endBalance);
            // }
          });
        }}
      />
    </div>
  );
  const tagBody = (rowData) => (
    <Tag
      value={rowData.type}
      severity={rowData.type === "Pengeluaran" ? "danger" : "success"}
    ></Tag>
  );
  function addTransactionData() {
    console.log(formInput);
    if (
      !formInput.date ||
      !formInput.amount ||
      !formInput.type ||
      !formInput.description
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Form tidak boleh kosong!",
      });
    }
    const newExpense = {
      ...formInput,
      id: expenses.length + 1,
      date: format(new Date(formInput.date), "yyyy-MM-dd"),
    };
    setExpenses([...expenses, newExpense]);
    if (newExpense.type === "Pengeluaran") {
      newExpense.amount = -newExpense.amount;
    }
    const endBalance = balance + newExpense.amount;
    if (newExpense.type === "Pengeluaran") {
      newExpense.amount = -newExpense.amount;
    }
    console.log(newExpense);

    addData(newExpense, endBalance);
    Swal.fire({
      icon: "success",
      title: "Data Berhasil ditambahkan",
      allowOutsideClick: false,
      customClass: {
        container: "my-swal-container",
      },
    }).then((isConfirmed) => {
      if (isConfirmed) {
        setVisible(false);
      }
    });
    setFormInput({
      date: "",
      amount: 0,
      description: "",
      type: "",
    });
  }
  function updateTransactionData(id, updatedExpense) {
    const oldExpense = expensesZustand.find((expense) => expense.id === id);
    console.log(oldExpense);
    console.log(id);
    console.log(updatedExpense);
    const updatedExpenseDateFormated = {
      ...updatedExpense,
      date: format(new Date(updatedExpense.date), "yyyy-MM-dd"),
    };
    console.log("date formated", updatedExpenseDateFormated);

    let balanceAdjustment = 0;
    if (oldExpense.type === "Pengeluaran") {
      balanceAdjustment += oldExpense.amount; // Add back the old expense
    } else {
      balanceAdjustment -= oldExpense.amount; // Remove the old income
    }
    console.log("balanceAdjustment", balanceAdjustment);

    if (updatedExpenseDateFormated.type === "Pengeluaran") {
      balanceAdjustment -= updatedExpenseDateFormated.amount; // Subtract new expense
    } else {
      balanceAdjustment += updatedExpenseDateFormated.amount; // Add new income
    }
    console.log("balanceAdjustment", balanceAdjustment);

    const newBalance = balance + balanceAdjustment;
    updateData(id, updatedExpenseDateFormated, newBalance);
    Swal.fire({
      icon: "success",
      title: "Data Berhasil di-update",
      showConfirmButton: true,
      backdrop: `rgba(0,0,0,0.4)`,
      allowOutsideClick: false,
      customClass: {
        container: "my-swal-container",
      },
    }).then((isConfirmed) => {
      if (isConfirmed) {
        setVisible(false);
      }
    });
    console.log("ini dari zustand", expensesZustand);
    setFormInput({
      date: "",
      amount: 0,
      description: "",
      type: "",
    });
  }
  function deleteTransactionData(data) {
    console.log(data);
    if (data.type === "Pemasukan") {
      data.amount = -data.amount;
    }
    const endBalance = balance + data.amount;
    deleteData(data.id, endBalance);
    Swal.fire({
      icon: "success",
      title: "Data Berhasil dihapus",
      showConfirmButton: true,
      backdrop: `rgba(0,0,0,0.4)`,
      allowOutsideClick: false,
      customClass: {
        container: "my-swal-container",
      },
    }).then((isConfirmed) => {
      if (isConfirmed) {
        setVisible(false);
      }
    });
  }
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (isEdit) {
      updateTransactionData(formInput.id, formInput);
    } else {
      addTransactionData();
    }
  }
  return (
    <div className="flex flex-column min-h-screen">
      <Navbar />
      <div className=" p-4">
        <div className="card flex justify-content-center">
          <Dialog
            header=""
            visible={visible}
            style={{ width: "50vw" }}
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
          >
            <FormTransaction
              handleSubmit={handleSubmit}
              formInput={formInput}
              setFormInput={setFormInput}
              options={options}
            />
          </Dialog>
        </div>
        <div>
          <Fieldset legend="Daftar Transaksi">
            <Button
              label="Tambah Transaksi"
              icon="pi pi-plus"
              className="flex mb-2"
              onClick={() => {
                setIsEdit(false);
                setFormInput({
                  date: "",
                  amount: 0,
                  description: "",
                  type: "",
                });
                setVisible(true);
              }}
            />
            <div>
              <h4>Saldo: {formatRupiah(balance)}</h4>
            </div>
            <DataTable
              value={expensesZustand}
              stripedRows
              scrollable
              scrollHeight="44vh"
            >
              <Column
                field="date"
                header="Tanggal"
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="amount"
                header="Jumlah"
                style={{ width: "15%" }}
                body={(money) => formatRupiah(money.amount)}
              ></Column>
              <Column
                field="description"
                header="Catatan"
                style={{ width: "30%" }}
              ></Column>
              <Column
                field="type"
                header="Transaksi"
                body={tagBody}
                style={{ width: "15%" }}
              ></Column>
              <Column
                header="Aksi"
                body={buttonBody}
                style={{ width: "15%" }}
              ></Column>
            </DataTable>
          </Fieldset>
        </div>
      </div>
    </div>
  );
}
