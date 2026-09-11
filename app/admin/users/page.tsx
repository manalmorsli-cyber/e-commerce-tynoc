"use client";

import { useState, useEffect } from "react";
import ConfirmModal from "@/components/admin/ConfirmModal";

interface User {
  id: string;
  name: string;
  email: string;
  joinedDate?: string;
  createdAt?: string;
  role?: string;
  status?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // States for Modales
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setIsLoading(true);
    try {
      // Test route
      let res = await fetch("/api/users");
      if (!res.ok) {
        res = await fetch("/api/admin/users");
      }

      if (res.ok) {
        const data = await res.json();
        // Json struct
        let userList: User[] = [];
        if (Array.isArray(data)) {
          userList = data;
        } else if (data.users && Array.isArray(data.users)) {
          userList = data.users;
        } else if (data.items && Array.isArray(data.items)) {
          userList = data.items;
        }
        setUsers(userList);
      }
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenEdit(user: User) {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "User",
      status: user.status || "Active",
    });
  }

  async function handleUpdateUser(e: React.FormEvent) {
    e.preventDefault();
    if (!editingUser) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updated = await res.json();
        setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
        setEditingUser(null);
      } else {
        alert("Failed to update user");
      }
    } catch (err) {
      console.error("Error updating user:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteUser() {
    if (!deleteId) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/users/${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== deleteId));
      }
    } catch (err) {
      console.error("Failed to delete user:", err);
    } finally {
      setIsSubmitting(false);
      setDeleteId(null);
    }
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-slate-400 text-sm">View registered accounts from DynamoDB</p>
        </div>

        <input
          type="text"
          placeholder="Search by ID, name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 p-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-800/60 text-slate-400 font-bold uppercase tracking-wider">
            <tr>
              <th className="p-4">User ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Joined Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-slate-500">
                  Loading users from DynamoDB...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-slate-500">
                  No registered users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/30 transition">
                  <td className="p-4 font-mono text-slate-400">{user.id}</td>
                  <td className="p-4 font-bold text-white">{user.name}</td>
                  <td className="p-4 text-slate-300">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                      user.role === 'Admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {user.role || 'User'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">
                    {user.joinedDate || (user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A')}
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <button
                      onClick={() => setViewingUser(user)}
                      className="text-blue-400 hover:text-blue-300 font-bold transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleOpenEdit(user)}
                      className="text-amber-400 hover:text-amber-300 font-bold transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(user.id)}
                      className="text-rose-500 hover:text-rose-400 font-bold transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* Modale Details */}
      {viewingUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">User Details</h2>
            <div className="space-y-3 text-xs">
              <div><span className="text-slate-500 block">User ID</span><span className="font-mono text-slate-300">{viewingUser.id}</span></div>
              <div><span className="text-slate-500 block">Full Name</span><span className="font-bold text-white text-sm">{viewingUser.name}</span></div>
              <div><span className="text-slate-500 block">Email</span><span className="text-slate-300">{viewingUser.email}</span></div>
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-slate-500 block">Role</span><span className="font-bold text-blue-400">{viewingUser.role || 'User'}</span></div>
                <div><span className="text-slate-500 block">Status</span><span className="font-bold text-emerald-400">{viewingUser.status || 'Active'}</span></div>
              </div>
            </div>
            <button onClick={() => setViewingUser(null)} className="w-full py-2 bg-slate-800 text-white font-bold rounded-xl text-xs">Close</button>
          </div>
        </div>
      )}

      {/* Modale Edit */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleUpdateUser} className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">Update User</h2>
            <div className="space-y-3">
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-800 text-white text-xs" placeholder="Full Name" />
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-800 text-white text-xs" placeholder="Email" />
              <div className="grid grid-cols-2 gap-3">
                <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="p-2.5 bg-slate-800 text-white text-xs rounded-xl">
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="p-2.5 bg-slate-800 text-white text-xs rounded-xl">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs">{isSubmitting ? "Saving..." : "Save"}</button>
              <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2.5 bg-slate-800 text-white font-bold rounded-xl text-xs">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete User"
        message="Are you sure you want to delete this user from DynamoDB?"
        onConfirm={handleDeleteUser}
        onCancel={() => setDeleteId(null)}
        isLoading={isSubmitting}
      />
    </div>
  );
}