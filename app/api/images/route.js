import clientPromise from "../../../lid/mongodb";

// ✅ POST: บันทึกข้อมูลลง MongoDB

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("chilli_detection_db"); // ✅ database name
    const data = await db.collection("detection_logs").find({}).toArray();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}