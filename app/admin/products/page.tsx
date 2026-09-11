"use client";
import { useState, useEffect } from "react";
import ConfirmModal from "@/components/admin/ConfirmModal";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  inStock: boolean;
  description?: string;
  image?: string;
  images?: string[];
  stock?: number | boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    inStock: true,
    description: "",
  });

  const [imagesList, setImagesList] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleOpenForm(product?: Product) {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        price: product.price.toString(),
        category: product.category,
        inStock: product.inStock ?? true,
        description: product.description || "",
      });

      const existingImages = Array.isArray(product.images) && product.images.length > 0
        ? product.images
        : product.image
        ? [product.image]
        : [];
      setImagesList(existingImages);
    } else {
      setEditingProduct(null);
      setFormData({
        title: "",
        price: "",
        category: "",
        inStock: true,
        description: "",
      });
      setImagesList([]);
    }
    setNewImageUrl("");
    setShowForm(true);
  }

  // Permet de charger des fichiers depuis l'ordinateur / bureau
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagesList((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleAddUrl = () => {
    if (newImageUrl.trim()) {
      setImagesList((prev) => [...prev, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagesList((prev) => prev.filter((_, i) => i !== index));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = editingProduct ? "PUT" : "POST";
    const endpoint = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";

    const payload = {
      title: formData.title,
      price: parseFloat(formData.price),
      category: formData.category,
      inStock: Boolean(formData.inStock),
      description: formData.description,
      image: imagesList[0] || "",
      images: imagesList,
    };

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowForm(false);
        fetchProducts();
      } else {
        const errData = await res.json();
        alert(`Error: ${errData.error || "Failed to save product"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error during save");
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/products/${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== deleteId));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  }

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-gray-500 text-sm">Add, update, or remove products from DynamoDB</p>
        </div>
        <button
          onClick={() => handleOpenForm()}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          + Add Product
        </button>
      </div>

      <input
        type="text"
        placeholder="Search products by title or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md p-2.5 rounded-lg border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900"
      />

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 space-y-4">
          <h2 className="text-xl font-bold">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              required
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="p-2 border rounded dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
            <input
              required
              type="number"
              step="0.01"
              placeholder="Price ($)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="p-2 border rounded dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
            <input
              required
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="p-2 border rounded dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
          </div>

          <textarea
            rows={3}
            placeholder="Product Description..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          />

          {/* Section Gestion des Images */}
          <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
              Product Images ({imagesList.length})
            </label>

            <div className="flex flex-wrap gap-3 items-center">
              {/* Importation depuis l'ordinateur */}
              <label className="cursor-pointer px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-2">
                📂 Choisir depuis le PC / Bureau
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Ajout par URL */}
              <div className="flex-1 flex gap-2 min-w-[280px]">
                <input
                  type="url"
                  placeholder="Ou coller une URL d'image (http...)"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1 p-2 border rounded dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddUrl}
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium"
                >
                  Ajouter URL
                </button>
              </div>
            </div>

            {/* Aperçu des miniatures d'images */}
            {imagesList.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {imagesList.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 group bg-white dark:bg-gray-800">
                    <img src={img} alt={`Img ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center opacity-80 hover:opacity-100 transition"
                      title="Supprimer"
                    >
                      ✕
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-[9px] text-center font-bold py-0.5">
                        Principale
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(formData.inStock)}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="font-medium text-sm">In Stock</span>
          </label>

          <div className="flex gap-2 pt-2">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium">
              Save
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-500 text-white rounded font-medium">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-x-auto">
        <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 uppercase text-xs">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {loading ? (
              <tr><td colSpan={6} className="p-4 text-center">Loading products...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="p-4 text-center text-gray-500">No products found.</td></tr>
            ) : (
              filtered.map((product) => {
                const isProdInStock = product.inStock ?? (typeof product.stock === 'number' ? product.stock > 0 : Boolean(product.stock ?? true));
                const displayImage = (product.images && product.images[0]) || product.image;
                return (
                  <tr key={product.id}>
                    <td className="p-4">
                      {displayImage ? (
                        <img src={displayImage} alt={product.title} className="w-10 h-10 object-cover rounded-md border border-gray-200" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400">No img</div>
                      )}
                    </td>
                    <td className="p-4 font-medium">{product.title}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">${product.price}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${isProdInStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {isProdInStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => handleOpenForm(product)} className="text-blue-600 hover:underline font-medium">Edit</button>
                      <button onClick={() => setDeleteId(product.id)} className="text-red-600 hover:underline font-medium">Delete</button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Product"
        message="Are you sure you want to delete this product from DynamoDB?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}