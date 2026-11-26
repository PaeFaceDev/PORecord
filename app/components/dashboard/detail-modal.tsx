import { Icon } from "./icons";
import { PORow } from "./types";

export function DetailModal({ row, onClose }: { row: PORow; onClose: () => void }) {
  const fields = [
    { label: "PO", value: row.po },
    { label: "Item", value: row.item },
    { label: "Plant", value: row.plant },
    { label: "PO Type", value: row.poType },
    { label: "สถานะ", value: <span style={{ background: "#fff1f2", color: "#e11d48", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{row.isStatus}</span> },
    { label: "สถานะรับ", value: row.statusReceivingName ? <span style={{ background: "#f0faf4", color: "#2d7a5a", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{row.statusReceivingName}</span> : <span style={{ background: "#fff7ed", color: "#ea580c", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>-</span> },
    { label: "รหัสสถานะรับ", value: row.statusReceivingCode ? <span style={{ background: "#f0faf4", color: "#2d7a5a", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{row.statusReceivingCode}</span> : <span style={{ background: "#fff7ed", color: "#ea580c", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>-</span> },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(30,41,59,.22)", backdropFilter: "blur(3px)" }} onClick={onClose} />
      <div style={{ position: "relative", background: "white", borderRadius: 18, boxShadow: "0 20px 60px rgba(0,0,0,.14)", width: "100%", maxWidth: 460, overflow: "hidden", animation: "mi .18s ease-out" }}>
        <style>{`@keyframes mi{from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:none}}`}</style>
        <div style={{ padding: "20px 22px 18px", borderBottom: "1px solid #f1f4f8", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 3px" }}>Index: {row.index}</p>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", margin: 0, fontFamily: "monospace" }}>{row.material}</h3>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon.close />
          </button>
        </div>
        <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {fields.map((f, i) => (
              <div key={i} style={{ background: "#f8fafc", borderRadius: 12, padding: "12px 14px" }}>
                <p style={{ fontSize: 10.5, color: "#94a3b8", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{f.label}</p>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>{f.value}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", borderRadius: 12, padding: "14px" }}>
            <p style={{ fontSize: 10.5, color: "#e11d48", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Rescheduling Date</p>
            <p style={{ fontSize: 18, fontWeight: 800, color: "#e11d48", margin: 0 }}>{row.reschedulingDate}</p>
          </div>
          <div style={{ background: "#f8fafc", borderRadius: 12, padding: "14px" }}>
            <p style={{ fontSize: 10.5, color: "#94a3b8", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Create Date</p>
            <p style={{ fontSize: 13, color: "#475569", margin: 0 }}>{row.createDate}</p>
          </div>
        </div>
        <div style={{ padding: "14px 22px", borderTop: "1px solid #f1f4f8", display: "flex", justifyContent: "flex-end", gap: 8, background: "#fafbfc" }}>
          <button onClick={onClose} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #e2e8f0", background: "white", color: "#64748b", fontSize: 13, cursor: "pointer", fontFamily: "Sarabun,sans-serif" }}>ปิด</button>
          <button style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: "#3d5a73", color: "white", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "Sarabun,sans-serif" }}>แก้ไข</button>
        </div>
      </div>
    </div>
  );
}
