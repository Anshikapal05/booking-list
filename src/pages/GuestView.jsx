import { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import LogoutButton from "../components/LogoutButton";

export default function GuestView() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "users"));
      setRecords(snap.docs.map((doc) => doc.data()));
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Guest View</h1>
          <LogoutButton />
        </div>

        {loading ? (
          <p className="text-gray-500 text-center py-10">Loading records...</p>
        ) : records.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No records available.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {records.map((r, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-blue-50 border border-blue-100 p-5 rounded-lg shadow hover:shadow-md transition-all duration-300"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=0D8ABC&color=fff`}
                  alt="Profile"
                  className="w-12 h-12 rounded-full shadow-md"
                />
                <div>
                  <p className="text-lg font-semibold text-blue-800">{r.name}</p>
                  <p className="text-gray-700 mt-1">
                    <strong>Phone:</strong> {r.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
