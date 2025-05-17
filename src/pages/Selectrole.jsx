// import { useNavigate } from 'react-router-dom';
// import LogoutButton from '../components/LogoutButton';

// export default function SelectRole() {
//   const navigate = useNavigate();

//   return (
//     <div className="h-screen flex flex-col items-center justify-center gap-4">
//       <LogoutButton />
//       <h2 className="text-xl font-bold">Select Your Role</h2>
//       <button onClick={() => navigate('/admin')} className="bg-green-600 text-white px-5 py-2 rounded">Admin</button>
//       <button onClick={() => navigate('/guest')} className="bg-gray-700 text-white px-5 py-2 rounded">Guest</button>
//     </div>
//   );
// }

import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import { UserCircle2, ShieldCheck, Eye } from 'lucide-react';

export default function SelectRole() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 bg-gray-100 px-4">
      <div className="absolute top-4 right-4">
        <LogoutButton />
      </div>

      <div className="text-center">
        <UserCircle2 size={48} className="mx-auto text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Your Role</h2>
        <p className="text-gray-600">Please choose how you want to access the application.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition"
        >
          <ShieldCheck size={20} />
          Admin Dashboard
        </button>

        <button
          onClick={() => navigate('/guest')}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg shadow transition"
        >
          <Eye size={20} />
          Guest View
        </button>
      </div>
    </div>
  );
}

