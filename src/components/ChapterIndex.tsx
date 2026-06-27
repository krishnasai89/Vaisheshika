"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Hash, ChevronRight } from "lucide-react";
import { toastSystem } from "@/lib/toastEvent";

interface ChapterItem {
  chapterNumber: number;
  title: string;
  description: string;
  verseCount: number;
}

export default function ChapterIndex() {
  const [chapters, setChapters] = useState<ChapterItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchChapters() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://vaisheshikaapi.vercel.app/api/chapters",
        );
        if (!res.ok) throw new Error("Failed to fetch text schemas");
        const data = await res.json();
        setChapters(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchChapters();
  }, []);

  if (loading)
    return (
      <div className="h-40 animate-pulse bg-neutral-900 rounded-2xl w-full" />
    );

  return (
    <div className="w-full max-w-6xl mx-auto my-24 px-4 space-y-6">
      <div className="p-6 bg-neutral-950 border border-neutral-900 rounded-2xl">
        <h2 className="text-xl font-bold text-neutral-100 flex items-center gap-2">
          <BookOpen className="text-amber-500" size={16} /> Textual Sūtra
          Mapping Directory
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chapters.map((chapter) => (
          // Link configurations pointing cleanly toward dynamic path routing structures
          <Link
            key={chapter.chapterNumber}
            href={`/chapters/${chapter.chapterNumber}`}
            onClick={() =>
              toastSystem.emit(
                `Redirecting into dynamic verse manifest maps for Chapter ${chapter.chapterNumber}`,
                "info",
              )
            }
            className="p-5 bg-neutral-900/30 border border-neutral-800/80 rounded-xl flex flex-col justify-between hover:border-amber-500/30 transition-colors group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-neutral-500">
                <span className="flex items-center gap-1">
                  <Hash size={10} /> MODULE 0{chapter.chapterNumber}
                </span>
                <span className="bg-neutral-950 px-2 py-0.5 rounded text-neutral-400">
                  {chapter.verseCount} Sūtras
                </span>
              </div>
              <h3 className="text-base font-bold text-neutral-200 group-hover:text-amber-400 transition-colors">
                {chapter.title}
              </h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed min-h-[32px]">
                {chapter.description}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-950 flex justify-end items-center gap-1 text-[10px] font-mono text-neutral-500 group-hover:text-neutral-300">
              OPEN VERSE CARDS <ChevronRight size={12} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
