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
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <List className="text-orange-600" size={20} />
        <h3 className="font-bold text-slate-900">Sommaire</h3>
      </div>
      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className={`
                ${item.level === 2 ? 'ml-0' : 'ml-4'}
                transition-colors
              `}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className={`
                  text-left text-sm hover:text-orange-600 transition-colors w-full
                  ${activeId === item.id ? 'text-orange-600 font-bold' : 'text-slate-600'}
                `}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
