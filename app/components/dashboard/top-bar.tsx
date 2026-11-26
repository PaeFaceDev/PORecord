import { Icon } from "./icons";
import { LoadingSpinner } from "./loading-spinner";

type TopBarProps = {
  open: boolean;
  onToggleOpen: () => void;
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  loading: boolean;
  onSync: () => void;
};

export function TopBar({
  onToggleOpen,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  loading,
  onSync,
}: TopBarProps) {
  return (
    <header style={{ height: 60, background: "white", borderBottom: "1px solid #e8ecf2", display: "flex", alignItems: "center", padding: "0 24px", gap: 14, flexShrink: 0 }}>
      <button onClick={onToggleOpen} style={{ width: 36, height: 36, borderRadius: 9, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
        <Icon.menu />
      </button>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1e293b" }}>แดชบอร์ด Check PO</p>
        <p style={{ margin: 0, fontSize: 11, color: "#94a3b8" }}>ภาพรวมข้อมูลทั้งหมด</p>
      </div>

      <div className="flex justify-center items-center gap-5">
        {[
          { label: "วันที่เริ่มต้น", val: dateFrom, set: onDateFromChange },
          { label: "วันที่สิ้นสุด", val: dateTo, set: onDateToChange },
        ].map((f, i) => (
          <div key={i} style={{ flexShrink: 0 }} className="flex justify-center items-center gap-2">
            <label style={{ display: "block", fontSize: 11, color: "#94a3b8", marginBottom: 5, fontWeight: 600 }}>{f.label}</label>
            <input type="date" value={f.val} onChange={e => f.set(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 9, border: "1px solid #dde3ea", fontSize: 13, color: "#334155", background: "#f8fafc", outline: "none" }} />
          </div>
        ))}
        <button onClick={onSync} disabled={loading}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", background: "#1db124", color: "white", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", flexShrink: 0, opacity: loading ? 0.75 : 1 }}>
          {loading ? <LoadingSpinner size={12} color="white" /> : <Icon.search />} {loading ? "กำลังโหลด..." : "Sync Data"}
        </button>
        <div style={{ fontSize: 12, color: "#94a3b8", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} /> ออนไลน์
        </div>
      </div>
    </header>
  );
}
