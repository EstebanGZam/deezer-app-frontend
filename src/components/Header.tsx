import React from 'react';
import { ArrowLeft } from "lucide-react";

const Header = ({ title, onBack, action }) => (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>
        {action}
      </div>
    </div>
);
  
export default Header;