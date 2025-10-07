import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Button from "../../ui/button/Button";
import { getAllClient, addClient, updateClient, deleteClient } from "../../../api";
import Alert from "../../ui/alert/Alert";

interface Client {
  client_id: number;
  client_name: string;
  client_mobile: string;
  client_email: string;
  created_at: string;
}

export default function ClientTable() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Form state
  const [form, setForm] = useState({
    client_name: "",
    client_mobile: "",
    client_email: "",
  });

  // Alert state
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    variant: "success" | "error";
  }>({ show: false, message: "", variant: "success" });

  // Fetch clients
  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await getAllClient(0, 10);
      if (res.status) setClients(res.data);
      else setClients([]);
    } catch (error) {
      showAlert("Failed to fetch clients", "error");
      setClients([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Alert helper
  const showAlert = (message: string, variant: "success" | "error" = "success") => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: "", variant }), 3000);
  };

  // Handle Add/Update
  const handleSave = async () => {
    try {
      if (selectedClient) {
        // Update client
        const res = await updateClient({ client_id: selectedClient.client_id, ...form });
        if (res.status) {
          fetchClients();
          setIsAddOpen(false);
          setSelectedClient(null);
          setForm({ client_name: "", client_mobile: "", client_email: "" });
          showAlert("Client updated successfully", "success");
        } else {
          showAlert("Failed to update client", "error");
        }
      } else {
        // Add client
        const res = await addClient(form);
        if (res.status) {
          fetchClients();
          setIsAddOpen(false);
          setForm({ client_name: "", client_mobile: "", client_email: "" });
          showAlert("Client added successfully", "success");
        } else {
          showAlert("Failed to add client", "error");
        }
      }
    } catch (error) {
      showAlert("Something went wrong. Please try again.", "error");
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!selectedClient) return;
    try {
      const res = await deleteClient({ client_id: selectedClient.client_id });
      if (res.status) {
        fetchClients();
        setIsDeleteOpen(false);
        setSelectedClient(null);
        showAlert("Client deleted successfully", "error");
      } else {
        showAlert("Failed to delete client", "error");
      }
    } catch (error) {
      showAlert("Something went wrong while deleting", "error");
    }
  };

  // Handle Edit
  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setForm({
      client_name: client.client_name,
      client_mobile: client.client_mobile,
      client_email: client.client_email,
    });
    setIsAddOpen(true);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] relative">
      
      {/* Alert */}
      {alert.show && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-md z-50">
          <Alert
            variant={alert.variant}
            title={alert.variant === "success" ? "Success" : "Error"}
            message={alert.message}
            showLink={false}
          />
        </div>
      )}

      {/* Add Client Button */}
      <div className="flex justify-end p-4">
        <Button
          onClick={() => {
            setSelectedClient(null);
            setForm({ client_name: "", client_mobile: "", client_email: "" });
            setIsAddOpen(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Client
        </Button>
      </div>

      {/* Client Table */}
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">ID</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Name</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Mobile</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Email</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Date</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-5">Loading...</TableCell>
                </TableRow>
              ) : clients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-5">No clients found</TableCell>
                </TableRow>
              ) : (
                clients.map((client) => (
                  <TableRow key={client.client_id}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{client.client_id}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{client.client_name || "-"}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{client.client_mobile || "-"}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{client.client_email || "-"}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{client.created_at || "-"}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button
                        onClick={() => { setSelectedClient(client); setIsDeleteOpen(true); }}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => handleEdit(client)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 mx-4 sm:mx-0">
            <h2 className="text-xl font-bold mb-4">{selectedClient ? "Edit Client" : "Add Client"}</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Name" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} className="w-full border px-3 py-2 rounded"/>
              <input type="number" placeholder="Mobile" value={form.client_mobile} onChange={(e) => setForm({ ...form, client_mobile: e.target.value })} className="w-full border px-3 py-2 rounded" maxLength={10} minLength={10} />
              <input type="email" placeholder="Email" value={form.client_email} onChange={(e) => setForm({ ...form, client_email: e.target.value })} className="w-full border px-3 py-2 rounded"/>
              <div className="flex justify-end space-x-2">
                <Button onClick={() => setIsAddOpen(false)} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">Cancel</Button>
                <Button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">{selectedClient ? "Update" : "Add"}</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-sm p-6 mx-4 sm:mx-0 text-center">
            <h2 className="text-xl font-bold mb-4">Delete Client</h2>
            <p className="mb-4">Are you sure you want to delete <strong>{selectedClient.client_name}</strong>?</p>
            <div className="flex justify-center space-x-2">
              <Button onClick={() => setIsDeleteOpen(false)} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">Cancel</Button>
              <Button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
