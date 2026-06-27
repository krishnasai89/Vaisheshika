import React from "react";

export default function BentoSkeleton() {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((idx) => (
        <div
          key={idx}
          className={`p-6 bg-neutral-900/40 border border-neutral-900 rounded-2xl h-64 flex flex-col justify-between ${
            idx === 1 ? "md:col-span-2" : ""
          }`}
        >
          <div>
            <div className="h-4 bg-neutral-800 rounded-md w-1/4 mb-6" />
            <div className="h-7 bg-neutral-800 rounded-md w-1/2 mb-2" />
            <div className="h-4 bg-neutral-800 rounded-md w-1/3 mb-4" />
            <div className="space-y-2">
              <div className="h-3 bg-neutral-800 rounded-md w-full" />
              <div className="h-3 bg-neutral-800 rounded-md w-5/6" />
            </div>
          </div>
          <div className="h-3 bg-neutral-800 rounded-md w-1/3 self-end" />
        </div>
      ))}
    </div>
  );
}
