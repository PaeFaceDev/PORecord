"use client";

import { useState, useEffect, useMemo } from "react";
import { BarChart, PieChart } from "./components/dashboard/charts";
import { DetailModal } from "./components/dashboard/detail-modal";
import { KpiDetailModal } from "./components/dashboard/kpi-detail-modal";
import { KpiCards } from "./components/dashboard/kpi-cards";
import { LoadingSpinner } from "./components/dashboard/loading-spinner";
import { NotHaveTable } from "./components/dashboard/not-have-table";
import { SearchBar } from "./components/dashboard/search-bar";
import { Sidebar } from "./components/dashboard/sidebar";
import { TopBar } from "./components/dashboard/top-bar";
import { PORow } from "./components/dashboard/types";

const PLANTS = ["9771", "9772", "9773", "9774"];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [rawData, setRawData] = useState<PORow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");
  const today = new Date().toISOString().slice(0, 10);
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);
  const [applied, setApplied] = useState({ search: "", dateFrom: today, dateTo: today });
  const [selected, setSelected] = useState<PORow | null>(null);
  const [kpiCard, setKpiCard] = useState<{ type: "all" | "have" | "notHave"; title: string; accentColor: string } | null>(null);
  const [plantDetail, setPlantDetail] = useState<{ label: string; type: "total" | "have" | "notHave" } | null>(null);
  const [typeDetail, setTypeDetail] = useState<{ label: string; type: "total" | "have" | "notHave" } | null>(null);

  // Fetch data from API with applied filters
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (applied.dateFrom) params.append("startDate", applied.dateFrom);
        if (applied.dateTo) params.append("endDate", applied.dateTo);
        const res = await fetch(`/api/PoCheck?${params.toString()}`);
        const data = await res.json();
        // Ensure data is an array, even if error occurred
        setRawData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setRawData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [applied]);

  // Derived summaries (computed from rawData)
  const TOTAL = rawData.length;
  const HAVE_COUNT = rawData.filter(d => d.isStatus === "Have").length;
  const NOT_HAVE_COUNT = rawData.filter(d => d.isStatus === "Not Have").length;

  const NOT_HAVE_BY_TYPE = useMemo(() => {
    const NOT_HAVE_ROWS = rawData.filter(d => d.isStatus === "Not Have");
    const map = new Map<string, PORow[]>();
    NOT_HAVE_ROWS.forEach(r => {
      if (!map.has(r.poType)) map.set(r.poType, []);
      map.get(r.poType)!.push(r);
    });
    return Array.from(map.entries())
      .map(([poType, items]) => ({ poType, count: items.length, items }))
      .sort((a, b) => b.count - a.count);
  }, [rawData]);

  const BAR_DATA = useMemo(() => {
    return PLANTS.map(p => {
      const plantData = rawData.filter(d => d.plant === p);
      return {
        label: p,
        total: plantData.length,
        have: plantData.filter(d => d.isStatus === "Have").length,
        notHave: plantData.filter(d => d.isStatus === "Not Have").length,
      };
    });
  }, [rawData]);

  const TYPE_BAR_DATA = useMemo(() => {
    const types = Array.from(new Set(rawData.map(d => d.poType))).sort();
    return types.map(t => {
      const typeData = rawData.filter(d => d.poType === t);
      return {
        label: t,
        total: typeData.length,
        have: typeData.filter(d => d.isStatus === "Have").length,
        notHave: typeData.filter(d => d.isStatus === "Not Have").length,
      };
    });
  }, [rawData]);

  // filter the Not-Have grouped rows by search/date
  const filteredNotHave = useMemo(() => {
    return NOT_HAVE_BY_TYPE.map(group => ({
      ...group,
      items: group.items.filter(r => {
        const s = applied.search.toLowerCase();
        return (
          (s === "" ||
            r.po.toLowerCase().includes(s) ||
            r.material.toLowerCase().includes(s) ||
            r.plant.toLowerCase().includes(s))
        );
      })
    })).filter(g => g.items.length > 0);
  }, [applied, NOT_HAVE_BY_TYPE]);

  const FILTERED_NOT_HAVE_COUNT = useMemo(
    () => filteredNotHave.reduce((sum, group) => sum + group.items.length, 0),
    [filteredNotHave]
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap');
        *,*::before,*::after{font-family:'Sarabun',sans-serif;box-sizing:border-box;}
        html,body{height:100%;margin:0;padding:0;}
        @keyframes spin{to{transform:rotate(360deg)}}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:10px}
        ::-webkit-scrollbar-track{background:transparent}
        input[type=date]::-webkit-calendar-picker-indicator{opacity:.45;cursor:pointer}
        button:hover{filter:brightness(.96)}
      `}</style>

      <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden", background: "#f0f3f8" }}>
        <Sidebar open={open} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <TopBar
            open={open}
            onToggleOpen={() => setOpen(!open)}
            dateFrom={dateFrom}
            dateTo={dateTo}
            onDateFromChange={setDateFrom}
            onDateToChange={setDateTo}
            loading={loading}
            onSync={() => setApplied({ search, dateFrom, dateTo })}
          />

          <main style={{ flex: 1, overflow: "auto", overflowX: "hidden", padding: 22, display: "flex", flexDirection: "column", gap: 18 }}>
            <KpiCards total={TOTAL} haveCount={HAVE_COUNT} notHaveCount={NOT_HAVE_COUNT} onCardClick={(type) => {
              const config = {
                all: { title: "รายการทั้งหมด", accentColor: "#7bafd4" },
                have: { title: "รายการ Have", accentColor: "#72b49a" },
                notHave: { title: "รายการ Not Have", accentColor: "#e07a7a" },
              };
              setKpiCard({ type, ...config[type] });
            }} />

            <div style={{ display: "grid", gridTemplateColumns: "602px 1fr", gap: 14 }}>
              <div style={{ background: "white", borderRadius: 16, border: "1px solid #e8ecf2", boxShadow: "0 1px 4px rgba(0,0,0,.04)", padding: "20px 22px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#334155", margin: 0 }}>ยอดแต่ละ Plant</p>
                    <p style={{ fontSize: 11.5, color: "#94a3b8", margin: "5px 0 15px 0" }}>ล่าสุด</p>
                  </div>
                  {/* <span style={{ fontSize: 11, background: "#eef5fb", color: "#5a9abf", padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>2025</span> */}
                </div>
                <BarChart data={BAR_DATA} onBarClick={(plant, type) => setPlantDetail({ label: plant, type })} />
              </div>
              <div style={{ background: "white", borderRadius: 16, border: "1px solid #e8ecf2", boxShadow: "0 1px 4px rgba(0,0,0,.04)", padding: "20px 22px" }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#334155", margin: "0 0 2px" }}>ยอดแต่ละ Type</p>
                <p style={{ fontSize: 11.5, color: "#94a3b8", margin: "0 0 14px" }}>แยกตามประเภท</p>
                <BarChart data={TYPE_BAR_DATA} onBarClick={(type, barType) => setTypeDetail({ label: type, type: barType })} />
              </div>
            </div>

            <SearchBar
              loading={loading}
              search={search}
              dateFrom={dateFrom}
              dateTo={dateTo}
              onSearchChange={setSearch}
              onSubmit={() => setApplied({ search, dateFrom, dateTo })}
              onClear={() => {
                setSearch("");
                setDateFrom("");
                setDateTo("");
                setApplied({ search: "", dateFrom: "", dateTo: "" });
              }}
            />

            <NotHaveTable
              groups={filteredNotHave}
              count={FILTERED_NOT_HAVE_COUNT}
              loading={loading}
              onSelect={setSelected}
            />
            <div style={{ height: 4 }} />

            <div>
              Data
            </div>
            
          </main>
        </div>
      </div>

      {loading && rawData.length === 0 && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(240,243,248,.82)",
            backdropFilter: "blur(2px)",
            zIndex: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 10,
            color: "#334155",
          }}
        >
          <LoadingSpinner size={30} />
          <span style={{ fontSize: 14, fontWeight: 600 }}>กำลังโหลดข้อมูลหน้าแรก...</span>
        </div>
      )}

      {selected && <DetailModal row={selected} onClose={() => setSelected(null)} />}

      {kpiCard && (
        <KpiDetailModal
          title={kpiCard.title}
          rows={kpiCard.type === "all" ? rawData : rawData.filter(d => d.isStatus === (kpiCard.type === "have" ? "Have" : "Not Have"))}
          accentColor={kpiCard.accentColor}
          onClose={() => setKpiCard(null)}
        />
      )}

      {plantDetail && (
        <KpiDetailModal
          title={`Plant ${plantDetail.label} - ${plantDetail.type === "total" ? "ยอดรวม" : plantDetail.type === "have" ? "Have" : "Not Have"}`}
          rows={rawData.filter(d => d.plant === plantDetail.label && (plantDetail.type === "total" || d.isStatus === (plantDetail.type === "have" ? "Have" : "Not Have")))}
          accentColor={plantDetail.type === "total" ? "#5491b5" : plantDetail.type === "have" ? "#72b49a" : "#e07a7a"}
          onClose={() => setPlantDetail(null)}
        />
      )}

      {typeDetail && (
        <KpiDetailModal
          title={`Type ${typeDetail.label} - ${typeDetail.type === "total" ? "ยอดรวม" : typeDetail.type === "have" ? "Have" : "Not Have"}`}
          rows={rawData.filter(d => d.poType === typeDetail.label && (typeDetail.type === "total" || d.isStatus === (typeDetail.type === "have" ? "Have" : "Not Have")))}
          accentColor={typeDetail.type === "total" ? "#8b5cf6" : typeDetail.type === "have" ? "#72b49a" : "#e07a7a"}
          onClose={() => setTypeDetail(null)}
        />
      )}
    </>
  );
}