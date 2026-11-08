import type { SystemMap } from "../data/systems";
import { layoutMap, nodeSize, type Orientation } from "../helpers/mapLayout";

export default function MapDiagram({
  map,
  orientation,
  className = "",
}: {
  map: SystemMap;
  orientation: Orientation;
  className?: string;
}) {
  const layout = layoutMap(map, orientation);
  const description = map.nodes.map((n) => `${n.label} (${n.detail})`).join(", ");

  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label={`${map.name} system diagram: ${description}`}
    >
      <g>
        {layout.edges.map((edge, i) => (
          <g key={edge.key}>
            <path d={edge.d} className="map-edge" />
            <path
              d={edge.d}
              pathLength={100}
              className="map-packet"
              style={{ animationDelay: `${i * -0.37}s` }}
            />
          </g>
        ))}
      </g>

      {layout.nodes.map((node) => (
        <g key={node.id} className="map-node" transform={`translate(${node.x} ${node.y})`}>
          <rect width={nodeSize.width} height={nodeSize.height} rx={6} />
          <text x={16} y={27} className="map-label">
            {node.label}
          </text>
          <text x={16} y={48} className="map-detail">
            {node.detail}
          </text>
        </g>
      ))}
    </svg>
  );
}
