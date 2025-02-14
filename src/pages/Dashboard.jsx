import React from "react";
import Navbar from "../components/Navbar";
import { Card } from "primereact/card";
import { useState } from "react";
import { Calendar } from "primereact/calendar";
import { Chart } from "primereact/chart";
import { useEffect } from "react";
import useStore from "../Zustand/store";

export default function Dashboard() {
  const [date, setDate] = useState(null);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const { expensesZustand } = useStore();
  useEffect(() => {
    // console.log(expensesZustand);
    const dataOutAmount = expensesZustand.map((item) =>
      item.type === "Pengeluaran" ? item.amount : 0
    );
    const dataInAmount = expensesZustand.map((item) =>
      item.type === "Pemasukan" ? item.amount : 0
    );
    const totalOutAmount = dataOutAmount.reduce((acc, curr) => acc + curr, 0);
    const totalInAmount = dataInAmount.reduce((acc, curr) => acc + curr, 0);
    console.log(totalOutAmount);
    console.log(totalInAmount);

    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Pemasukan", "Pengeluaran"],
      datasets: [
        {
          data: [totalInAmount, totalOutAmount],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            // documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            // documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
          ],
        },
      ],
    };
    const options = {
      cutout: "60%",
    };

    setChartData(data);
    setChartOptions(options);
  }, [expensesZustand]);
  return (
    <div className="flex flex-column min-h-screen">
      <Navbar />
      <div
        className="flex justify-content-center align-items-center p-4"
        style={{ flex: 1 }}
      >
        <Card className="w-8 ">
          <div className="flex flex-column align-items-center gap-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary m-0">
                Aplikasi Pencatatan Keuangan Anak Kos
              </h1>
              <h2 className="text-xl font-bold text-primary m-4">
                Welcome, Kharis
              </h2>
            </div>
            <div>
              <div className="flex-auto">
                <label
                  htmlFor="buttondisplay"
                  className="font-bold block text-center mb-2"
                >
                  Tanggal Awal Bulan
                </label>
                <Calendar
                  id="buttondisplay"
                  value={date}
                  onChange={(e) => setDate(e.value)}
                  showIcon
                  view="date"
                  dateFormat="dd"
                  monthNavigator={false}
                  yearNavigator={false}
                />
              </div>
            </div>
            <div className="card flex justify-content-center">
              <Chart
                type="doughnut"
                data={chartData}
                options={chartOptions}
                className="w-full md:w-30rem"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
