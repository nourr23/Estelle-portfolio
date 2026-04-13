import type { CSSProperties } from "react";

/**
 * Landing page background: stacked images under `public/images/backgrounds/`.
 *
 * **Sortable files:** use numeric prefixes so folder sort matches paint order, e.g.
 *   `01-sky.webp`, `02-gradient.png`, `03-grain.webp`
 * **Stack layout:** list **bottom → top** (first entry = back layer).
 *
 * **Split-vertical layout:** one column — layers in array order = **top → bottom**. Rows are equal height unless a layer sets **`splitRowPx`** (fixed band height in px); remaining layers share the rest with **`flex-1`**. Optional **`overlaySrc`** draws another image on top of `src` in the **same row**; use **`overlayVerticalAlign: "bottom"`** to pin that overlay to the row’s lower edge. Optional **`rowLeftSrc`** draws an image along **`left: 0`** inside the same row (above base and strip overlay).
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
  /** `split-vertical` only: second image stacked on top of `src` inside the same row. */
  overlaySrc?: string;
  overlayBackgroundSize?: string;
  overlayBackgroundPosition?: string;
  /** Band height for the overlay (e.g. native art height); defaults to full row. */
  overlayHeightPx?: number;
  /** Pin the overlay strip to the top (default) or bottom of the row. */
  overlayVerticalAlign?: "top" | "bottom";
  /** `split-vertical` only: native `<img>` (absolutely positioned), above base + `overlaySrc`. */
  rowLeftSrc?: string;
  /** Passed to the image as `object-fit` (e.g. `contain`, `cover`). */
  rowLeftBackgroundSize?: string;
  /** Passed to the image as `object-position` (e.g. `left center`). */
  rowLeftBackgroundPosition?: string;
  /** Column width for the left inset (px). */
  rowLeftWidthPx?: number;
  /** Horizontal offset from the row’s left edge (px); negative moves past the edge. Default `0`. */
  rowLeftOffsetXPx?: number;
  /** Distance from the row’s bottom edge to the `<img>`’s bottom (px). Default `60`. */
  rowLeftBottomPx?: number;
};

/** `split-horizontal`: columns left → right. `split-vertical`: rows top → bottom. */
export const LANDING_BACKGROUND_LAYOUT: LandingBackgroundLayout = "split-vertical";

export const LANDING_BACKGROUND_LAYERS: LandingBackgroundLayer[] = [
  {
    src: "/images/backgrounds/bg1.png",
    backgroundSize: "cover",
    backgroundPosition: "center",
    splitRowPx: 660,
    overlaySrc: "/images/backgrounds/e0haut.png",
    overlayBackgroundSize: "cover",
    overlayBackgroundPosition: "center top",
    overlayHeightPx: 437,
    rowLeftSrc: "/images/backgrounds/h1.png",
    rowLeftBackgroundSize: "contain",
    rowLeftBackgroundPosition: "left center",
    rowLeftWidthPx: 224,
    rowLeftOffsetXPx: -50,
    rowLeftBottomPx: 60,
  },
  {
    src: "/images/backgrounds/bg2.png",
    backgroundSize: "cover",
    backgroundPosition: "center",
    splitRowPx: 630,
    overlaySrc: "/images/backgrounds/e1haut.png",
    overlayBackgroundSize: "cover",
    overlayBackgroundPosition: "center bottom",
    overlayHeightPx: 547,
    overlayVerticalAlign: "bottom",
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
    overlaySrc: "/images/backgrounds/e1haut.png",
    overlayBackgroundSize: "cover",
    overlayBackgroundPosition: "center bottom",
    overlayHeightPx: 547,
    overlayVerticalAlign: "bottom",
    rowLeftSrc: "/images/backgrounds/h1.png",
    rowLeftBackgroundSize: "contain",
    rowLeftBackgroundPosition: "left center",
    rowLeftWidthPx: 224,
    rowLeftOffsetXPx: -50,
    rowLeftBottomPx: 60,
  },
];
