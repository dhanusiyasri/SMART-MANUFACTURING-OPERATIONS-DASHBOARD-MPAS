import React from 'react';
import { HiOutlineSun, HiOutlineMoon } from '../../../icons/index.js';
import { useTheme } from '../../../hooks/useTheme.js';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
      aria-label="Toggle Theme Mode"
      title={`Switch Theme Mode (Current: ${theme})`}
    >
      {theme === 'dark' ? (
        <HiOutlineSun className="w-5 h-5 text-amber-500" />
      ) : (
        <HiOutlineMoon className="w-5 h-5 text-slate-600" />
      )}
    </button>
  );
};
