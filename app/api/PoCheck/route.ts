import { NextResponse } from 'next/server';
interface PORow {
  isStatus: "Have" | "Not Have";
  plant: string;
  po: string;
  item: string;
  index: string;
  category: string;
  material: string;
  createDate: string;
  poType: string;
  reschedulingDate: string;
  statusReceivingName: string;
  statusReceivingCode: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const today = new Date().toISOString().slice(0, 10);
    let startDate = searchParams.get("startDate") || today;
    let endDate = searchParams.get("endDate") || today;

    // Convert date format from YYYY-MM-DD to YYYY-MM-DD HH:mm:ss if needed
    if (startDate.length === 10) startDate = startDate + " 00:00:00";
    if (endDate.length === 10) endDate = endDate + " 23:59:59";

    console.log("Fetching from external API with dates:", { startDate, endDate });

    const encodedStart = encodeURIComponent(startDate);
    const encodedEnd = encodeURIComponent(endDate);

    // For Test
    const { default: response } = await import(
      "../../data/data_test.json",
      { with: { type: "json" } }
    );
    return NextResponse.json(response);
    // ---
    
    // const url = `${process.env.API_URL}api/Purchase/DataCheckPO?startDate=${encodedStart}&endDate=${encodedEnd}`;
    // console.log(url)
    // const response = await fetch(url);
    // if (!response.ok) {
    //   throw new Error(`External API returned status ${response.status}`);
    // }

    // const data = await response.json();
    // return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching from external API:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from external API" },
      { status: 500 }
    );
  }
}
