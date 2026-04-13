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
    return (
      <div
        className="pointer-events-none absolute inset-0 flex flex-col overflow-hidden"
        aria-hidden
      >
        {layers.map((layer, index) => {
          const fixedRow =
            typeof layer.splitRowPx === "number" && layer.splitRowPx > 0;
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
                ...(fixedRow ? { height: layer.splitRowPx, flex: "0 0 auto" } : {}),
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
