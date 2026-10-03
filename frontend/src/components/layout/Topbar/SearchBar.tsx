import React, { useState, useRef } from 'react';
import { HiOutlineSearch, HiOutlineX } from '../../../icons/index.js';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
      <div className="relative w-full">
        <HiOutlineSearch className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search orders, machines, VINs, or SAP sequence plans..."
          className="w-full pl-9 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
          aria-label="Global Search Bar"
        />
        {query ? (
          <button
            onClick={handleClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label="Clear Search"
          >
            <HiOutlineX className="w-3.5 h-3.5" />
          </button>
        ) : (
          <kbd className="hidden lg:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 text-3xs font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded-xs px-1.5 py-0.5">
            /
          </kbd>
        )}
      </div>
    </div>
  );
};
