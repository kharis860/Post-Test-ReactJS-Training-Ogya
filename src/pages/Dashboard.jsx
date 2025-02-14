import React from "react";
import Navbar from "../components/Navbar";
import { Card } from "primereact/card";
import { useState } from "react";
import { Calendar } from "primereact/calendar";
import { Chart } from "primereact/chart";
import { useEffect } from "react";
import useStore from "../Zustand/store";
import ChartDataLabels from "chartjs-plugin-datalabels";
export default function Dashboard() {
  const [date, setDate] = useState({
    month: new Date(),
    firstDay: "",
  });
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const { expensesZustand } = useStore();
  const [expenseData, setExpenseData] = useState(expensesZustand);
  useEffect(() => {
    const dataOutAmount = expenseData.map((item) =>
      item.type === "Pengeluaran" ? item.amount : 0
    );
    const dataInAmount = expenseData.map((item) =>
      item.type === "Pemasukan" ? item.amount : 0
    );
    const totalOutAmount = dataOutAmount.reduce((acc, curr) => acc + curr, 0);
    const totalInAmount = dataInAmount.reduce((acc, curr) => acc + curr, 0);
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Pemasukan", "Pengeluaran"],
      datasets: [
        {
          data: [totalInAmount, totalOutAmount],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--red-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--red-400"),
          ],
        },
      ],
    };
    const options = {
      cutout: "60%",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          reverse: true,
          labels: {
            font: {
              size: 14,
              weight: "bold",
            },
          },
        },
        datalabels: {
          color: "#000000",
          font: {
            weight: "bold",
            size: 14,
          },
          formatter: (value) => {
            return new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value);
          },
          anchor: "center",
          align: "center",
          offset: 0,
        },
      },
    };
    setChartData(data);
    setChartOptions(options);
  }, [expenseData]);
  useEffect(() => {
    const selectedMonth = date.month.getMonth() + 1;
    const filteredData = expensesZustand.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.getMonth() + 1 === selectedMonth;
    });
    setExpenseData(filteredData);
  }, [date.month, expensesZustand]);
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
            <div className="grid w-full">
              <div className="col-12 md:col-6 flex justify-content-center">
                {expenseData.length === 0 ? (
                  <div className="flex flex-column align-items-center justify-content-center p-6">
                    <i className="pi pi-chart-pie text-6xl text-primary mb-2"></i>
                    <h3 className="text-xl text-primary">Tidak ada data</h3>
                    <p className="text-sm ">Belum ada transaksi di bulan ini</p>
                  </div>
                ) : (
                  <Chart
                    type="doughnut"
                    data={chartData}
                    options={chartOptions}
                    className="w-full md:w-30rem flex justify-content-center"
                    style={{ maxHeight: "260px" }}
                    plugins={[ChartDataLabels]}
                  />
                )}
              </div>
              <div className="col-12 md:col-6 flex flex-column justify-content-center align-items-center gap-4">
                <div className="w-6">
                  <label
                    htmlFor="buttondisplay"
                    className="font-bold block text-center mb-2"
                  >
                    Periode Bulan
                  </label>
                  <Calendar
                    id="buttondisplay"
                    value={date.month}
                    onChange={(e) => {
                      setDate({
                        ...date,
                        month: e.value,
                      });
                    }}
                    showIcon
                    view="month"
                    dateFormat="MM"
                    className="p-calendar-sm"
                  />
                </div>
                {/* buat semisal nanti ada pengembangan */}
                {/* <div className="w-6">
                  <label
                    htmlFor="buttondisplay"
                    className="font-bold block text-center mb-2"
                  >
                    Tanggal Awal Bulan
                  </label>
                  <Calendar
                    id="buttondisplay"
                    value={date.firstDay}
                    onChange={(e) => {
                      setDate({
                        ...date,
                        firstDay: e.value.getDate(),
                      });
                    }}
                    showIcon
                    view="date"
                    dateFormat="dd"
                    monthNavigator={false}
                    yearNavigator={false}
                    className="p-calendar-sm"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
