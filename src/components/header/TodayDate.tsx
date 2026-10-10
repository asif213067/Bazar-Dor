"use client"
import React, { useEffect, useState } from "react";

const TodayDate = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      setDate(
        new Date().toLocaleDateString("bn-BD", {
          dateStyle: "full",
          timeZone: "Asia/Dhaka",
        }),
      );
    };

    updateDate();

    // Update automatically every minute
    const interval = setInterval(updateDate, 60_000);

    return () => clearInterval(interval);
  }, []);
  return (
    <p className="mt-0.5 text-[12px] text-gray-500">
      {date || "তারিখ লোড হচ্ছে..."}
    </p>
  );
};

export default TodayDate;
