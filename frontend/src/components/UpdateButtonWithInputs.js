// import React, { useState } from 'react';

// const UpdateButtonWithInput = ({ tableName, recordId, fields }) => {
//     const [formData, setFormData] = useState(fields || {}); // Prepopulate fields if provided
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleUpdate = async () => {
//         const updateData = {
//             data: formData, // Data to update
//             whereClause: {
//                 ProductID: recordId, // Primary key for identification
//             },
//         };

//         try {
//             setLoading(true);
//             setError(null);
//             setSuccess(false);

//             const response = await fetch(`http://localhost:5000/api/data/${tableName}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(updateData),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to update record');
//             }

//             const result = await response.json();
//             console.log(result);
//             setSuccess(true);
//         } catch (err) {
//             console.error(err);
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="p-4 border rounded shadow-md">
//             <h3 className="font-semibold mb-2">Update Record</h3>
//             <form>
//                 {Object.keys(formData).map((field) => (
//                     <div key={field} className="mb-3">
//                         <label htmlFor={field} className="block text-sm font-medium text-gray-700">
//                             {field}
//                         </label>
//                         <input
//                             type="text"
//                             id={field}
//                             name={field}
//                             value={formData[field]}
//                             onChange={handleChange}
//                             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                         />
//                     </div>
//                 ))}
//             </form>
//             <button
//                 onClick={handleUpdate}
//                 disabled={loading}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//             >
//                 {loading ? 'Updating...' : 'Update'}
//             </button>
//             {success && <p className="text-green-500 mt-2">Record updated successfully!</p>}
//             {error && <p className="text-red-500 mt-2">{error}</p>}
//         </div>
//     );
// };

// export default UpdateButtonWithInput;
