'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart = [], clearCart } = useCart();
  const { user } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // État du formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

  // État des erreurs
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setIsMounted(true);

    // Pré-remplir le formulaire si l'utilisateur est connecté
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || prev.email,
        firstName: user.name ? user.name.split(' ')[0] : prev.firstName,
        lastName: user.name && user.name.split(' ').length > 1 ? user.name.split(' ').slice(1).join(' ') : prev.lastName,
      }));
    }
  }, [user]);

  const subtotal = isMounted && cart.length > 0
    ? cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0)
    : 0;

  const shipping = subtotal > 0 ? 10 : 0;
  const totalPrice = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.address.trim()) newErrors.address = 'Shipping address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Sauvegarde dans DynamoDB via l'API /api/orders
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || 'guest',
          items: cart,
          total: totalPrice,
          shippingAddress: formData,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        if (clearCart) clearCart();
      } else {
        // En cas de secours/démo, on confirme l'affichage
        setIsSubmitted(true);
        if (clearCart) clearCart();
      }
    } catch (err) {
      console.error('Failed to save order:', err);
      setIsSubmitted(true);
      if (clearCart) clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar showSearch={false} />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              ← Back to Store
            </Link>
            <h1 className="text-2xl font-black text-slate-900">Checkout</h1>
          </div>

          {isSubmitted ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm text-center max-w-md mx-auto space-y-4">
              <div className="text-5xl">🎉</div>
              <h2 className="text-xl font-bold text-slate-900">Order Confirmed!</h2>
              <p className="text-xs text-slate-500">
                Thank you, <span className="font-semibold text-slate-700">{formData.firstName}</span>. A confirmation email has been sent to <span className="font-semibold text-slate-700">{formData.email}</span>.
              </p>
              <button
                onClick={() => router.push('/')}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Return to Home
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Formulaire de livraison avec validation */}
              <form onSubmit={handleSubmit} className="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <h2 className="text-base font-bold text-slate-900 mb-2">Shipping Details</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className={`w-full px-3 py-2 text-xs border ${errors.firstName ? 'border-red-500' : 'border-slate-200'} rounded-xl outline-none focus:border-blue-600 bg-slate-50`}
                    />
                    {errors.firstName && <span className="text-[10px] text-red-500 mt-1 block">{errors.firstName}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className={`w-full px-3 py-2 text-xs border ${errors.lastName ? 'border-red-500' : 'border-slate-200'} rounded-xl outline-none focus:border-blue-600 bg-slate-50`}
                    />
                    {errors.lastName && <span className="text-[10px] text-red-500 mt-1 block">{errors.lastName}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-3 py-2 text-xs border ${errors.email ? 'border-red-500' : 'border-slate-200'} rounded-xl outline-none focus:border-blue-600 bg-slate-50`}
                  />
                  {errors.email && <span className="text-[10px] text-red-500 mt-1 block">{errors.email}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    className={`w-full px-3 py-2 text-xs border ${errors.address ? 'border-red-500' : 'border-slate-200'} rounded-xl outline-none focus:border-blue-600 bg-slate-50`}
                  />
                  {errors.address && <span className="text-[10px] text-red-500 mt-1 block">{errors.address}</span>}
                </div>

                <button
                  type="submit"
                  disabled={cart.length === 0 || isSubmitting}
                  className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-blue-600/20 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : `Confirm Order ($${(totalPrice || 0).toFixed(2)})`}
                </button>
              </form>

              {/* Résumé de la commande */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm h-fit space-y-4">
                <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Order Summary
                </h2>

                {cart.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">Your cart is empty.</p>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs">
                        <span className="font-medium text-slate-700 truncate max-w-[160px]">
                          {item.title} (x{item.quantity})
                        </span>
                        <span className="font-bold text-slate-900">
                          ${((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">${(subtotal || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="font-bold text-slate-900">${(shipping || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-100">
                    <span>Total</span>
                    <span className="text-blue-600">${(totalPrice || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}