import type { SystemMap } from "../data/systems";

export type Orientation = "horizontal" | "vertical";

const NODE_W = 184;
const NODE_H = 64;
const GAP_MAIN = 56;
const GAP_CROSS = 48;
const PAD = 4;

export interface PlacedNode {
  id: string;
  label: string;
  detail: string;
  x: number;
  y: number;
}

export interface PlacedEdge {
  key: string;
  d: string;
}

export interface MapLayout {
  width: number;
  height: number;
  nodes: PlacedNode[];
  edges: PlacedEdge[];
}

// Horizontal maps flow along columns; vertical maps swap the axes so the
// data flows top to bottom and the diagram fits a phone screen.
export function layoutMap(map: SystemMap, orientation: Orientation): MapLayout {
  const vertical = orientation === "vertical";
  const mainCount = Math.max(...map.nodes.map((n) => n.col)) + 1;
  const crossCount = Math.max(...map.nodes.map((n) => n.row)) + 1;

  const place = (col: number, row: number) => {
    const main = col * ((vertical ? NODE_H : NODE_W) + GAP_MAIN);
    const cross = row * ((vertical ? NODE_W : NODE_H) + GAP_CROSS);
    return vertical ? { x: PAD + cross, y: PAD + main } : { x: PAD + main, y: PAD + cross };
  };

  const nodes = map.nodes.map((n) => ({ id: n.id, label: n.label, detail: n.detail, ...place(n.col, n.row) }));
  const byId = new Map(nodes.map((n) => [n.id, n]));

  const edges = map.edges.flatMap((edge) => {
    const a = byId.get(edge.from);
    const b = byId.get(edge.to);
    if (!a || !b) return [];
    return [{ key: `${edge.from}-${edge.to}`, d: connect(a, b) }];
  });

  const mainSize = mainCount * (vertical ? NODE_H : NODE_W) + (mainCount - 1) * GAP_MAIN;
  const crossSize = crossCount * (vertical ? NODE_W : NODE_H) + (crossCount - 1) * GAP_CROSS;

  return {
    width: PAD * 2 + (vertical ? crossSize : mainSize),
    height: PAD * 2 + (vertical ? mainSize : crossSize),
    nodes,
    edges,
  };
}

// Edges only join neighbouring cells, so a straight segment between the
// facing sides of the two boxes is always enough.
function connect(a: PlacedNode, b: PlacedNode) {
  const acx = a.x + NODE_W / 2;
  const acy = a.y + NODE_H / 2;
  const bcx = b.x + NODE_W / 2;
  const bcy = b.y + NODE_H / 2;

  if (Math.abs(acy - bcy) < 1) {
    const [x1, x2] = bcx > acx ? [a.x + NODE_W, b.x] : [a.x, b.x + NODE_W];
    return `M ${x1} ${acy} L ${x2} ${bcy}`;
  }

  const [y1, y2] = bcy > acy ? [a.y + NODE_H, b.y] : [a.y, b.y + NODE_H];
  return `M ${acx} ${y1} L ${bcx} ${y2}`;
}

export const nodeSize = { width: NODE_W, height: NODE_H };
