import { createElement, type ElementType } from "react";

interface Props {
  text: string;
  as?: ElementType;
  className?: string;
  /** class applied to every word's inner span — targeted by GSAP */
  wordClass?: string;
}

/** Server-rendered word split: no layout shift, animates with plain transforms. */
export function SplitText({ text, as = "span", className, wordClass = "w" }: Props) {
  const words = text.split(" ");
  return createElement(
    as,
    { className, "aria-label": text },
    words.map((word, i) => (
      <span key={i} aria-hidden="true">
        <span className="mask">
          <span className={wordClass}>{word}</span>
        </span>
        {i < words.length - 1 ? " " : null}
      </span>
    )),
  );
}
