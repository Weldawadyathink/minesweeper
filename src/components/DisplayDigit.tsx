import type { IntRange } from "type-fest";

export type DigitOptions = IntRange<0, 9> | "-" | "_";

const digitMapping = {
  "-": "dash",
  _: "empty",
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
};

export function DisplayDigit(props: { digit: DigitOptions }) {
  const urlPart = digitMapping[props.digit];
  const url = `/3.1/digit_${urlPart}.png`;

  return <img alt={urlPart} src={url}></img>;
}
