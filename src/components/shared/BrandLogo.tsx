export default function BrandLogo({
  light = false,
  markOnly = false,
}: {
  light?: boolean;
  markOnly?: boolean;
}) {
  return (
    <span className={`brand-logo ${light ? "brand-logo-light" : ""}`}>
      <svg viewBox="0 0 46 48" aria-hidden="true">
        <path
          fill="#e00019"
          d="M2 29 14 20v11L2 35zm14-11 9-7v34l-9-6zm11-9 8-6v28l-8 6zm10-8 7-1v22l-7 7z"
        />
      </svg>
      {!markOnly && (
        <span>
          <strong>TAXMETRYX</strong>
          <small>GLOBAL</small>
        </span>
      )}
    </span>
  );
}
