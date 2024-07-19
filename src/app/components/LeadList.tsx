// "use client";
// import { useState, useEffect, SetStateAction } from "react";
// import { db } from "../firebaseConfig";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import {
//   FaEdit,
//   FaTrash,
//   FaInstagram,
//   FaFacebook,
//   FaLinkedin,
//   FaCheck,
//   FaTimes,
// } from "react-icons/fa";
// // import { format } from "date-fns";

// const LeadList = () => {
//   const [leads, setLeads] = useState([]);
//   const [newLead, setNewLead] = useState({
//     name: "",
//     companyName: "",
//     service: "",
//     budget: "",
//     comments: "",
//     mobile: "",
//     followUpDate: "",
//     leadSource: "",
//     email: "",
//     instagram: "",
//     facebook: "",
//     linkedin: "",
//     status: "", // New status field
//   });
//   const [editingLeadId, setEditingLeadId] = useState(null);
//   const [confirmDeleteId, setConfirmDeleteId] = useState(null);

//   useEffect(() => {
//     const fetchLeads = async () => {
//       const leadsCollection = await getDocs(collection(db, "leads"));
//       setLeads(
//         leadsCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
//       );
//     };
//     fetchLeads();
//   }, []);

//   const handleAddLead = async () => {
//     await addDoc(collection(db, "leads"), newLead);
//     setNewLead({
//       name: "",
//       companyName: "",
//       service: "",
//       budget: "",
//       comments: "",
//       mobile: "",
//       followUpDate: "",
//       leadSource: "",
//       email: "",
//       instagram: "",
//       facebook: "",
//       linkedin: "",
//       status: "", // Clear status after adding
//     });
//     // Fetch leads again to update the list
//     const leadsCollection = await getDocs(collection(db, "leads"));
//     setLeads(
//       leadsCollection.docs.map((doc: { data: () => any; id: any }) => ({
//         ...doc.data(),
//         id: doc.id,
//       }))
//     );
//   };

//   const handleEditLead = (lead) => {
//     setNewLead(lead);
//     setEditingLeadId(lead.id);
//   };

//   const handleUpdateLead = async () => {
//     const leadDoc = doc(db, "leads", editingLeadId);
//     await updateDoc(leadDoc, newLead);
//     setNewLead({
//       name: "",
//       companyName: "",
//       service: "",
//       budget: "",
//       comments: "",
//       mobile: "",
//       followUpDate: "",
//       leadSource: "",
//       email: "",
//       instagram: "",
//       facebook: "",
//       linkedin: "",
//       status: "", // Clear status after updating
//     });
//     setEditingLeadId(null);
//     // Fetch leads again to update the list
//     const leadsCollection = await getDocs(collection(db, "leads"));
//     setLeads(
//       leadsCollection.docs.map((doc: { data: () => any; id: any }) => ({
//         ...doc.data(),
//         id: doc.id,
//       }))
//     );
//   };

//   const handleDeleteLead = async (id: SetStateAction<null>) => {
//     setConfirmDeleteId(id); // Set the id to confirm deletion
//   };

//   const confirmDeleteLead = async () => {
//     await deleteDoc(doc(db, "leads", confirmDeleteId));
//     setConfirmDeleteId(null); // Reset confirm delete id
//     // Fetch leads again to update the list
//     const leadsCollection = await getDocs(collection(db, "leads"));
//     setLeads(
//       leadsCollection.docs.map((doc: { data: () => any; id: any }) => ({
//         ...doc.data(),
//         id: doc.id,
//       }))
//     );
//   };

//   const cancelDeleteLead = () => {
//     setConfirmDeleteId(null); // Reset confirm delete id without deleting
//   };

//   const toggleStatus = async (leadId: any) => {
//     const lead = leads.find((lead) => lead.id === leadId);
//     const updatedStatus = lead.status === "complete" ? "" : "complete";
//     await updateDoc(doc(db, "leads", leadId), { status: updatedStatus });
//     // Fetch leads again to update the list
//     const leadsCollection = await getDocs(collection(db, "leads"));
//     setLeads(
//       leadsCollection.docs.map((doc: { data: () => any; id: any }) => ({
//         ...doc.data(),
//         id: doc.id,
//       }))
//     );
//   };

//   const [systemDate, setSystemDate] = useState(new Date()); // State to hold current system date

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSystemDate(new Date()); // Update system date every second (can be adjusted)
//     }, 1000);

//     return () => clearInterval(interval); // Cleanup interval
//   }, []);

//   // Function to check if followUpDate matches current system date
//   const isSameDateAsSystem = (followUpDate: string | number | Date) => {
//     const formattedFollowUpDate = new Date(followUpDate);
//     return (
//       formattedFollowUpDate.getDate() === systemDate.getDate() &&
//       formattedFollowUpDate.getMonth() === systemDate.getMonth() &&
//       formattedFollowUpDate.getFullYear() === systemDate.getFullYear()
//     );
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div
//         className="w-auto h-[40vh] flex items-center justify-center relative"
//         style={{
//           background:
//             "url(/images/serviceHero.jpg) no-repeat center center fixed",
//           backgroundSize: "cover",
//         }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="relative text-center text-white mx-24">
//           <h1 className="text-4xl py-8 font-bold">
//             Transform Leads into Loyal Clients – Effortlessly!
//           </h1>
//         </div>
//       </div>
//       <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md text-black">
//         <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
//           Add / Update Lead
//         </h2>
//         <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           <input
//             type="text"
//             placeholder="Name"
//             value={newLead.name}
//             onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
//             className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           <input
//             type="text"
//             placeholder="Company Name"
//             value={newLead.companyName}
//             onChange={(e) =>
//               setNewLead({ ...newLead, companyName: e.target.value })
//             }
//             className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           <input
//             type="text"
//             placeholder="Service"
//             value={newLead.service}
//             onChange={(e) =>
//               setNewLead({ ...newLead, service: e.target.value })
//             }
//             className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           <input
//             type="text"
//             placeholder="Budget"
//             value={newLead.budget}
//             onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
//             className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           <input
//             type="text"
//             placeholder="Comments"
//             value={newLead.comments}
//             onChange={(e) =>
//               setNewLead({ ...newLead, comments: e.target.value })
//             }
//             className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           <input
//             type="text"
//             placeholder="Mobile"
//             value={newLead.mobile}
//             onChange={(e) => setNewLead({ ...newLead, mobile: e.target.value })}
//             className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           <input
//             type="date"
//             placeholder="Follow Up Date"
//             value={newLead.followUpDate}
//             onChange={(e) =>
//               setNewLead({ ...newLead, followUpDate: e.target.value })
//             }
//             className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           <input
//             type="text"
//             placeholder="Lead Source"
//             value={newLead.leadSource}
//             onChange={(e) =>
//               setNewLead({ ...newLead, leadSource: e.target.value })
//             }
//             className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={newLead.email}
//             onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
//             className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           <input
//             type="text"
//             placeholder="Instagram"
//             value={newLead.instagram}
//             onChange={(e) =>
//               setNewLead({ ...newLead, instagram: e.target.value })
//             }
//             className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           <input
//             type="text"
//             placeholder="Facebook"
//             value={newLead.facebook}
//             onChange={(e) =>
//               setNewLead({ ...newLead, facebook: e.target.value })
//             }
//             className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//           <input
//             type="text"
//             placeholder="LinkedIn"
//             value={newLead.linkedin}
//             onChange={(e) =>
//               setNewLead({ ...newLead, linkedin: e.target.value })
//             }
//             className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//         </div>
//         <div className="mt-6 flex justify-center">
//           {editingLeadId ? (
//             <button
//               onClick={handleUpdateLead}
//               className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out"
//             >
//               Update Lead
//             </button>
//           ) : (
//             <button
//               onClick={handleAddLead}
//               className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
//             >
//               Add Lead
//             </button>
//           )}
//         </div>
//       </div>

//       <h2 className="text-2xl font-bold mt-8 mb-4">Leads</h2>
//       <table className="min-w-full bg-white mt-6 rounded-lg shadow-md overflow-hidden">
//         <thead className="bg-gray-800 text-white">
//           <tr>
//             <th className="py-3 px-4 text-sm md:text-base">Name</th>
//             <th className="py-3 px-4 text-sm md:text-base">Company Name</th>
//             <th className="py-3 px-4 text-sm md:text-base">Service</th>
//             <th className="py-3 px-4 text-sm md:text-base">Budget</th>
//             <th className="py-3 px-4 text-sm md:text-base">Comments</th>
//             <th className="py-3 px-4 text-sm md:text-base">Mobile</th>
//             <th className="py-3 px-4 text-sm md:text-base">Follow-Up Date</th>
//             <th className="py-3 px-4 text-sm md:text-base">Lead Source</th>
//             <th className="py-3 px-4 text-sm md:text-base">Email</th>
//             <th className="py-3 px-4 text-sm md:text-base">Socials</th>
//             <th className="py-3 px-4 text-sm md:text-base">Status</th>
//             <th className="py-3 px-4 text-sm md:text-base">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leads.map((lead) => (
//             <tr
//               key={lead.id}
//               className="bg-gray-100 text-black text-center hover:bg-gray-200 transition duration-200 ease-in-out"
//             >
//               <td className="border-t px-4 py-2 text-sm md:text-base">
//                 {lead.name}
//               </td>
//               <td className="border-t px-4 py-2 text-sm md:text-base">
//                 {lead.companyName}
//               </td>
//               <td className="border-t px-4 py-2 text-sm md:text-base">
//                 {lead.service}
//               </td>
//               <td className="border-t px-4 py-2 text-sm md:text-base">
//                 {lead.budget}
//               </td>
//               <td className="border-t px-4 py-2 text-sm md:text-base">
//                 {lead.comments}
//               </td>
//               <td className="border-t px-4 py-2 text-sm md:text-base">
//                 {lead.mobile}
//               </td>
//               <td
//                 className={`border-t px-4 py-2 text-sm md:text-base ${
//                   isSameDateAsSystem(lead.followUpDate) ? "bg-green-300" : ""
//                 }`}
//               >
//                 {lead.followUpDate}
//               </td>
//               <td className="border-t px-4 py-2 text-sm md:text-base">
//                 {lead.leadSource}
//               </td>
//               <td className="border-t px-4 py-2 text-sm md:text-base">
//                 {lead.email}
//               </td>
//               <td className="border-t px-4 py-2 text-sm md:text-base">
//                 {lead.instagram && (
//                   <a
//                     href={`https://www.instagram.com/${lead.instagram}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-600 hover:text-gray-900 transition duration-300"
//                   >
//                     <FaInstagram />
//                   </a>
//                 )}
//                 {lead.facebook && (
//                   <a
//                     href={`https://www.facebook.com/${lead.facebook}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-600 hover:text-gray-900 transition duration-300"
//                   >
//                     <FaFacebook />
//                   </a>
//                 )}
//                 {lead.linkedin && (
//                   <a
//                     href={`https://www.linkedin.com/in/${lead.linkedin}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-600 hover:text-gray-900 transition duration-300"
//                   >
//                     <FaLinkedin />
//                   </a>
//                 )}
//               </td>
//               <td className="border-t px-4 py-2 text-sm md:text-base">
//                 {lead.status === "complete" ? (
//                   <FaCheck
//                     className="text-green-500 cursor-pointer"
//                     onClick={() => toggleStatus(lead.id)}
//                   />
//                 ) : (
//                   <FaTimes
//                     className="text-red-500 cursor-pointer"
//                     onClick={() => toggleStatus(lead.id)}
//                   />
//                 )}
//               </td>
//               <td className="border-t px-4 py-2 flex justify-center items-center space-x-1 md:space-x-2">
//                 <button
//                   onClick={() => handleEditLead(lead)}
//                   className="bg-blue-500 text-white p-1 md:p-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   onClick={() => handleDeleteLead(lead.id)}
//                   className="bg-red-500 text-white p-1 md:p-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
//                 >
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Confirmation Modal */}
//       {confirmDeleteId && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <p className="text-xl text-gray-800 mb-4">
//               Are you sure you want to delete this lead?
//             </p>
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={confirmDeleteLead}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
//               >
//                 Yes
//               </button>
//               <button
//                 onClick={cancelDeleteLead}
//                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeadList;

"use client";
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  FaEdit,
  FaTrash,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({
    name: "",
    companyName: "",
    service: "",
    budget: "",
    comments: "",
    mobile: "",
    followUpDate: "",
    leadSource: "",
    email: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    status: "", // New status field
  });
  const [editingLeadId, setEditingLeadId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      const leadsCollection = await getDocs(collection(db, "leads"));
      setLeads(
        leadsCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    fetchLeads();
  }, []);

  const handleAddLead = async () => {
    await addDoc(collection(db, "leads"), newLead);
    setNewLead({
      name: "",
      companyName: "",
      service: "",
      budget: "",
      comments: "",
      mobile: "",
      followUpDate: "",
      leadSource: "",
      email: "",
      instagram: "",
      facebook: "",
      linkedin: "",
      status: "", // Clear status after adding
    });
    // Fetch leads again to update the list
    const leadsCollection = await getDocs(collection(db, "leads"));
    setLeads(
      leadsCollection.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const handleEditLead = (lead) => {
    setNewLead(lead);
    setEditingLeadId(lead.id);
  };

  const handleUpdateLead = async () => {
    const leadDoc = doc(db, "leads", editingLeadId);
    await updateDoc(leadDoc, newLead);
    setNewLead({
      name: "",
      companyName: "",
      service: "",
      budget: "",
      comments: "",
      mobile: "",
      followUpDate: "",
      leadSource: "",
      email: "",
      instagram: "",
      facebook: "",
      linkedin: "",
      status: "", // Clear status after updating
    });
    setEditingLeadId(null);
    // Fetch leads again to update the list
    const leadsCollection = await getDocs(collection(db, "leads"));
    setLeads(
      leadsCollection.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const handleDeleteLead = (id) => {
    setConfirmDeleteId(id); // Set the id to confirm deletion
  };

  const confirmDeleteLead = async () => {
    await deleteDoc(doc(db, "leads", confirmDeleteId));
    setConfirmDeleteId(null); // Reset confirm delete id
    // Fetch leads again to update the list
    const leadsCollection = await getDocs(collection(db, "leads"));
    setLeads(
      leadsCollection.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const cancelDeleteLead = () => {
    setConfirmDeleteId(null); // Reset confirm delete id without deleting
  };

  const toggleStatus = async (leadId) => {
    const lead = leads.find((lead) => lead.id === leadId);
    const updatedStatus = lead.status === "complete" ? "" : "complete";
    await updateDoc(doc(db, "leads", leadId), { status: updatedStatus });
    // Fetch leads again to update the list
    const leadsCollection = await getDocs(collection(db, "leads"));
    setLeads(
      leadsCollection.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  const [systemDate, setSystemDate] = useState(new Date()); // State to hold current system date

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemDate(new Date()); // Update system date every second (can be adjusted)
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  // Function to check if followUpDate matches current system date
  const isSameDateAsSystem = (followUpDate) => {
    const formattedFollowUpDate = new Date(followUpDate);
    return (
      formattedFollowUpDate.getDate() === systemDate.getDate() &&
      formattedFollowUpDate.getMonth() === systemDate.getMonth() &&
      formattedFollowUpDate.getFullYear() === systemDate.getFullYear()
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div
        className="w-auto h-[40vh] flex items-center justify-center relative"
        style={{
          background:
            "url(/images/serviceHero.jpg) no-repeat center center fixed",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center text-white mx-24">
          <h1 className="text-4xl py-8 font-bold">
            Transform Leads into Loyal Clients – Effortlessly!
          </h1>
        </div>
      </div>
      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md text-black">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
          Add / Update Lead
        </h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <input
            type="text"
            placeholder="Name"
            value={newLead.name}
            onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
            className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Company Name"
            value={newLead.companyName}
            onChange={(e) =>
              setNewLead({ ...newLead, companyName: e.target.value })
            }
            className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Service"
            value={newLead.service}
            onChange={(e) =>
              setNewLead({ ...newLead, service: e.target.value })
            }
            className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Budget"
            value={newLead.budget}
            onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
            className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Comments"
            value={newLead.comments}
            onChange={(e) =>
              setNewLead({ ...newLead, comments: e.target.value })
            }
            className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Mobile"
            value={newLead.mobile}
            onChange={(e) => setNewLead({ ...newLead, mobile: e.target.value })}
            className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="date"
            placeholder="Follow Up Date"
            value={newLead.followUpDate}
            onChange={(e) =>
              setNewLead({ ...newLead, followUpDate: e.target.value })
            }
            className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Lead Source"
            value={newLead.leadSource}
            onChange={(e) =>
              setNewLead({ ...newLead, leadSource: e.target.value })
            }
            className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={newLead.email}
            onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
            className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Instagram"
            value={newLead.instagram}
            onChange={(e) =>
              setNewLead({ ...newLead, instagram: e.target.value })
            }
            className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Facebook"
            value={newLead.facebook}
            onChange={(e) =>
              setNewLead({ ...newLead, facebook: e.target.value })
            }
            className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="LinkedIn"
            value={newLead.linkedin}
            onChange={(e) =>
              setNewLead({ ...newLead, linkedin: e.target.value })
            }
            className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <select
            value={newLead.status}
            onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
            className="border rounded-lg p-3 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select Status</option>
            <option value="in progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        <div className="text-center mt-4">
          {editingLeadId ? (
            <button
              onClick={handleUpdateLead}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out"
            >
              Update Lead
            </button>
          ) : (
            <button
              onClick={handleAddLead}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Lead
            </button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Lead List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg text-gray-800 border border-black">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-300">Name</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">
                  Company Name
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300">
                  Service
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300">Budget</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">
                  Comments
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300">Mobile</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">
                  Follow Up Date
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300">
                  Lead Source
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300">Email</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">
                  Instagram
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300">
                  Facebook
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300">
                  LinkedIn
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300">Status</th>
                <th className="py-2 px-4 border-b-2 border-gray-300">
                  Actions
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300">
                  Mark Status
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className={`${
                    isSameDateAsSystem(lead.followUpDate)
                      ? "bg-white text-black"
                      : ""
                  }`}
                >
                  <td className="py-2 px-4 border-b">{lead.name}</td>
                  <td className="py-2 px-4 border-b">{lead.companyName}</td>
                  <td className="py-2 px-4 border-b">{lead.service}</td>
                  <td className="py-2 px-4 border-b">{lead.budget}</td>
                  <td className="py-2 px-4 border-b">{lead.comments}</td>
                  <td className="py-2 px-4 border-b">{lead.mobile}</td>
                  <td
                    className={`border-t px-4 py-2 text-sm md:text-base ${
                      isSameDateAsSystem(lead.followUpDate)
                        ? "bg-green-300"
                        : ""
                    }`}
                  >
                    {lead.followUpDate}
                  </td>
                  <td className="py-2 px-4 border-b">{lead.leadSource}</td>
                  <td className="py-2 px-4 border-b">{lead.email}</td>
                  <td className="py-2 px-12 border-b">
                    {lead.instagram && (
                      <a
                        href={`https://www.instagram.com/${lead.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition duration-300"
                      >
                        <FaInstagram />
                      </a>
                    )}
                  </td>
                  <td className="py-2 px-12 border-b">
                    {lead.facebook && (
                      <a
                        href={`https://www.facebook.com/${lead.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition duration-300"
                      >
                        <FaFacebook />
                      </a>
                    )}
                  </td>
                  <td className="py-2 px-12 border-b">
                    {lead.linkedin && (
                      <a
                        href={`https://www.linkedin.com/in/${lead.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition duration-300"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {lead.status === "complete" ? (
                      <span className="text-green-500 font-bold">Complete</span>
                    ) : (
                      <span className="text-red-500 font-bold">
                        In Progress
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button onClick={() => handleEditLead(lead)}>
                      <FaEdit className="text-blue-500" />
                    </button>
                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      className="ml-2"
                    >
                      <FaTrash className="text-red-500" />
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => toggleStatus(lead.id)}
                      className="mr-2"
                    >
                      {lead.status === "complete" ? (
                        <FaTimes className="text-red-500" />
                      ) : (
                        <FaCheck className="text-green-500" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {confirmDeleteId && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-black">
                Are you sure you want to delete this lead?
              </h2>
              <div className="flex justify-around">
                <button
                  onClick={confirmDeleteLead}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Confirm
                </button>
                <button
                  onClick={cancelDeleteLead}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadList;
