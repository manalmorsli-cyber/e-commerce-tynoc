export default function Logo() {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer">
      <svg
        className="w-9 h-9 transition-transform group-hover:scale-105"
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lignes de vitesse */}
        <path d="M5 22H35" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M2 38H45" stroke="#f97316" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M12 52H38" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />

        {/* Caddie */}
        <path
          d="M30 15L42 15L56 50H82L94 22H42"
          stroke="#f97316"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M56 50C56 55 60 58 65 58H80"
          stroke="#f97316"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Roues */}
        <circle cx="58" cy="65" r="5" fill="#f97316" />
        <circle cx="78" cy="65" r="5" fill="#f97316" />
      </svg>
      <span className="text-xl font-extrabold tracking-tight text-slate-900">
        Veloce<span className="text-orange-500">Store</span>
      </span>
    </div>
  );
}