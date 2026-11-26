import { BarChartData, PieChartData } from "./types";

export function PieChart({ data, onSliceClick }: { data: PieChartData | undefined; onSliceClick?: (label: string) => void }) {
  if (!data || data.length === 0) return null;
  const total = data.reduce((s, d) => s + d.value, 0);
  let cum = 0;
  const cx = 75, cy = 75, r = 60;

  const slices = data.map((d) => {
    const a1 = (cum / total) * 2 * Math.PI - Math.PI / 2;
    cum += d.value;
    const a2 = (cum / total) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    return { ...d, path: `M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${d.value / total > 0.5 ? 1 : 0},1 ${x2.toFixed(1)},${y2.toFixed(1)} Z` };
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
      <svg width="150" height="150" viewBox="0 0 150 150" style={{ flexShrink: 0 }}>
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} stroke="white" strokeWidth="2.5" style={{ cursor: "pointer", transition: "opacity .15s" }}
            onClick={() => onSliceClick?.(s.label)}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")} />
        ))}
        <circle cx={cx} cy={cy} r="24" fill="white" />
        <text x={cx} y={cy - 3} textAnchor="middle" fontSize="8.5" fill="#94a3b8" fontFamily="Sarabun,sans-serif">ทั้งหมด</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="12" fontWeight="700" fill="#475569" fontFamily="Sarabun,sans-serif">100%</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => onSliceClick?.(d.label)}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12.5, color: "#64748b", flex: 1 }}>{d.label}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#334155", minWidth: 36, textAlign: "right" }}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BarChart({ data, onBarClick }: { data: BarChartData | undefined; onBarClick?: (label: string, type: "total" | "have" | "notHave") => void }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.total));
  if (max <= 0) return null;
  const H = 150;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: H + 50, paddingTop: 20 }}>
      {data.map((d, i) => {
        const hTotal = d.total > 0 ? Math.max(3, Math.round((d.total / max) * H)) : 0;
        const hHave = d.have > 0 ? Math.max(3, Math.round((d.have / max) * H)) : 0;
        const hNotHave = d.notHave > 0 ? Math.max(3, Math.round((d.notHave / max) * H)) : 0;
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
            <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: H }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flex: 1 }}>
                {d.total > 0 && <span style={{ fontSize: 10, color: "#94a3b8" }}>{d.total}</span>}
                <div style={{
                  width: "2rem", height: hTotal, borderRadius: "4px 4px 0 0",
                  background: "linear-gradient(to top,#5491b5,#7ec5e8)",
                  transition: "opacity .15s", cursor: "pointer",
                }}
                  onClick={() => onBarClick?.(d.label, "total")}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flex: 1 }}>
                {d.have > 0 && <span style={{ fontSize: 10, color: "#94a3b8" }}>{d.have}</span>}
                <div style={{
                  width: "2rem", height: hHave, borderRadius: "4px 4px 0 0",
                  background: "linear-gradient(to top,#72b49a,#95d1b5)",
                  transition: "opacity .15s", cursor: "pointer",
                }}
                  onClick={() => onBarClick?.(d.label, "have")}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flex: 1 }}>
                {d.notHave > 0 && <span style={{ fontSize: 10, color: "#94a3b8" }}>{d.notHave}</span>}
                <div style={{
                  width: "2rem", height: hNotHave, borderRadius: "4px 4px 0 0",
                  background: "linear-gradient(to top,#e07a7a,#f0a8a8)",
                  transition: "opacity .15s", cursor: "pointer",
                }}
                  onClick={() => onBarClick?.(d.label, "notHave")}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                />
              </div>
            </div>
            <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{d.label}</span>
            <div style={{ display: "flex", gap: 6, fontSize: 9, color: "#64748b" }}>
              <span>ยอดรวม</span>
              <span>Have</span>
              <span>Not Have</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
