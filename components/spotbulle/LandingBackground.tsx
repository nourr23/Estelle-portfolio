import type { CSSProperties } from "react";
import {
  LANDING_BACKGROUND_LAYERS,
  LANDING_BACKGROUND_LAYOUT,
} from "@/lib/landingBackgroundLayers";

export default function LandingBackground() {
  const layers = LANDING_BACKGROUND_LAYERS;
  if (layers.length === 0) return null;

  const layout = LANDING_BACKGROUND_LAYOUT;

  const layerStyle = (layer: (typeof layers)[number]) => ({
    backgroundImage: `url(${layer.src})`,
    backgroundSize: layer.backgroundSize ?? "cover",
    backgroundPosition: layer.backgroundPosition ?? "center",
    mixBlendMode: layer.mixBlendMode,
    opacity: layer.opacity,
  });

  if (layout === "split-horizontal") {
    return (
      <div
        className="pointer-events-none absolute inset-0 flex flex-row overflow-hidden"
        aria-hidden
      >
        {layers.map((layer, index) => (
          <div
            key={`${layer.src}-${index}`}
            className="min-w-0 flex-1 bg-no-repeat"
            style={layerStyle(layer)}
          />
        ))}
      </div>
    );
  }

  if (layout === "split-vertical") {
    const overlayStyle = (layer: (typeof layers)[number]) =>
      layer.overlaySrc
        ? {
            backgroundImage: `url(${layer.overlaySrc})`,
            backgroundSize: layer.overlayBackgroundSize ?? "cover",
            backgroundPosition:
              layer.overlayBackgroundPosition ??
              (layer.overlayVerticalAlign === "bottom"
                ? "center bottom"
                : "center top"),
          }
        : null;
    const rowBottomStyle = (layer: (typeof layers)[number]) =>
      layer.rowBottomSrc
        ? {
            backgroundImage: `url(${layer.rowBottomSrc})`,
            backgroundSize: layer.rowBottomBackgroundSize ?? "cover",
            backgroundPosition:
              layer.rowBottomBackgroundPosition ?? "center bottom",
          }
        : null;

    return (
      <div
        className="pointer-events-none absolute inset-0 flex flex-col overflow-hidden"
        aria-hidden
      >
        {layers.map((layer, index) => {
          const fixedRow =
            typeof layer.splitRowPx === "number" && layer.splitRowPx > 0;
          const rowFlex = fixedRow
            ? { height: layer.splitRowPx, flex: "0 0 auto" as const }
            : {};

          if (layer.overlaySrc || layer.rowBottomSrc || layer.rowLeftSrc) {
            const oh = layer.overlaySrc ? overlayStyle(layer) : null;
            const bh = layer.rowBottomSrc ? rowBottomStyle(layer) : null;
            return (
              <div
                key={`${layer.src}-${index}`}
                className={
                  fixedRow
                    ? "relative shrink-0 overflow-hidden"
                    : "relative min-h-0 flex-1 overflow-hidden"
                }
                style={rowFlex}
              >
                <div
                  className="absolute inset-0 bg-no-repeat"
                  style={layerStyle(layer)}
                />
                {bh ? (
                  <div
                    className="absolute bottom-0 left-0 right-0 z-1 bg-no-repeat"
                    style={{
                      ...bh,
                      height:
                        typeof layer.rowBottomHeightPx === "number"
                          ? layer.rowBottomHeightPx
                          : "100%",
                    }}
                  />
                ) : null}
                {oh ? (
                  <div
                    className={
                      layer.overlayVerticalAlign === "bottom"
                        ? "absolute bottom-0 left-0 right-0 z-2 bg-no-repeat"
                        : "absolute left-0 right-0 top-0 z-2 bg-no-repeat"
                    }
                    style={{
                      ...oh,
                      height:
                        typeof layer.overlayHeightPx === "number"
                          ? layer.overlayHeightPx
                          : "100%",
                    }}
                  />
                ) : null}
                {layer.rowLeftSrc ? (
                  <img
                    src={layer.rowLeftSrc}
                    alt=""
                    decoding="async"
                    draggable={false}
                    className="pointer-events-none absolute z-3 h-auto select-none"
                    style={{
                      left:
                        typeof layer.rowLeftOffsetXPx === "number"
                          ? layer.rowLeftOffsetXPx
                          : 0,
                      bottom:
                        typeof layer.rowLeftBottomPx === "number"
                          ? layer.rowLeftBottomPx
                          : 60,
                      width:
                        typeof layer.rowLeftWidthPx === "number"
                          ? layer.rowLeftWidthPx
                          : 224,
                      objectFit: (layer.rowLeftBackgroundSize ??
                        "contain") as CSSProperties["objectFit"],
                      objectPosition:
                        layer.rowLeftBackgroundPosition ?? "left center",
                    }}
                  />
                ) : null}
              </div>
            );
          }

          return (
            <div
              key={`${layer.src}-${index}`}
              className={
                fixedRow
                  ? "shrink-0 bg-no-repeat"
                  : "min-h-0 flex-1 bg-no-repeat"
              }
              style={{
                ...layerStyle(layer),
                ...rowFlex,
              }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {layers.map((layer, index) => (
        <div
          key={`${layer.src}-${index}`}
          className="absolute inset-0 bg-no-repeat"
          style={{
            zIndex: index,
            ...layerStyle(layer),
          }}
        />
      ))}
    </div>
  );
}
