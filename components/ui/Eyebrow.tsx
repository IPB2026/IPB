/**
 * Eyebrow — petit label en tête de section
 *
 * Pattern signature IPB :
 * [────── 36px] LABEL UPPERCASE 10PX
 *
 * Cf. IPB_Design_Handoff.md §5.3
 */
interface EyebrowProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  className?: string;
}

export function Eyebrow({ children, variant = 'light', className = '' }: EyebrowProps) {
  const ruleColor = variant === 'dark' ? 'bg-ipb-orange' : 'bg-ipb-rule';
  const textColor = variant === 'dark' ? 'text-white/50' : 'text-ipb-light';

  return (
    <div className={`flex items-center gap-3 mb-5 ${className}`}>
      <div className={`h-px w-9 ${ruleColor}`} aria-hidden="true" />
      <span className={`text-[10px] font-medium uppercase tracking-[0.18em] ${textColor}`}>
        {children}
      </span>
    </div>
  );
}
