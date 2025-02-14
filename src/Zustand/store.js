import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      expensesZustand: [
        // {
        //   id: 1,
        //   date: "2024-02-13",
        //   type: "Pengeluaran",
        //   description: "Sample Expense",
        //   amount: 50000,
        // },
      ],
      balance: 0,
      addData: (newExpense, endBalance) =>
        set((state) => ({
          expensesZustand: [...state.expensesZustand, newExpense],
          balance: endBalance,
        })),
      updateData: (id, updatedExpense, newBalance) =>
        set((state) => ({
          expensesZustand: state.expensesZustand.map((expense) =>
            expense.id === id ? { ...updatedExpense, id } : expense
          ),
          balance: newBalance,
        })),
      deleteData: (id, endBalance) =>
        set((state) => ({
          expensesZustand: state.expensesZustand.filter(
            (expense) => expense.id !== id
          ),
          balance: endBalance,
        })),
    }),
    {
      name: "expenses-storage",
    }
  )
);

export default useStore;
