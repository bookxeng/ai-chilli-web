"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [modalImage, setModalImage] = useState(null); // สำหรับ modal

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error("❌ Fetch error:", err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">🌶️ ข้อมูลการตรวจจับพริก</h1>

        {/* ตาราง */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  {/* ✨ จุดที่ 1: เพิ่ม Header สำหรับจำนวนพริก */}
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    จำนวนพริกดิบ
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    จำนวนพริกสุก
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preview
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      {/* Timestamp clickable */}
                      <td
                        className="px-6 py-4 whitespace-nowrap text-gray-700 align-middle underline decoration-dotted cursor-pointer"
                        onClick={() => item.image_base64 && setModalImage(item.image_base64)}
                      >
                        {new Date(item.timestamp).toLocaleString("th-TH", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      {/* ✨ จุดที่ 2: แสดงข้อมูลจำนวนพริก */}
                      <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold text-center align-middle">
                        {item.total_counts?.Thaichili_Green || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-red-600 font-semibold text-center align-middle">
                        {item.total_counts?.Thaichili_red || 0}
                      </td>
                      
                      {/* Preview รูปเล็ก */}
                      <td className="px-6 py-4">
                        {item.image_base64 ? (
                          <div className="w-28 h-28 flex items-center justify-center overflow-hidden rounded-md shadow-sm border border-gray-200">
                            <img
                              src={`data:image/jpeg;base64,${item.image_base64}`}
                              alt={item.filename || "Detected Image"}
                              className="w-full h-full object-cover cursor-pointer"
                              onClick={() => setModalImage(item.image_base64)} // ทำให้รูปเล็กคลิกได้ด้วย
                            />
                          </div>
                        ) : (
                          <div className="w-28 h-28 flex items-center justify-center bg-gray-200 rounded-md text-gray-400 border border-gray-300">
                            No Image
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    {/* ✨ จุดที่ 3: แก้ไข colSpan ให้ครอบคลุมทุกคอลัมน์ */}
                    <td colSpan="4" className="text-center py-12 px-4 text-gray-500">
                      <p className="text-lg font-medium">ไม่พบข้อมูลในฐานข้อมูล</p>
                      <p className="text-sm mt-1">กำลังรอข้อมูลใหม่...</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setModalImage(null)}
        >
          <div
            className="bg-white rounded-lg overflow-hidden shadow-2xl max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`data:image/jpeg;base64,${modalImage}`}
              alt="Preview"
              className="w-full h-auto object-contain"
              style={{ maxHeight: '80vh' }}
            />
            <button
              className="w-full py-3 bg-red-500 text-white font-bold text-lg hover:bg-red-600 transition"
              onClick={() => setModalImage(null)}
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
}