import {
  LANDING_BACKGROUND_LAYERS,
  LANDING_BACKGROUND_LAYOUT,
} from "./landingBackgroundLayers";

/** Pixel offset from the top of the landing section to the start of band `index` (0-based). */
export function landingSplitBandTopPx(bandIndex: number): number {
  if (LANDING_BACKGROUND_LAYOUT !== "split-vertical") return 0;
  let y = 0;
  for (let i = 0; i < bandIndex; i++) {
    const px = LANDING_BACKGROUND_LAYERS[i]?.splitRowPx;
    y += typeof px === "number" ? px : 0;
  }
  return y;
}

/** Row height for band `index` when `splitRowPx` is set. */
export function landingSplitBandHeightPx(bandIndex: number): number {
  const px = LANDING_BACKGROUND_LAYERS[bandIndex]?.splitRowPx;
  return typeof px === "number" ? px : 0;
}
