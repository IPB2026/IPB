'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

type Suggestion = {
  label: string;
  address: string;
  postalCode: string;
  city: string;
};

/**
 * Saisie d'adresse avec autocomplétion sur la Base Adresse Nationale (via le
 * proxy /api/admin/address-search). Choisir une suggestion remplit d'un coup
 * l'adresse, le code postal ET la ville → « la bonne adresse » garantie. Les 3
 * champs restent éditables à la main si besoin. Soumet address / postalCode / city.
 */
export function AddressAutocomplete({
  defaultAddress = '',
  defaultPostalCode = '',
  defaultCity = '',
  fieldClass,
  labelClass,
}: {
  defaultAddress?: string;
  defaultPostalCode?: string;
  defaultCity?: string;
  fieldClass: string;
  labelClass: string;
}) {
  const uid = useId();
  const [address, setAddress] = useState(defaultAddress);
  const [postalCode, setPostalCode] = useState(defaultPostalCode);
  const [city, setCity] = useState(defaultCity);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const skipRef = useRef(false); // ne pas re-chercher juste après une sélection

  useEffect(() => {
    if (skipRef.current) {
      skipRef.current = false;
      return;
    }
    const q = address.trim();
    if (q.length < 4) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/admin/address-search?q=${encodeURIComponent(q)}`,
          { signal: ctrl.signal }
        );
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.suggestions ?? []);
          setOpen((data.suggestions ?? []).length > 0);
        }
      } catch {
        /* annulé / réseau : saisie manuelle conservée */
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [address]);

  function pick(s: Suggestion) {
    skipRef.current = true;
    setAddress(s.address || s.label);
    setPostalCode(s.postalCode);
    setCity(s.city);
    setOpen(false);
    setSuggestions([]);
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <label className={labelClass} htmlFor={`${uid}-address`}>
          Adresse du bien
        </label>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id={`${uid}-address`}
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            autoComplete="off"
            placeholder="Tapez l'adresse : 33 chemin des Vivans…"
            className={`${fieldClass} pl-9`}
          />
          {loading && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-slate-400" />
          )}
        </div>
        {open && suggestions.length > 0 && (
          <ul className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
            {suggestions.map((s, i) => (
              <li key={i}>
                <button
                  type="button"
                  // onMouseDown (pas onClick) : se déclenche AVANT le onBlur de l'input.
                  onMouseDown={(e) => {
                    e.preventDefault();
                    pick(s);
                  }}
                  className="flex w-full items-start gap-2 px-3 py-2 text-left text-sm hover:bg-orange-50"
                >
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500" />
                  <span className="text-slate-700">{s.label}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-1 text-xs text-slate-400">
          Suggestions issues du répertoire officiel des adresses (Base Adresse Nationale).
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor={`${uid}-cp`}>
            Code postal
          </label>
          <input
            id={`${uid}-cp`}
            name="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            inputMode="numeric"
            placeholder="31600"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor={`${uid}-city`}>
            Ville
          </label>
          <input
            id={`${uid}-city`}
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Muret"
            className={fieldClass}
          />
        </div>
      </div>
    </div>
  );
}
