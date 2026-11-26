export interface PORow {
  isStatus: "Have" | "Not Have";
  plant: string;
  po: string;
  item: string;
  index: string;
  material: string;
  createDate: string;
  poType: string;
  reschedulingDate: string;
  statusReceivingName: string;
  statusReceivingCode: string;
}

export type PieChartData = Array<{ label: string; value: number; color: string }>;
export type BarChartData = Array<{ label: string; total: number; have: number; notHave: number }>;

export type NotHaveGroup = {
  poType: string;
  count: number;
  items: PORow[];
};
