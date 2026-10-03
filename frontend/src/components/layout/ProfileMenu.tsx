import React, { useState, useRef, useEffect } from 'react';
import { HiOutlineUser, HiOutlineLogout, HiOutlineChevronDown, HiOutlineShieldCheck } from '../../icons/index.js';
import { UserProfile } from '../../types/index.js';

const currentUser: UserProfile = {
  id: 'u-101',
  name: 'Operations Manager',
  email: 'ops.manager@ashokleyland.com',
  role: 'PLANT_MANAGER',
  plantId: '2004',
  plantName: 'Plant 2004'
};

export const ProfileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center space-x-2.5 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-semibold text-xs flex items-center justify-center border border-brand-200">
          OM
        </div>
        <div className="hidden xl:block text-left">
          <span className="text-xs font-semibold text-slate-900 block leading-tight">
            {currentUser.name}
          </span>
          <span className="text-3xs text-slate-500 font-medium block">
            {currentUser.plantName}
          </span>
        </div>
        <HiOutlineChevronDown className="w-4 h-4 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-2.5 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-900">{currentUser.name}</p>
            <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
            <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 text-3xs font-semibold border border-brand-200">
              <HiOutlineShieldCheck className="w-3 h-3 mr-1" />
              Role: {currentUser.role}
            </div>
          </div>

          <div className="py-1">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2"
            >
              <HiOutlineUser className="w-4 h-4 text-slate-400" />
              <span>User Profile Settings</span>
            </button>
          </div>

          <div className="border-t border-slate-100 pt-1">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2 font-medium"
            >
              <HiOutlineLogout className="w-4 h-4 text-red-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
