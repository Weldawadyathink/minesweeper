import { DigitOptions, DisplayDigit } from "@/components/DisplayDigit.tsx";

export function DisplayMultiDigit(props: { displayValue: string | number }) {
  const digits = [...(props.displayValue.toString() + "")].map((n) => +n);
  return (
    <div className="flex flex-row">
      {digits.map((d, i) => (
        <DisplayDigit key={i} digit={d as DigitOptions} />
      ))}
    </div>
  );
}
