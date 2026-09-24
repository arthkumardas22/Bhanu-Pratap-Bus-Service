"use client";

import Image from "next/image";

export default function BusServiceLogo() {
  return (
    <header className="relative z-10 my-auto flex flex-col items-center justify-center text-center select-none pointer-events-none px-3 py-1">
      {/* Decorative Top Flourish */}
      <div className="flex items-center gap-1.5 sm:gap-2 text-white/80 text-[9px] sm:text-[11px] font-semibold tracking-widest uppercase mb-0.5 sm:mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
        <span className="h-[1px] w-4 sm:w-10 bg-gradient-to-r from-transparent to-white/60" />
        <span className="text-white/90 tracking-[0.2em] sm:tracking-[0.25em] drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
          ★ ऑल इण्डिया टूरिस्ट परमिट ★
        </span>
        <span className="h-[1px] w-4 sm:w-10 bg-gradient-to-l from-transparent to-white/60" />
      </div>

      {/* Main Hindi Logo with Semantic H1 for Top SEO Ranking */}
      <h1 className="relative flex items-center justify-center py-0.5 sm:py-1 m-0">
        <Image
          src="/bhanu-pratap-manthan-white.png"
          alt="भानु प्रताप बस सर्विस - Bhanu Pratap Bus Service - 90s Bollywood Highway Radio"
          width={420}
          height={174}
          priority
          className="h-auto w-48 xs:w-56 sm:w-72 md:w-84 max-w-[82vw] max-h-[15vh] sm:max-h-none object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:scale-[1.02]"
        />
        <span className="sr-only">
          Bhanu Pratap Bus Service (भानु प्रताप बस सर्विस) - 90s Bollywood Highway Night Drive Radio
        </span>
      </h1>

      {/* Subtitle / Bus Branding */}
      <div className="mt-0.5 sm:mt-1 flex items-center gap-1.5 sm:gap-2">
        <span className="h-[1px] w-3 sm:w-4 bg-white/30" />
        <p className="text-[9px] sm:text-[11.5px] font-bold tracking-[0.22em] sm:tracking-[0.3em] uppercase text-white/85 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
          BHANU PRATAP BUS SERVICE
        </p>
        <span className="h-[1px] w-3 sm:w-4 bg-white/30" />
      </div>
    </header>
  );
}
