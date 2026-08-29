'use client';

interface LogoProps {
  variant?: 'light' | 'dark';
}

export default function Logo({ variant = 'light' }: LogoProps) {
  const veloceColor = variant === 'dark' ? 'text-white' : 'text-slate-900';

  return (
    <div className="flex items-center gap-2 font-black text-xl tracking-tight select-none">
      {/* Fast Shopping Cart Icon with Speed Lines */}
      <svg className="w-7 h-7 text-amber-500 fill-current shrink-0" viewBox="0 0 24 24">
        {/* Speed lines */}
        <path d="M1 7h3v1.8H1V7zm-1 4h5v1.8H0V11zm1 4h3v1.8H1V15z"/>
        {/* Cart */}
        <path d="M7 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H7.21l-.94-2H5v2h1l3.6 7.59-1.35 2.44C7.52 15.37 8.48 17 10 17h10v-2H10.42c-.13 0-.25-.11-.25-.25z"/>
      </svg>
      <div className="flex items-center">
        <span className={veloceColor}>Veloce</span>
        <span className="text-amber-500 ml-1">Store</span>
      </div>
    </div>
  );
}