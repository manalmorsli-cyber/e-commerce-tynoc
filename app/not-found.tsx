import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar showSearch={false} />
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-9xl font-black text-blue-600/10 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps the URL is incorrect.
        </p>
        <Link 
          href="/" 
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-blue-200"
        >
          Return to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}