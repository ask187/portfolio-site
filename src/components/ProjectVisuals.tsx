import React from "react";

type VisualProps = { className?: string };

// 01 — Server-authoritative VR sandbox
// Central authority node + 3 client satellites, dashed peer-to-peer (forbidden) lines.
export function VRVisual({ className }: VisualProps) {
  const accent = "139,92,246"; // violet
  return (
    <svg
      viewBox="0 0 500 400"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden
    >
      <line x1="250" y1="100" x2="150" y2="240" stroke={`rgba(${accent},0.22)`} strokeWidth="1.2" />
      <line x1="250" y1="100" x2="350" y2="240" stroke={`rgba(${accent},0.22)`} strokeWidth="1.2" />
      <line x1="250" y1="100" x2="250" y2="300" stroke={`rgba(${accent},0.22)`} strokeWidth="1.2" />
      <line x1="150" y1="240" x2="350" y2="240" stroke={`rgba(${accent},0.10)`} strokeWidth="1" strokeDasharray="4 4" />
      <line x1="150" y1="240" x2="250" y2="300" stroke={`rgba(${accent},0.10)`} strokeWidth="1" strokeDasharray="4 4" />
      <line x1="350" y1="240" x2="250" y2="300" stroke={`rgba(${accent},0.10)`} strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="250" cy="100" r="22" fill={`rgba(${accent},0.22)`} stroke={`rgba(${accent},0.55)`} strokeWidth="1.2" />
      <circle cx="250" cy="100" r="6" fill={`rgb(${accent})`} />
      <circle cx="150" cy="240" r="14" fill={`rgba(${accent},0.12)`} stroke={`rgba(${accent},0.28)`} strokeWidth="1" />
      <circle cx="150" cy="240" r="4" fill={`rgba(${accent},0.7)`} />
      <circle cx="350" cy="240" r="14" fill={`rgba(${accent},0.12)`} stroke={`rgba(${accent},0.28)`} strokeWidth="1" />
      <circle cx="350" cy="240" r="4" fill={`rgba(${accent},0.7)`} />
      <circle cx="250" cy="300" r="14" fill={`rgba(${accent},0.12)`} stroke={`rgba(${accent},0.28)`} strokeWidth="1" />
      <circle cx="250" cy="300" r="4" fill={`rgba(${accent},0.7)`} />
    </svg>
  );
}

// 02 — Arcanum (mandala / rings + spikes)
export function ArcanumVisual({ className }: VisualProps) {
  return (
    <svg viewBox="0 0 500 400" fill="none" className={className} aria-hidden>
      <g transform="translate(250 200)">
        <path
          d="M0,-128 A128,128 0 1,1 0,128 A128,128 0 1,1 0,-128 M0,-106 A106,106 0 1,0 0,106 A106,106 0 1,0 0,-106Z"
          fill="#10b981"
          fillOpacity="0.16"
          fillRule="evenodd"
        />
        <path d="M0,-120 A120,120 0 1,1 0,120 A120,120 0 1,1 0,-120" stroke="#10b981" strokeWidth="4" />
        <path d="M0,-98 A98,98 0 1,1 0,98 A98,98 0 1,1 0,-98" stroke="#10b981" strokeWidth="3" />
        <path d="M0,-78 A78,78 0 1,1 0,78 A78,78 0 1,1 0,-78" stroke="#10b981" strokeWidth="2.5" opacity="0.9" />
        <path
          d="M0,-150 L12,-120 L0,-90 L-12,-120 Z
             M150,0 L120,12 L90,0 L120,-12 Z
             M0,150 L12,120 L0,90 L-12,120 Z
             M-150,0 L-120,12 L-90,0 L-120,-12 Z
             M88,-88 L108,-96 L96,-108 L88,-88 Z
             M88,88 L96,108 L108,96 L88,88 Z
             M-88,88 L-108,96 L-96,108 L-88,88 Z
             M-88,-88 L-96,-108 L-108,-96 L-88,-88 Z"
          fill="#10b981"
        />
        <path d="M0,-94 L81,46 H-81 Z" stroke="#10b981" strokeWidth="4" />
        <path d="M0,-104 L0,122" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M-73,0 H73" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
        <path d="M0,96 L18,46 H-18 Z" stroke="#10b981" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M0,-34 A34,34 0 1,1 0,34 A34,34 0 1,1 0,-34" stroke="#10b981" strokeWidth="3" />
        <path d="M0,-10 A10,10 0 1,1 0,10 A10,10 0 1,1 0,-10Z" fill="#10b981" />
        <path d="M0,-132 A132,132 0 1,1 0,132 A132,132 0 1,1 0,-132" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

// 03 — Mnemo (mnemonic association graph)
// Word-card nodes connected by curved associative lines — memory chain.
export function MnemoVisual({ className }: VisualProps) {
  const accent = "6,182,212"; // cyan
  const cards = [
    { x: 90, y: 150, w: 78, h: 36 },
    { x: 220, y: 80, w: 80, h: 36 },
    { x: 360, y: 130, w: 78, h: 36 },
    { x: 150, y: 280, w: 80, h: 36 },
    { x: 330, y: 290, w: 80, h: 36 },
    { x: 250, y: 200, w: 96, h: 42 }, // central / "anchor" card
  ];
  const links: [number, number][] = [
    [0, 5],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
    [0, 1],
    [1, 2],
    [3, 4],
  ];
  const center = (c: { x: number; y: number; w: number; h: number }) => ({
    cx: c.x + c.w / 2,
    cy: c.y + c.h / 2,
  });
  return (
    <svg viewBox="0 0 500 400" className={className} aria-hidden>
      <defs>
        <linearGradient id="mnemoLink" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={`rgba(${accent},0.05)`} />
          <stop offset="50%" stopColor={`rgba(${accent},0.4)`} />
          <stop offset="100%" stopColor={`rgba(${accent},0.05)`} />
        </linearGradient>
      </defs>
      {/* curved association lines */}
      {links.map(([a, b], i) => {
        const A = center(cards[a]);
        const B = center(cards[b]);
        const mx = (A.cx + B.cx) / 2;
        const my = (A.cy + B.cy) / 2 - 25;
        return (
          <path
            key={i}
            d={`M${A.cx},${A.cy} Q${mx},${my} ${B.cx},${B.cy}`}
            fill="none"
            stroke="url(#mnemoLink)"
            strokeWidth="1.2"
          />
        );
      })}
      {/* word cards */}
      {cards.map((c, i) => {
        const isAnchor = i === 5;
        return (
          <g key={i}>
            <rect
              x={c.x}
              y={c.y}
              width={c.w}
              height={c.h}
              rx="6"
              fill={`rgba(${accent},${isAnchor ? 0.18 : 0.08})`}
              stroke={`rgba(${accent},${isAnchor ? 0.6 : 0.32})`}
              strokeWidth={isAnchor ? 1.5 : 1}
            />
            {/* faux text lines on each card */}
            <rect x={c.x + 8} y={c.y + 10} width={c.w - 36} height="3" rx="1.5" fill={`rgba(${accent},${isAnchor ? 0.75 : 0.4})`} />
            <rect x={c.x + 8} y={c.y + 19} width={c.w - 24} height="2" rx="1" fill={`rgba(${accent},${isAnchor ? 0.4 : 0.22})`} />
          </g>
        );
      })}
      {/* small floating glyphs around the anchor */}
      <circle cx="170" cy="220" r="3" fill={`rgba(${accent},0.45)`} />
      <circle cx="380" cy="220" r="3" fill={`rgba(${accent},0.45)`} />
      <circle cx="260" cy="350" r="3" fill={`rgba(${accent},0.45)`} />
      <circle cx="260" cy="50" r="3" fill={`rgba(${accent},0.45)`} />
    </svg>
  );
}

// 04 — Canvas RAG (document stack + waveform + chat bubble)
export function CanvasRagVisual({ className }: VisualProps) {
  const accent = "236,72,153"; // pink
  return (
    <svg viewBox="0 0 500 400" className={className} aria-hidden>
      <defs>
        <linearGradient id="ragWave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={`rgba(${accent},0)`} />
          <stop offset="30%" stopColor={`rgba(${accent},0.55)`} />
          <stop offset="70%" stopColor={`rgba(${accent},0.55)`} />
          <stop offset="100%" stopColor={`rgba(${accent},0)`} />
        </linearGradient>
      </defs>

      {/* Document stack (Canvas course material) */}
      {[
        { x: 60, y: 90, rot: -4 },
        { x: 72, y: 110, rot: -1 },
        { x: 84, y: 130, rot: 2 },
      ].map((doc, i) => (
        <g key={i} transform={`rotate(${doc.rot} ${doc.x + 50} ${doc.y + 60})`}>
          <rect
            x={doc.x}
            y={doc.y}
            width="100"
            height="120"
            rx="6"
            fill={`rgba(${accent},${0.05 + i * 0.02})`}
            stroke={`rgba(${accent},${0.18 + i * 0.06})`}
            strokeWidth="1"
          />
          {/* lines on doc */}
          {[0, 1, 2, 3, 4].map((j) => (
            <rect
              key={j}
              x={doc.x + 10}
              y={doc.y + 18 + j * 14}
              width={j === 4 ? 56 : 80}
              height="3"
              rx="1.5"
              fill={`rgba(${accent},${0.18 + i * 0.05})`}
            />
          ))}
        </g>
      ))}

      {/* Waveform — audio I/O across the page */}
      <g>
        {Array.from({ length: 36 }).map((_, i) => {
          const x = 200 + i * 7;
          const heightPct = [
            0.2, 0.4, 0.6, 0.8, 0.55, 0.35, 0.65, 0.9, 0.5, 0.3,
            0.45, 0.7, 0.85, 0.4, 0.2, 0.55, 0.75, 0.95, 0.6, 0.4,
            0.25, 0.5, 0.7, 0.45, 0.3, 0.55, 0.8, 0.6, 0.35, 0.2,
            0.4, 0.65, 0.5, 0.3, 0.2, 0.15,
          ][i];
          const h = 6 + heightPct * 60;
          return (
            <rect
              key={i}
              x={x}
              y={250 - h / 2}
              width="3"
              height={h}
              rx="1.5"
              fill={`rgba(${accent},${0.35 + heightPct * 0.45})`}
            />
          );
        })}
      </g>

      {/* Chat bubble — top right */}
      <g transform="translate(310 80)">
        <path
          d="M0,0 H140 a14,14 0 0 1 14,14 V58 a14,14 0 0 1 -14,14 H30 L18,84 L20,72 H0 a14,14 0 0 1 -14,-14 V14 A14,14 0 0 1 0,0 Z"
          fill={`rgba(${accent},0.10)`}
          stroke={`rgba(${accent},0.45)`}
          strokeWidth="1"
        />
        <rect x="12" y="20" width="120" height="3" rx="1.5" fill={`rgba(${accent},0.55)`} />
        <rect x="12" y="32" width="100" height="3" rx="1.5" fill={`rgba(${accent},0.35)`} />
        <rect x="12" y="44" width="80" height="3" rx="1.5" fill={`rgba(${accent},0.25)`} />
      </g>

      {/* Curved retrieval arrow from docs to chat */}
      <path
        d="M170,160 Q260,40 320,90"
        fill="none"
        stroke={`rgba(${accent},0.35)`}
        strokeWidth="1.2"
        strokeDasharray="2 5"
      />
    </svg>
  );
}

// 05 — Clinical NLP (three urgency clusters: stable / deteriorating / critical)
export function ClinicalVisual({ className }: VisualProps) {
  return (
    <svg viewBox="0 0 500 400" className={className} aria-hidden>
      <defs>
        <radialGradient id="cg1" cx="30%" cy="40%">
          <stop offset="0%" stopColor="rgba(16,185,129,0.16)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cg2" cx="60%" cy="50%">
          <stop offset="0%" stopColor="rgba(251,191,36,0.13)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cg3" cx="75%" cy="35%">
          <stop offset="0%" stopColor="rgba(244,63,94,0.16)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="200" rx="120" ry="100" fill="url(#cg1)" />
      <ellipse cx="280" cy="210" rx="100" ry="90" fill="url(#cg2)" />
      <ellipse cx="370" cy="170" rx="70" ry="60" fill="url(#cg3)" />
      <path d="M210,100 Q230,200 220,300" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 5" />
      <path d="M330,90 Q310,180 340,290" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 5" />
      {/* Stable */}
      {[
        [120, 180],
        [140, 220],
        [170, 195],
        [100, 210],
        [160, 250],
        [130, 165],
      ].map(([cx, cy], i) => (
        <circle key={`s${i}`} cx={cx} cy={cy} r="3.2" fill="rgba(16,185,129,0.6)" />
      ))}
      {/* Deteriorating */}
      {[
        [260, 190],
        [290, 230],
        [270, 210],
        [310, 200],
        [285, 175],
      ].map(([cx, cy], i) => (
        <circle key={`d${i}`} cx={cx} cy={cy} r="3.2" fill="rgba(251,191,36,0.65)" />
      ))}
      {/* Critical */}
      {[
        [370, 160],
        [380, 180],
        [360, 170],
        [395, 150],
      ].map(([cx, cy], i) => (
        <circle key={`c${i}`} cx={cx} cy={cy} r="3.5" fill="rgba(244,63,94,0.75)" />
      ))}
    </svg>
  );
}

// 06 — Puzzle Engine (concentric vector-distance rings around target + warm/cold points)
export function PuzzleVisual({ className }: VisualProps) {
  const accent = "59,130,246"; // blue
  return (
    <svg viewBox="0 0 500 400" className={className} aria-hidden>
      <defs>
        <radialGradient id="vecCenter" cx="50%" cy="50%">
          <stop offset="0%" stopColor={`rgba(${accent},0.22)`} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx="250" cy="200" r="140" fill="url(#vecCenter)" />
      <circle cx="250" cy="200" r="30" fill="none" stroke={`rgba(${accent},0.22)`} strokeWidth="1" />
      <circle cx="250" cy="200" r="65" fill="none" stroke={`rgba(${accent},0.15)`} strokeWidth="1" />
      <circle cx="250" cy="200" r="105" fill="none" stroke={`rgba(${accent},0.09)`} strokeWidth="1" />
      <circle cx="250" cy="200" r="140" fill="none" stroke={`rgba(${accent},0.05)`} strokeWidth="1" />
      {/* target */}
      <circle cx="250" cy="200" r="6" fill={`rgb(${accent})`} />
      <circle cx="250" cy="200" r="13" fill="none" stroke={`rgba(${accent},0.45)`} strokeWidth="1" />
      {/* warm guess (close) */}
      <line x1="250" y1="200" x2="265" y2="190" stroke="rgba(16,185,129,0.5)" strokeWidth="1.2" />
      <circle cx="265" cy="190" r="4" fill="rgba(16,185,129,0.85)" />
      {/* medium guess */}
      <line x1="250" y1="200" x2="290" y2="175" stroke="rgba(16,185,129,0.32)" strokeWidth="1" />
      <circle cx="290" cy="175" r="4" fill="rgba(16,185,129,0.6)" />
      {/* lukewarm */}
      <line x1="250" y1="200" x2="340" y2="230" stroke="rgba(251,191,36,0.28)" strokeWidth="1" />
      <circle cx="340" cy="230" r="4" fill="rgba(251,191,36,0.55)" />
      {/* cold */}
      <line x1="250" y1="200" x2="160" y2="120" stroke="rgba(244,63,94,0.22)" strokeWidth="1" />
      <circle cx="160" cy="120" r="4" fill="rgba(244,63,94,0.5)" />
    </svg>
  );
}

const VISUAL_MAP: Record<string, React.ComponentType<VisualProps>> = {
  "vr-sandbox": VRVisual,
  arcanum: ArcanumVisual,
  mnemo: MnemoVisual,
  "canvas-rag": CanvasRagVisual,
  "clinical-nlp": ClinicalVisual,
  "puzzle-engine": PuzzleVisual,
};

export function getProjectVisual(id: string) {
  return VISUAL_MAP[id] ?? null;
}
