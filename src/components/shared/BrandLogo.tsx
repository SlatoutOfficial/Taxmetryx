interface BrandLogoProps {
  light?: boolean;
  markOnly?: boolean;
  className?: string;
  imgClassName?: string;
}

export default function BrandLogo({
  light = false,
  markOnly = false,
  className = "",
  imgClassName = "",
}: BrandLogoProps) {
  return (
    <span className={`brand-logo ${light ? "brand-logo-light" : ""} flex items-center shrink-0 ${className}`}>
      <img 
        src={light ? "/logo-white.png?v=2" : "/logo.png?v=2"} 
        alt="Taxmetryx Logo" 
        className={`h-[84px] w-auto object-contain shrink-0 ${imgClassName}`} 
      />
    </span>
  );
}
