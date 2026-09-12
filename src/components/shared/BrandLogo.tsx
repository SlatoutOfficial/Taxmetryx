export default function BrandLogo({
  light = false,
  markOnly = false,
}: {
  light?: boolean;
  markOnly?: boolean;
}) {
  return (
    <span className={`brand-logo ${light ? "brand-logo-light" : ""} flex items-center`}>
      <img 
        src={light ? "/logo-white.png" : "/logo.png"} 
        alt="Taxmetryx Logo" 
        className="h-12 md:h-14 lg:h-16 w-auto object-contain" 
      />
    </span>
  );
}
