import { Icon } from "./icons";
import { LoadingSpinner } from "./loading-spinner";
import { NotHaveGroup, PORow } from "./types";
import * as XLSX from "xlsx";

type NotHaveTableProps = {
  groups: NotHaveGroup[];
  count: number;
  loading: boolean;
  onSelect: (row: PORow) => void;
};

export function NotHaveTable({ groups, count, loading, onSelect }: NotHaveTableProps) {
  const handleExport = () => {
    const exportData = groups.flatMap(group =>
      group.items.map(row => ({
        "PO Type": group.poType,
        "PO": row.po,
        "Item": row.item,
        "Plant": row.plant,
        "Material": row.material,
        "Status": row.isStatus,
        "Status Receiving": row.statusReceivingName || "-",
        "Status Receiving Code": row.statusReceivingCode || "-",
        "Create Date": row.createDate,
        "Reschedule Date": row.reschedulingDate,
      }))
    );

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Not Have");
    XLSX.writeFile(wb, `not-have-export-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div style={{ background: "white", borderRadius: 16, border: "1px solid #e8ecf2", boxShadow: "0 1px 4px rgba(0,0,0,.04)", overflow: "visible", position: "relative" }}>
      <div style={{ padding: "16px 20px 14px", borderBottom: "1px solid #f0f3f8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#334155", margin: 0 }}>รายการ Not Have</p>
            <span style={{ background: "#fff1f2", color: "#e11d48", border: "1px solid #fecdd3", padding: "1px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{count} รายการ</span>
          </div>
          <p style={{ fontSize: 11.5, color: "#94a3b8", margin: "2px 0 0" }}>จัดกลุ่มตาม PO Type · คลิกแถวเพื่อดูรายละเอียด</p>
        </div>
        <button onClick={handleExport} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", border: "1px solid #dde3ea", borderRadius: 8, background: "white", color: "#64748b", fontSize: 12, cursor: "pointer", fontFamily: "Sarabun,sans-serif" }}>
          <Icon.download /> ส่งออก
        </button>
      </div>

      <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: 420, borderRadius: "0 0 16px 16px" }}>
        {groups.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px", color: "#94a3b8", fontSize: 13 }}>ไม่พบข้อมูลที่ค้นหา</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
              <tr style={{ background: "#f8fafc" }}>
                {["PO Type", "จำนวน (รายการ)", "PO", "Item", "Plant", "Material", "Status Receiving", "Status Receiving Code", "Reschedule Date"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                group.items.map((row, ri) => {
                  const isFirst = ri === 0;
                  return (
                    <tr key={`${group.poType}-${row.index}-${ri}-${row.po}-${row.item}`}
                      onClick={() => onSelect(row)}
                      style={{ borderTop: "1px solid #f0f3f8", cursor: "pointer", background: ri % 2 === 1 ? "#fafbfd" : "white", transition: "background .1s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#fff5f5")}
                      onMouseLeave={e => (e.currentTarget.style.background = ri % 2 === 1 ? "#fafbfd" : "white")}
                    >
                      {isFirst ? (
                        <td rowSpan={group.items.length}
                          style={{ padding: "12px 16px", verticalAlign: "middle", borderRight: "2px solid #fecdd3" }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                            <span style={{ background: "#fff1f2", color: "#e11d48", border: "1px solid #fecdd3", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>{group.poType}</span>
                            <span style={{ fontSize: 11, color: "#94a3b8" }}>{group.count} รายการ</span>
                          </div>
                        </td>
                      ) : null}
                      {isFirst ? (
                        <td rowSpan={group.items.length}
                          style={{ padding: "12px 16px", verticalAlign: "middle", borderRight: "1px solid #f0f3f8" }}>
                          <span style={{ fontSize: 22, fontWeight: 800, color: "#e11d48" }}>{group.count}</span>
                        </td>
                      ) : null}
                      <td style={{ padding: "10px 16px", fontSize: 12, color: "#334155", fontFamily: "monospace", whiteSpace: "nowrap" }}>{row.po}</td>
                      <td style={{ padding: "10px 16px", fontSize: 12, color: "#64748b" }}>{row.item}</td>
                      <td style={{ padding: "10px 16px" }}>
                        <span style={{ background: "#eef2f7", color: "#4a6070", padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{row.plant}</span>
                      </td>
                      <td style={{ padding: "10px 16px", fontSize: 12, color: "#475569", fontFamily: "monospace", whiteSpace: "nowrap" }}>{row.material}</td>
                      <td style={{ padding: "10px 16px" }}>
                        {row.statusReceivingName ? (
                          <span style={{ background: "#f0faf4", color: "#2d7a5a", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{row.statusReceivingName}</span>
                        ) : (
                          <span style={{ background: "#fff7ed", color: "#ea580c", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>-</span>
                        )}
                      </td>
                      <td style={{ padding: "10px 16px" }}>
                        {row.statusReceivingCode ? (
                          <span style={{ background: "#f0faf4", color: "#2d7a5a", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{row.statusReceivingCode}</span>
                        ) : (
                          <span style={{ background: "#fff7ed", color: "#ea580c", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>-</span>
                        )}
                      </td>
                      <td style={{ padding: "10px 16px", fontSize: 12, color: "#94a3b8", whiteSpace: "nowrap" }}>{row.reschedulingDate}</td>
                    </tr>
                  );
                })
              ))}
            </tbody>
          </table>
        )}
      </div>

      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,.7)",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 16,
            gap: 8,
            color: "#3d5a73",
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          <LoadingSpinner size={18} />
          กำลังโหลดข้อมูล...
        </div>
      )}
    </div>
  );
}
