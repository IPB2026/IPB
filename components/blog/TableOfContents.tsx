"use client";

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  /** "desktop" : sidebar sticky (≥ lg). "mobile" : details collapsible inline. */
  variant?: 'desktop' | 'mobile';
}

export function TableOfContents({ items, variant = 'desktop' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (variant !== 'desktop') return; // ne suit l'active que sur la sidebar
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
  }, [items, variant]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filtrer aux H2 uniquement pour le mobile (compact). Garder H2+H3 desktop.
  const displayedItems = variant === 'mobile' ? items.filter(i => i.level === 2) : items;

  if (variant === 'mobile') {
    return (
      <details className="my-8 border border-ipb-rule rounded-[6px] bg-ipb-white group lg:hidden">
        <summary className="flex items-center justify-between cursor-pointer px-5 py-4 list-none">
          <span className="flex items-center gap-3">
            <span className="h-px w-9 bg-ipb-orange" aria-hidden="true" />
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-ipb-light">
              Sommaire de l'article
            </span>
          </span>
          <span
            aria-hidden="true"
            className="text-ipb-orange text-[14px] transition-transform group-open:rotate-180"
          >
            ▾
          </span>
        </summary>
        <nav className="px-5 pb-5 pt-1">
          <ol className="space-y-2 list-none p-0 m-0">
            {displayedItems.map((item, i) => (
              <li key={item.id} className="flex gap-3">
                <span className="font-serif text-ipb-orange text-[13px] font-bold flex-shrink-0 leading-[1.6] pt-0.5 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-[14px] leading-[1.6] text-ipb-text hover:text-ipb-orange transition-colors"
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </details>
    );
  }

  // Desktop sidebar — éditorial, sobre, sticky
  return (
    <div className="sticky top-24 bg-ipb-white border border-ipb-rule rounded-[6px] p-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="h-px w-9 bg-ipb-orange" aria-hidden="true" />
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ipb-light">
          Sommaire
        </p>
      </div>
      <nav>
        <ol className="space-y-1 list-none p-0 m-0 max-h-[65vh] overflow-y-auto pr-2 toc-scroll">
          {displayedItems.map((item, i) => (
            <li
              key={item.id}
              className={item.level === 3 ? 'pl-6' : ''}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className={`
                  text-left text-[13px] leading-[1.6] w-full py-1.5 border-l-2 pl-3 transition-colors
                  ${
                    activeId === item.id
                      ? 'text-ipb-orange font-medium border-ipb-orange'
                      : 'text-ipb-muted border-transparent hover:text-ipb-text hover:border-ipb-rule'
                  }
                `}
              >
                {item.level === 2 && (
                  <span className="font-serif text-ipb-light text-[11px] mr-2 tabular-nums">
                    {String(displayedItems.filter(d => d.level === 2).indexOf(item) + 1).padStart(2, '0')}
                  </span>
                )}
                {item.title}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <style jsx>{`
        .toc-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .toc-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .toc-scroll::-webkit-scrollbar-thumb {
          background: var(--ipb-rule);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
