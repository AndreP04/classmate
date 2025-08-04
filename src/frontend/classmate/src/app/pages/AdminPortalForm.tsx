"use client";
import { useEffect, useState } from "react";
import instance from "@/lib/axios";

const AdminPortalForm = () => {
    const [educators, setEducators] = useState([]);

    // Fetch all educators on page load
    useEffect(() => {
        const fetchEducators = async () => {
            try {
                const { data } = await instance.get('/classmate/admin/all-educators');
                setEducators(data);
            } catch (err) {
                console.error(`Failed to retrieve educators: ${err}`)
            }
        };

        fetchEducators();
    }, []);

    // Delete an educator
    const deleteEducator = async (email: string) => {
        try {
            await instance.delete('/classmate/admin/delete-educator', {
                data: { email }
            });
            setEducators(prev => prev.filter(user => user.email !== email));
        } catch (err) {
            console.error(`Failed to delete educator: ${err}`);
        }
    };

    return (
        <form>
            {/* Table */}
            <div className="w-full flex justify-between items-cente mb-3 mt-1 pl-3">
                <div>
                    <h3 className="text-xl font-semibold text-slate-800">Educators</h3>
                </div>
                <div className="ml-3">
                    <div className="w-full max-w-sm min-w-[200px] relative">
                        <div className="relative">
                            <input
                                className="bg-white w-full pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                placeholder="Find an educator" />
                            <button
                                className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                                type="button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-slate-200 bg-slate-300">
                                <p className="text-sm font-semibold leading-none text-slate-700">
                                    First Name
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-300">
                                <p className="text-sm font-semibold leading-none text-slate-700">
                                    Last Name
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-300">
                                <p className="text-sm font-semibold leading-none text-slate-700">
                                    Email Address
                                </p>
                            </th>
                            <th className="p-4 border-b border-slate-200 bg-slate-300">
                                <p className="text-sm font-semibold leading-none text-slate-700">
                                    Institution
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {educators.map((educator) => (
                            <tr key={educator.email} className="hover:bg-slate-300 border-b border-slate-200">
                                <td className="p-4 py-5">{educator.firstName}</td>
                                <td className="p-4 py-5">{educator.lastName}</td>
                                <td className="p-4 py-5">{educator.email}</td>
                                <td className="p-4 py-5">{educator.institution}</td>
                                <td className="p-4 py-5">
                                    <button
                                        onClick={() => deleteEducator(educator.email)}
                                        className="cursor-pointer text-red-600 hover:bg-red-800 hover:text-white font-semibold border rounded py-2 px-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between items-center px-4 py-3">
                    <div className="text-sm text-slate-700">
                        Showing <b>1-2</b> of 10
                    </div>
                    <div className="flex space-x-1">
                        <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-300 hover:border-slate-400 transition duration-200 ease">
                            Prev
                        </button>
                        <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                            1
                        </button>
                        <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-300 hover:border-slate-400 transition duration-200 ease">
                            2
                        </button>
                        <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-300 hover:border-slate-400 transition duration-200 ease">
                            3
                        </button>
                        <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-300 hover:border-slate-400 transition duration-200 ease">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AdminPortalForm;