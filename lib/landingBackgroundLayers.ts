import type { CSSProperties } from "react";

/**
 * Landing page background: stacked images under `public/images/backgrounds/`.
 *
 * **Sortable files:** use numeric prefixes so folder sort matches paint order, e.g.
 *   `01-sky.webp`, `02-gradient.png`, `03-grain.webp`
 * **Stack layout:** list **bottom → top** (first entry = back layer).
 *
 * **Split-vertical layout:** one column — layers in array order = **top → bottom**. Rows are equal height unless a layer sets **`splitRowPx`** (fixed band height in px); remaining layers share the rest with **`flex-1`**.
 *
 * **Split-horizontal layout:** one row — layers in array order = **left → right**, equal width columns.
 *
 * Public URL is always `/images/backgrounds/<filename>`.
 */
export type LandingBackgroundLayout = "stack" | "split-vertical" | "split-horizontal";

export type LandingBackgroundLayer = {
  /** Path from site root, e.g. `/images/backgrounds/01-base.webp` */
  src: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  /** Optional blend between layers (e.g. "soft-light", "multiply", "normal") */
  mixBlendMode?: CSSProperties["mixBlendMode"];
  /** 0–1, whole layer */
  opacity?: number;
  /** `split-vertical` only: fixed row height in px; other layers use flex-1. */
  splitRowPx?: number;
};

/** `split-horizontal`: columns left → right. `split-vertical`: rows top → bottom. */
export const LANDING_BACKGROUND_LAYOUT: LandingBackgroundLayout = "split-vertical";

export const LANDING_BACKGROUND_LAYERS: LandingBackgroundLayer[] = [
  {
    src: "/images/backgrounds/bg1.png",
    backgroundSize: "cover",
    backgroundPosition: "center",
    splitRowPx: 660,
  },
  {
    src: "/images/backgrounds/bg2.png",
    backgroundSize: "cover",
    backgroundPosition: "center",
    splitRowPx: 630,
  },
  {
    src: "/images/backgrounds/bg3.png",
    backgroundSize: "cover",
    backgroundPosition: "center",
    splitRowPx: 614,
  },
  {
    src: "/images/backgrounds/bg4.png",
    backgroundSize: "cover",
    backgroundPosition: "center",
    splitRowPx: 840,
  },
];
