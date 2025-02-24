import React from "react";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";

export default function FormTransaction({
  handleSubmit,
  formInput,
  setFormInput,
  options,
}) {
  return (
    <>
      <div className="flex flex-column gap-3">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-column gap-4">
            <div className="flex flex-column">
              <label className="mb-2" htmlFor="date">
                Tanggal
              </label>
              <div className="flex-auto">
                <Calendar
                  id="buttondisplay"
                  value={formInput.date}
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      date: e.value,
                    })
                  }
                  showIcon
                  className="w-full"
                  panelStyle={{ fontSize: "0.8rem", width: "200px" }}
                  style={{
                    height: "35px",
                    fontSize: "0.8rem",
                    width: "100%",
                  }}
                  inputStyle={{
                    fontSize: "0.8rem",
                    height: "35px",
                    padding: "0.25rem 0.5rem",
                  }}
                  maxDate={new Date()}
                  required
                />
              </div>
            </div>
            <div className="flex flex-column">
              <label className="mb-2" htmlFor="type">
                Jumlah
              </label>
              <InputNumber
                inputId="integeronly"
                value={formInput.amount}
                onChange={(e) => {
                  setFormInput({
                    ...formInput,
                    amount: e.value,
                  });
                }}
                mode="currency"
                currency="IDR"
                currencyDisplay="code"
                className="w-full"
                minFractionDigits={0}
                maxFractionDigits={0}
                required
              />
            </div>
            <div className="flex flex-column">
              <label className="mb-2" htmlFor="type">
                Catatan
              </label>
              <input
                type="text"
                required
                id="type"
                className="p-inputtext w-full"
                value={formInput.description}
                onChange={(e) => {
                  setFormInput({
                    ...formInput,
                    description: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-column">
              <label className="mb-2" htmlFor="type">
                Jenis
              </label>
              <div className="w-full">
                <SelectButton
                  value={formInput.type}
                  onChange={(e) =>
                    setFormInput({
                      ...formInput,
                      type: e.value,
                    })
                  }
                  options={options}
                  className="w-full"
                  style={{ display: "flex" }}
                  required
                />
              </div>
            </div>
            <div className="card flex justify-content-center">
              <Button label="Submit" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
