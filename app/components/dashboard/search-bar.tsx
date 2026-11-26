import { Icon } from "./icons";
import { LoadingSpinner } from "./loading-spinner";

type SearchBarProps = {
  loading: boolean;
  search: string;
  dateFrom: string;
  dateTo: string;
  onSearchChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
};

export function SearchBar({
  loading,
  search,
  dateFrom,
  dateTo,
  onSearchChange,
  onSubmit,
  onClear,
}: SearchBarProps) {
  return (
    <div style={{ background: "white", borderRadius: 16, border: "1px solid #e8ecf2", boxShadow: "0 1px 4px rgba(0,0,0,.04)", padding: "16px 20px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 180px" }}>
          <label style={{ display: "block", fontSize: 11, color: "#94a3b8", marginBottom: 5, fontWeight: 600 }}>ค้นหา</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }}><Icon.search /></span>
            <input value={search} onChange={e => onSearchChange(e.target.value)} onKeyDown={e => e.key === "Enter" && onSubmit()} disabled={loading}
              placeholder="PO, Material, Plant..."
              style={{ width: "100%", paddingLeft: 30, paddingRight: 12, paddingTop: 8, paddingBottom: 8, borderRadius: 9, border: "1px solid #dde3ea", fontSize: 13, color: "#334155", background: "#f8fafc", outline: "none" }} />
          </div>
        </div>

        <button onClick={onSubmit} disabled={loading}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", background: "#3d5a73", color: "white", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", flexShrink: 0, opacity: loading ? 0.75 : 1 }}>
          {loading ? <LoadingSpinner size={12} color="white" /> : <Icon.search />} {loading ? "กำลังค้นหา..." : "ค้นหาข้อมูล"}
        </button>

        {(search || dateFrom || dateTo) && (
          <button onClick={onClear}
            style={{ padding: "8px 14px", border: "1px solid #dde3ea", borderRadius: 9, background: "white", color: "#64748b", fontSize: 13, cursor: "pointer", flexShrink: 0 }}>
            ล้าง
          </button>
        )}
      </div>
    </div>
  );
}
