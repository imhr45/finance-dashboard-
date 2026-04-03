import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { v4 as uuidv4 } from "uuid";

const AddTransactionForm = ({
  onClose,
  editData
}) => {

  const {
    transactions,
    setTransactions
  } = useContext(AppContext);

  // ✅ initialize from editData directly
  const [formData, setFormData] =
    useState(() => ({

      date: editData?.date || "",
      category: editData?.category || "",
      amount: editData?.amount || "",
      type: editData?.type || "expense"

    }));


  // ✅ Only update when editData exists
  useEffect(() => {

    if (editData) {

      console.log(
        "EditData received:",
        editData
      );

      setFormData({

        date: editData.date,
        category: editData.category,
        amount: editData.amount,
        type: editData.type

      });

    }

  }, [editData]);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    if (editData) {

      // ✅ UPDATE
      setTransactions(prev =>
        prev.map(t =>
          t.id === editData.id
            ? {
                ...t,
                ...formData,
                amount: Number(formData.amount)
              }
            : t
        )
      );

    } else {

      // ✅ ADD
      const newTransaction = {

        id: uuidv4(),

        ...formData,

        amount: Number(formData.amount)

      };

      setTransactions(prev => [

        ...prev,

        newTransaction

      ]);

    }

    onClose();

  };


  return (

    <>
      {/* Overlay */}

      <div
        className="fixed inset-0 bg-black/40 z-50"
        onClick={onClose}
      />

      {/* Modal */}

      <div className="fixed inset-0 flex items-center justify-center z-50">

        <div className="bg-white p-6 rounded-lg shadow-lg w-[320px]">

          <h2 className="font-bold text-lg mb-4 text-center">

            {editData
              ? "Edit Transaction"
              : "Add Transaction"}

          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="border p-2 mb-3 w-full rounded"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              required
              value={formData.category}
              onChange={handleChange}
              className="border p-2 mb-3 w-full rounded"
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              required
              value={formData.amount}
              onChange={handleChange}
              className="border p-2 mb-3 w-full rounded"
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-2 mb-4 w-full rounded"
            >

              <option value="expense">
                Expense
              </option>

              <option value="income">
                Income
              </option>

            </select>

            <div className="flex justify-between">

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >

                {editData
                  ? "Update"
                  : "Add"}

              </button>

              <button
                type="button"
                onClick={onClose}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >

                Cancel

              </button>

            </div>

          </form>

        </div>

      </div>

    </>

  );

};

export default AddTransactionForm;