import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookmarkCheck,
  EyeOff,
  CheckCircle2,
  Cpu,
} from "lucide-react";

interface VerseDetail {
  id: string;
  verseNumber: string;
  ahnika: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
  commentary: string;
  philosophy: string;
  viewpoint: {
    how_people_think: string;
    the_reality_is: string;
  };
}

async function getSingleVerse(
  chapterId: string,
  urlSlug: string,
): Promise<VerseDetail | null> {
  try {
    const res = await fetch(
      `https://vaisheshikaapi.vercel.app/api/chapters/${chapterId}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const data = await res.json();

    const versesList: VerseDetail[] =
      data.verses || (Array.isArray(data) ? data : []);
    const targetVerseNumber = urlSlug.replace(/-/g, ".");

    return versesList.find((v) => v.verseNumber === targetVerseNumber) || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// ⚡ FIX: Explicitly handle params as a Promise wrapper to prevent undefined object extraction
export default async function SingleVersePage({
  params,
}: {
  params: Promise<{ id: string; sutraId: string }>;
}) {
  const resolvedParams = await params; // Resolve the dynamic parameters asynchronously
  const verse = await getSingleVerse(resolvedParams.id, resolvedParams.sutraId);

  if (!verse) {
    return (
      <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8 flex flex-col items-center justify-center font-mono text-xs text-neutral-500">
        <span>
          [ROUTE TIMEOUT]: Verse entity at identifier "{resolvedParams.sutraId}"
          not resolved.
        </span>
        <Link
          href={`/chapters/${resolvedParams.id}`}
          className="mt-4 text-amber-500 underline"
        >
          Return to Pack
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-4 md:p-8 flex items-center justify-center font-sans selection:bg-amber-500 selection:text-black">
      <div className="max-w-3xl w-full p-6 md:p-8 bg-neutral-900/40 border border-neutral-800 rounded-3xl backdrop-blur-md space-y-8 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <Link
          href={`/chapters/${resolvedParams.id}`}
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft size={12} /> BACK TO VERSE ARCHIVE
        </Link>

        <div className="space-y-3">
          <div className="flex gap-2 font-mono text-[10px]">
            <span className="text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20 uppercase tracking-widest font-bold">
              Sūtra Reference: {verse.verseNumber}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-amber-200/90 font-serif tracking-wide leading-snug">
            {verse.sanskrit}
          </h1>
          <p className="text-sm font-mono text-neutral-400 italic">
            {verse.transliteration}
          </p>
        </div>

        <div className="p-5 bg-neutral-950/80 border border-neutral-900 rounded-xl space-y-4">
          <div className="text-neutral-500 uppercase font-mono text-[9px] tracking-wider flex items-center gap-1.5">
            <BookmarkCheck size={14} className="text-emerald-400" /> Translation
            & Structural Logic
          </div>
          <p className="text-neutral-200 text-base leading-relaxed">
            {verse.translation}
          </p>
          <div className="w-full h-px bg-neutral-900" />
          <div className="text-neutral-400 text-xs leading-relaxed">
            <strong className="text-neutral-300 block font-mono uppercase text-[10px] mb-1">
              Analytical Commentary:
            </strong>
            {verse.commentary}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-950/10 border border-red-900/20 rounded-xl space-y-1.5">
            <span className="text-[9px] font-mono uppercase text-red-400 flex items-center gap-1 font-bold">
              <EyeOff size={12} /> Common Misconception
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {verse.viewpoint.how_people_think}
            </p>
          </div>

          <div className="p-4 bg-emerald-950/10 border border-emerald-900/20 rounded-xl space-y-1.5">
            <span className="text-[9px] font-mono uppercase text-emerald-400 flex items-center gap-1 font-bold">
              <CheckCircle2 size={12} /> Ontological Reality
            </span>
            <p className="text-xs text-neutral-200 leading-relaxed">
              {verse.viewpoint.the_reality_is}
            </p>
          </div>
        </div>

        <div className="p-4 bg-neutral-950/40 border border-neutral-900 rounded-xl font-mono text-[11px] text-neutral-400 leading-relaxed">
          <span className="text-amber-500 font-bold block mb-1 uppercase text-[9px] tracking-widest flex items-center gap-1">
            <Cpu size={12} /> Epistemic Paradigm Framework
          </span>
          {verse.philosophy}
        </div>
      </div>
    </main>
  );
}
