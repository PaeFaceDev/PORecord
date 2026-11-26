import { Icon } from "./icons";
import { PORow } from "./types";

type KpiDetailModalProps = {
  title: string;
  rows: PORow[];
  accentColor: string;
  onClose: () => void;
};

export function KpiDetailModal({ title, rows, accentColor, onClose }: KpiDetailModalProps) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(30,41,59,.22)", backdropFilter: "blur(3px)" }} onClick={onClose} />
      <div style={{ position: "relative", background: "white", borderRadius: 18, boxShadow: "0 20px 60px rgba(0,0,0,.14)", width: "100%", maxWidth: 900, maxHeight: "80vh", overflow: "hidden", animation: "mi .18s ease-out", display: "flex", flexDirection: "column" }}>
        <style>{`@keyframes mi{from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:none}}`}</style>

        {/* Header */}
        <div style={{ padding: "18px 22px 14px", borderBottom: "1px solid #f1f4f8", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ background: accentColor + "18", color: accentColor, border: `1px solid ${accentColor}33`, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{rows.length} รายการ</span>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", margin: 0 }}>{title}</h3>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon.close />
          </button>
        </div>

        {/* Table */}
        <div style={{ overflow: "auto", flex: 1 }}>
          {rows.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px", color: "#94a3b8", fontSize: 13 }}>ไม่พบข้อมูล</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
                <tr style={{ background: "#f8fafc" }}>
                  {["#", "PO", "Item", "Plant", "PO Type", "Material", "Status", "Status Receiving", "Status Receiving Code", "Create Date", "Reschedule Date"].map(h => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={`${row.po}-${row.item}-${ri}`}
                    style={{ borderTop: "1px solid #f0f3f8", background: ri % 2 === 1 ? "#fafbfd" : "white" }}
                  >
                    <td style={{ padding: "9px 14px", fontSize: 12, color: "#94a3b8" }}>{ri + 1}</td>
                    <td style={{ padding: "9px 14px", fontSize: 12, color: "#334155", fontFamily: "monospace", whiteSpace: "nowrap" }}>{row.po}</td>
                    <td style={{ padding: "9px 14px", fontSize: 12, color: "#64748b" }}>{row.item}</td>
                    <td style={{ padding: "9px 14px" }}>
                      <span style={{ background: "#eef2f7", color: "#4a6070", padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{row.plant}</span>
                    </td>
                    <td style={{ padding: "9px 14px" }}>
                      <span style={{ background: "#f0f3f8", color: "#475569", padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{row.poType}</span>
                    </td>
                    <td style={{ padding: "9px 14px", fontSize: 12, color: "#475569", fontFamily: "monospace", whiteSpace: "nowrap" }}>{row.material}</td>
                    <td style={{ padding: "9px 14px" }}>
                      <span style={{
                        background: row.isStatus === "Have" ? "#f0faf4" : "#fff1f2",
                        color: row.isStatus === "Have" ? "#2d7a5a" : "#e11d48",
                        padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600
                      }}>{row.isStatus}</span>
                    </td>
                    <td style={{ padding: "9px 14px" }}>
                      {row.statusReceivingName ? (
                        <span style={{ background: "#f0faf4", color: "#2d7a5a", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{row.statusReceivingName}</span>
                      ) : (
                        <span style={{ background: "#fff7ed", color: "#ea580c", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>-</span>
                      )}
                    </td>
                    <td style={{ padding: "9px 14px" }}>
                      {row.statusReceivingCode ? (
                        <span style={{ background: "#f0faf4", color: "#2d7a5a", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{row.statusReceivingCode}</span>
                      ) : (
                        <span style={{ background: "#fff7ed", color: "#ea580c", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>-</span>
                      )}
                    </td>
                    <td style={{ padding: "9px 14px", fontSize: 12, color: "#94a3b8", whiteSpace: "nowrap" }}>{row.createDate}</td>
                    <td style={{ padding: "9px 14px", fontSize: 12, color: "#94a3b8", whiteSpace: "nowrap" }}>{row.reschedulingDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 22px", borderTop: "1px solid #f1f4f8", display: "flex", justifyContent: "flex-end", background: "#fafbfc", flexShrink: 0 }}>
          <button onClick={onClose} style={{ padding: "8px 18px", borderRadius: 8, border: "1px solid #e2e8f0", background: "white", color: "#64748b", fontSize: 13, cursor: "pointer", fontFamily: "Sarabun,sans-serif" }}>ปิด</button>
        </div>
      </div>
    </div>
  );
}
