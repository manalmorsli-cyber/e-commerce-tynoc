"use client";

import { useState, useEffect } from "react";
import ConfirmModal from "@/components/admin/ConfirmModal";

interface Category {
  id: string;
  name: string;
  slug?: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // States Édition & Suppression
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug: slug || name.toLowerCase().replace(/\s+/g, "-") }),
      });

      if (res.ok) {
        const newCat = await res.json();
        setCategories((prev) => [...prev, newCat]);
        setName("");
        setSlug("");
      }
    } catch (err) {
      console.error("Failed to add category:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleOpenEdit(cat: Category) {
    setEditingCategory(cat);
    setEditName(cat.name);
    setEditSlug(cat.slug || "");
  }

  async function handleUpdateCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!editingCategory || !editName.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, slug: editSlug }),
      });

      if (res.ok) {
        const updated = await res.json();
        setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
        setEditingCategory(null);
      }
    } catch (err) {
      console.error("Failed to update category:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteCategory() {
    if (!deleteId) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/categories/${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== deleteId));
      }
    } catch (err) {
      console.error("Failed to delete category:", err);
    } finally {
      setIsSubmitting(false);
      setDeleteId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Category Management</h1>
        <p className="text-slate-400 text-sm">Organize product categories</p>
      </div>

      {/* Formulaire Ajout */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 max-w-xl">
        <h2 className="text-lg font-bold text-white mb-4">Add Category</h2>
        <form onSubmit={handleAddCategory} className="space-y-4">
          <input
            type="text"
            placeholder="Category Name (e.g. Desktop)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Slug (optional, e.g. desktop)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition"
          >
            {isSubmitting ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl max-w-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-800/60 text-slate-400 font-bold uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {isLoading ? (
              <tr><td colSpan={3} className="p-4 text-center text-slate-500">Loading...</td></tr>
            ) : categories.length === 0 ? (
              <tr><td colSpan={3} className="p-4 text-center text-slate-500">No categories found.</td></tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-800/30">
                  <td className="p-4 font-bold text-white">{cat.name}</td>
                  <td className="p-4 text-slate-400 font-mono">{cat.slug || "-"}</td>
                  <td className="p-4 text-right space-x-3">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="text-amber-400 hover:text-amber-300 font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(cat.id)}
                      className="text-rose-500 hover:text-rose-400 font-bold"
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

      {/* Modale Édition */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleUpdateCategory} className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 space-y-4">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Edit Category</h2>
            <div className="space-y-3">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
              <input
                type="text"
                value={editSlug}
                onChange={(e) => setEditSlug(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={isSubmitting} className="flex-1 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs">
                Save
              </button>
              <button type="button" onClick={() => setEditingCategory(null)} className="px-4 py-2 bg-slate-800 text-white font-bold rounded-xl text-xs">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        onConfirm={handleDeleteCategory}
        onCancel={() => setDeleteId(null)}
        isLoading={isSubmitting}
      />
    </div>
  );
}