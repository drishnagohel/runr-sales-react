import React, { useState, useEffect } from "react";
// import MasterLayout from "../../../components/layout/MasterLayout";
import Pagination from "../../components/Pagination";
import {
  getAllCreator,
  addCreator,
  updateCreator,
  deleteCreator,
} from "../../api";
import { getDateTab } from "../../utils.jsx";
// import { getDateTab } from "../../utils.jsx";
import Swal from "sweetalert2";



export default function CreatorTable() {
  const [Budget, setBudget] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalCount, setTotalCount] = useState(0);

  // Sidebar state
  const [activeSidebar, setActiveSidebar] = useState({ type: "", data: null });

  // Form state
  const [creatorForm, setCreatorForm] = useState({
    name: "",
    mobile: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchBudget();
  }, [currentPage, search]);

  const fetchBudget = async () => {
    setLoading(true);
    try {
      const offset = (currentPage - 1) * itemsPerPage;
      const result = await getAllCreator(offset, itemsPerPage, search);

      if (result?.status && Array.isArray(result.data)) {
        setBudget(result.data);
        setTotalCount(result.count || 0);
      } else {
        setBudget([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.error("Error fetching Budget:", error);
      setBudget([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // -------------------------
  // Form Handlers
  // -------------------------
  const handleChange = (e) => {
    setCreatorForm({ ...creatorForm, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateField = (name, value) => {
    let message = "";
    if (name === "name" && !value.trim()) message = "This field is required";
    if (name === "mobile") {
      if (!value.trim()) message = "This field is required";
      else if (!/^\d{10}$/.test(value))
        message = "Enter a valid 10-digit mobile number";
    }
    if (name === "email") {
      if (!value.trim()) message = "This field is required";
      else if (!/\S+@\S+\.\S+/.test(value)) message = "Enter a valid email";
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
    return message === "";
  };

  const validateForm = () => {
    const isNameValid = validateField("name", creatorForm.name);
    const isMobileValid = validateField("mobile", creatorForm.mobile);
    const isEmailValid = validateField("email", creatorForm.email);
    return isNameValid && isMobileValid && isEmailValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (activeSidebar.type === "add") {
        const result = await addCreator({
          creator_name: creatorForm.name,
          creator_mobile: creatorForm.mobile,
          creator_email: creatorForm.email,
        });
        if (result?.status) {
          Swal.fire({
            icon: "success",
            title: "Creator added successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          alert(result?.message || "Failed to add creator.");
        }
      } else if (activeSidebar.type === "edit" && activeSidebar.data) {
        const result = await updateCreator({
          creator_id: activeSidebar.data.creator_id,
          creator_name: creatorForm.name,
          creator_mobile: creatorForm.mobile,
          creator_email: creatorForm.email,
        });
        if (result?.status) {
          Swal.fire({
            icon: "success",
            title: "Creator updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          alert(result?.message || "Failed to update creator.");
        }
      }

      setActiveSidebar({ type: "", data: null });
      setCreatorForm({ name: "", mobile: "", email: "" });
      fetchBudget();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong.");
    }
  };

  // -------------------------
  // Row Component
  // -------------------------
  const BudgetRow = ({ project }) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleDelete = async () => {
      try {
        const result = await deleteCreator({ creator_id: project.creator_id });
        if (result.status === 200) {
          fetchBudget();
          setIsDeleteOpen(false);
        } else alert("Failed to delete budget.");
      } catch (error) {
        console.error("Error deleting budget:", error);
      }
    };

    return (
      <>
        {/* Table Row */}
        <tr className="border-b dark:border-gray-700">
          <td className="px-4 py-2">{project.creator_id}</td>
          <td className="px-4 py-2">{project.creator_name}</td>
          <td className="px-4 py-2">{project.creator_mobile}</td>
          <td className="px-4 py-2">{project.creator_email}</td>
          <td className="px-4 py-2">
            <div className="flex flex-col gap-1">
              {getDateTab(project.created_at, "Created At")}
              {getDateTab(project.updated_at, "Updated At")}
            </div>
          </td>
          <td className="px-4 py-2">
            <div className="flex items-center gap-3">
              {/* Edit Button */}
              <button
                onClick={() => {
                  setActiveSidebar({ type: "edit", data: project });
                  setCreatorForm({
                    name: project.creator_name,
                    mobile: project.creator_mobile,
                    email: project.creator_email,
                  });
                  setErrors({});
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
                  <path d="M13.5 6.5l4 4"></path>
                </svg>
              </button>

              {/* Delete Button */}
              <button
                onClick={() => setIsDeleteOpen(true)}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 7h16"></path>
                  <path d="M10 11v6"></path>
                  <path d="M14 11v6"></path>
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path>
                  <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
                </svg>
              </button>
            </div>
          </td>
        </tr>

        {/* Delete Sidebar */}
        {isDeleteOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
            <div className="bg-white dark:bg-gray-900 w-full sm:w-96 p-6 overflow-y-auto shadow-lg">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-lg font-semibold">Delete</h5>
                <button
                  onClick={() => setIsDeleteOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const inputValue = document.getElementById("delete-record")?.value;
                  if (inputValue !== "DELETE") {
                    alert('Please type "DELETE" to confirm.');
                    return;
                  }
                  await handleDelete();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Type "DELETE" in Input Box*
                  </label>
                  <input
                    id="delete-record"
                    type="text"
                    placeholder="DELETE"
                    onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                >
                  DELETE
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
  // <MasterLayout>
    {/* Header */}
    <div className="px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-xl font-semibold">Creator</h1>
        <ul className="flex space-x-2 text-gray-500 text-sm mt-1">
          <li>
            <a href="/masters" className="hover:underline">Masters</a>
          </li>
          <li>/</li>
          <li className="text-gray-700 font-medium">Creator</li>
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <button
          onClick={() => {
            setActiveSidebar({ type: "add", data: null });
            setCreatorForm({ name: "", mobile: "", email: "" });
            setErrors({});
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>
    </div>

    {/* Table */}
    <div className="px-5 mb-5">
      <div className="bg-white rounded-2xl shadow p-5 dark:bg-gray-900 dark:border dark:border-gray-800">
        {loading ? (
          <p>Loading...</p>
        ) : Budget.length === 0 ? (
          <p className="text-center text-gray-500">No Data found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="px-4 py-2 border-b">ID</th>
                  <th className="px-4 py-2 border-b">Name</th>
                  <th className="px-4 py-2 border-b">Mobile</th>
                  <th className="px-4 py-2 border-b">Email</th>
                  <th className="px-4 py-2 border-b">Date</th>
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Budget.map((p) => (
                  <BudgetRow key={p.guid || p.creator_id} project={p} />
                ))}
              </tbody>
            </table>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageClick}
              totalItems={totalCount}
              itemsPerPage={itemsPerPage}
              startIndex={(currentPage - 1) * itemsPerPage}
            />
          </div>
        )}
      </div>
    </div>

    {/* Add/Edit Sidebar */}
    {activeSidebar.type && (
      <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
        <div className="bg-white dark:bg-gray-900 w-full sm:w-96 p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-lg font-semibold">
              {activeSidebar.type === "add" ? "Add Creator" : "Edit Creator"}
            </h5>
            <button
              onClick={() => setActiveSidebar({ type: "", data: null })}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Creator Name*</label>
              <input
                type="text"
                name="name"
                value={creatorForm.name}
                onChange={handleChange}
                onBlur={(e) => validateField(e.target.name, e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${errors.name ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium mb-1">Creator Mobile*</label>
              <input
                type="text"
                name="mobile"
                value={creatorForm.mobile}
                onChange={handleChange}
                onBlur={(e) => validateField(e.target.name, e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${errors.mobile ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Creator Email*</label>
              <input
                type="email"
                name="email"
                value={creatorForm.email}
                onChange={handleChange}
                onBlur={(e) => validateField(e.target.name, e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${errors.email ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {activeSidebar.type === "add" ? "Add" : "Save"}
            </button>
          </form>
        </div>
      </div>
    )}
  // </MasterLayout>
}