"use client";

import { useId } from "react";
import type { SortControlProps } from "@/type/sort.type";

export default function SortControl({ value, onChange }: SortControlProps) {
  const id = useId();

  return (
    <div className="flex shrink-0 items-center gap-2">
      <label htmlFor={id} className="whitespace-nowrap text-xs text-[#737b74]">
        সাজান
      </label>

      <select
        id={id}
        value={value}
        onChange={(event) =>
          onChange(event.target.value as SortControlProps["value"])
        }
        className="max-w-52 rounded-lg border border-[#dce5dc] bg-[#fbfdfb] px-3 py-2 text-xs text-[#263128] outline-none focus:border-green-600"
      >
        <option value="default">ডিফল্ট</option>
        <option value="low">দাম: কম থেকে বেশি</option>
        <option value="high">দাম: বেশি থেকে কম</option>
      </select>
    </div>
  );
}
