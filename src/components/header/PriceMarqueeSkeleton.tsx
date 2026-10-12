import React from "react";

const PriceMarqueeSkeleton = () => {
  return (
    <div className="flex h-10 items-center gap-6 overflow-hidden border-y border-gray-200 bg-[#fbfdfb] px-4">
      <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />
      <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
      <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
      <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />
    </div>
  );
};

export default PriceMarqueeSkeleton;
