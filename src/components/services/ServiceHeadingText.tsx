/** Homepage-style emphasis without changing the heading wording. */
export default function ServiceHeadingText({ text }: { text: string }) {
  const phrases: Record<string, string> = {
    "Our services": "services",
    "Transfer Pricing": "Pricing",
    "Corporate Tax": "Tax",
    "International Tax": "Tax",
    "VAT & Indirect Tax": "Indirect Tax",
    "Tax Regulatory & Controversy": "Controversy",
    "Global Tax & Emerging Regulations": "Emerging Regulations",
    "When to involve us": "involve us",
    "Typical outputs": "outputs",
    "Related services": "services",
    "How this work is executed in practice": "in practice",
    "What You Receive": "Receive",
  };
  const accent = phrases[text];
  const split = accent ? text.lastIndexOf(accent) : text.lastIndexOf(" ") + 1;
  if (split <= 0) return <>{text}</>;
  return <>{text.slice(0, split)}<span className="text-[#eb0045]">{text.slice(split)}</span></>;
}
