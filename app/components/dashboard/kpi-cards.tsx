export function KpiCards({
  total,
  haveCount,
  notHaveCount,
  onCardClick,
}: {
  total: number;
  haveCount: number;
  notHaveCount: number;
  onCardClick: (type: "all" | "have" | "notHave") => void;
}) {
  const havePct = total > 0 ? Math.round((haveCount / total) * 100) : 0;
  const notHavePct = total > 0 ? Math.round((notHaveCount / total) * 100) : 0;

  const cards = [
    { label: "รายการทั้งหมด", val: total, sub: "ข้อมูลล่าสุด", bar: "#7bafd4", pct: 100, type: "all" as const },
    { label: "Have", val: haveCount, sub: `${havePct}% ของทั้งหมด`, bar: "#72b49a", pct: havePct, type: "have" as const },
    { label: "Not Have", val: notHaveCount, sub: `${notHavePct}% ของทั้งหมด`, bar: "#e07a7a", pct: notHavePct || 2, type: "notHave" as const },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
      {cards.map((c, i) => (
        <div key={i}
          onClick={() => onCardClick(c.type)}
          style={{ background: "white", borderRadius: 16, border: "1px solid #e8ecf2", boxShadow: "0 1px 4px rgba(0,0,0,.04)", padding: "20px 22px", cursor: "pointer", transition: "box-shadow .15s, transform .15s" }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.04)"; e.currentTarget.style.transform = "none"; }}
        >
          <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 10px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{c.label}</p>
          <p style={{ fontSize: 32, fontWeight: 800, color: "#1e293b", margin: "0 0 4px", lineHeight: 1 }}>{c.val}</p>
          <p style={{ fontSize: 12, color: "#94a3b8", margin: "0 0 16px" }}>{c.sub}</p>
          <div style={{ height: 5, background: "#eef2f7", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${c.pct}%`, background: c.bar, borderRadius: 99, transition: "width 1s ease" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
