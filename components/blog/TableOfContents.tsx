"use client";

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white border-2 border-slate-200 rounded-xl p-6 sticky top-24 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <List className="text-orange-600" size={20} />
        <h3 className="font-bold text-slate-900">Sommaire</h3>
        {/* Badge "interactive" */}
        <span className="ml-auto text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
          interactif
        </span>
      </div>
      <nav>
        <ul className="space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
          {items.map((item) => (
            <li
              key={item.id}
              className={`
                ${item.level === 2 ? 'ml-0' : 'ml-4'}
                transition-all duration-200
              `}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className={`
                  text-left text-sm hover:text-orange-600 transition-all w-full rounded-lg px-3 py-2 border-l-2
                  ${
                    activeId === item.id
                      ? 'text-orange-600 font-bold bg-orange-50 border-orange-500'
                      : 'text-slate-600 border-transparent hover:bg-slate-50'
                  }
                `}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Custom scrollbar style */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
