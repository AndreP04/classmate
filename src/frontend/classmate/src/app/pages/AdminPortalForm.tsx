"use client";
import { useEffect, useState } from "react";
import instance from "@/lib/axios";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

const AdminPortalForm = () => {
  const [educators, setEducators] = useState([]);

  useEffect(() => {
    const fetchEducators = async () => {
      try {
        const { data } = await instance.get("/classmate/admin/all-educators");
        setEducators(data);
      } catch (err) {
        console.error(`Failed to retrieve educators: ${err}`);
      }
    };

    fetchEducators();
  }, []);

  const deleteEducator = async (email: string) => {
    try {
      await instance.delete("/classmate/admin/delete-educator", {
        data: { email }
      });
      setEducators((prev) => prev.filter((user) => user.email !== email));
    } catch (err) {
      console.error(`Failed to delete educator: ${err}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-6 sm:px-12">
      <form className="max-w-7xl mx-auto bg-slate-800 rounded-lg shadow-lg p-8">
        {/* Header and search */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h3 className="text-4xl font-bold tracking-tight">Educators</h3>
          <div className="mt-4 sm:mt-0 w-full sm:w-64 relative">
            <input
              type="text"
              placeholder="Find an educator"
              className="w-full h-10 pl-4 pr-10 rounded-md border border-slate-600 bg-slate-700 placeholder-slate-400 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            <button
              type="button"
              className="absolute top-1.5 right-1.5 h-7 w-7 flex items-center justify-center rounded hover:bg-slate-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 text-slate-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-md bg-slate-700">
          <table className="min-w-full table-auto text-left border-collapse text-slate-100">
            <thead className="bg-slate-600 uppercase text-sm font-semibold text-slate-300">
              <tr>
                <th className="py-3 px-6 border-b border-slate-500">First Name</th>
                <th className="py-3 px-6 border-b border-slate-500">Last Name</th>
                <th className="py-3 px-6 border-b border-slate-500">Email Address</th>
                <th className="py-3 px-6 border-b border-slate-500">Institution</th>
                <th className="py-3 px-6 border-b border-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {educators.map((educator) => (
                <tr key={educator.email} className="border-b border-slate-600">
                  <td className="py-4 px-6">{educator.firstName}</td>
                  <td className="py-4 px-6">{educator.lastName}</td>
                  <td className="py-4 px-6 break-words">{educator.email}</td>
                  <td className="py-4 px-6">{educator.institution}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-3">
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          await deleteEducator(educator.email);
                        }}
                        className="cursor-pointer flex items-center justify-center gap-1 px-3 py-2 bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition text-white font-semibold"
                        title="Delete Educator"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                      <button
                        className=" cursor-pointer flex items-center justify-center gap-1 px-3 py-2 bg-slate-500 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-white font-semibold"
                        title="Edit Educator"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 text-sm text-slate-300">
          <div>
            Showing <b>1-2</b> of 10
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded-md bg-slate-600 hover:bg-slate-700 transition">Prev</button>
            <button className="px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition font-semibold">1</button>
            <button className="px-3 py-1 rounded-md bg-slate-600 hover:bg-slate-700 transition">2</button>
            <button className="px-3 py-1 rounded-md bg-slate-600 hover:bg-slate-700 transition">3</button>
            <button className="px-3 py-1 rounded-md bg-slate-600 hover:bg-slate-700 transition">Next</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminPortalForm;
