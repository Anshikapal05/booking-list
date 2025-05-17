import { useForm } from "react-hook-form";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LogoutButton from "../components/LogoutButton";

export default function AdminDashboard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [records, setRecords] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false); 

  const fetchRecords = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, "users"));
    setRecords(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true); 
      if (editId) {
        await updateDoc(doc(db, "users", editId), data);
        toast.success("Record updated successfully!");
      } else {
        await addDoc(collection(db, "users"), data);
        toast.success("Record added successfully!");
      }
      reset();
      setEditId(null);
      await fetchRecords();
    } catch (error) {
      toast.error("Something went wrong: " + error.message);
    } finally {
      setSubmitting(false); 
    }
  };

  const deleteRecord = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this record?")) {
        await deleteDoc(doc(db, "users", id));
        toast.info("Record deleted");
        await fetchRecords();
      }
    } catch (error) {
      toast.error("Failed to delete record: " + error.message);
    }
  };

  const editRecord = (record) => {
    reset({
      name: record.name || "",
      address: record.address || "",
      pin: record.pin || "",
      phone: record.phone || ""
    });
    setEditId(record.id);
  };
  

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg mt-20">
      <LogoutButton />
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Admin Dashboard
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            placeholder="Enter full name"
            {...register("name", { required: "Name is required" })}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-600 mt-1 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-gray-700 font-semibold mb-1">
            Address <span className="text-red-600">*</span>
          </label>
          <input
            id="address"
            placeholder="Enter address"
            {...register("address", { required: "Address is required" })}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.address && (
            <p className="text-red-600 mt-1 text-sm">{errors.address.message}</p>
          )}
        </div>

        {/* PIN */}
        <div>
          <label htmlFor="pin" className="block text-gray-700 font-semibold mb-1">
            PIN Code <span className="text-red-600">*</span>
          </label>
          <input
            id="pin"
            placeholder="Enter PIN code"
            {...register("pin", {
              required: "PIN is required",
              pattern: { value: /^\d{6}$/, message: "Invalid PIN code" },
            })}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.pin ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.pin && (
            <p className="text-red-600 mt-1 text-sm">{errors.pin.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-gray-700 font-semibold mb-1">
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            id="phone"
            placeholder="Enter phone number"
            {...register("phone", {
              required: "Phone number is required",
              pattern: { value: /^[0-9]{10}$/, message: "Invalid phone number" },
            })}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="text-red-600 mt-1 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full ${
            submitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } transition text-white font-semibold py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {submitting
            ? "Processing..."
            : editId
            ? "Update Record"
            : "Add Record"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-10 mb-4 text-gray-800">Records</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading records...</p>
      ) : records.length === 0 ? (
        <p className="text-center text-gray-500">No records found. Add some above!</p>
      ) : (
        <div className="space-y-4">
          {records.map((r) => (
            <div
              key={r.id}
              className="flex flex-col md:flex-row justify-between items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="space-y-1 text-gray-700 flex-grow">
                <p><strong>Name:</strong> {r.name}</p>
                <p><strong>Address:</strong> {r.address}</p>
                <p><strong>PIN:</strong> {r.pin}</p>
                <p><strong>Phone:</strong> {r.phone}</p>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => editRecord(r)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow-md transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteRecord(r.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-md transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
