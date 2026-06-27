import React from "react";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import ScrollRecovery from "@/components/ScrollRecovery";

interface Verse {
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

async function getChapterData(id: string) {
  try {
    const res = await fetch(
      `https://vaisheshikaapi.vercel.app/api/chapters/${id}`,
      {
        cache: "no-store",
        headers: { Accept: "application/json" },
      },
    );
    if (!res.ok) throw new Error("Network response failed");
    const data = await res.json();

    if (Array.isArray(data)) return { title: `Chapter ${id}`, verses: data };
    return {
      title: data.title || `Chapter ${id}`,
      verses: data.verses || [],
    };
  } catch (error) {
    console.error(error);
    return { title: `Chapter ${id}`, verses: [] };
  }
}

// ⚡ REMINDER: searchParams is also an async Promise block in Next.js 14/15 layouts
export default async function ChapterVersesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const chapter = await getChapterData(resolvedParams.id);

  // Read active targeting key straight out of router telemetry parameters
  const activeFocusTarget =
    typeof resolvedSearch.focused === "string" ? resolvedSearch.focused : "";

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-6 md:p-12 font-sans selection:bg-amber-500 selection:text-black">
      {/* Feed targeting tokens directly down to state runner */}
      <ScrollRecovery targetId={activeFocusTarget} />

      <div className="max-w-6xl mx-auto space-y-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-amber-400 transition-colors group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          BACK TO ONTOLOGY LANDING
        </Link>

        <div className="border-b border-neutral-900 pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-neutral-200 uppercase">
              {chapter.title}
            </h1>
          </div>
          <span className="text-xs font-mono bg-neutral-900 border border-neutral-800 px-3 py-1 text-neutral-400 rounded-xl">
            Verses: {chapter.verses.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chapter.verses.map((verse: Verse, index: number) => {
            const urlSafeId = verse.verseNumber.replace(/\./g, "-");
            const elementDomId = `sutra-card-${urlSafeId}`;
            const isTargeted = urlSafeId === activeFocusTarget;

            return (
              <div key={verse.id} id={elementDomId} className="scroll-mt-28">
                <Link
                  href={`/chapters/${resolvedParams.id}/${urlSafeId}`}
                  className={`p-6 h-full border rounded-2xl transition-all flex flex-col justify-between group block ${
                    isTargeted
                      ? "bg-amber-500/10 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)] animate-pulse-subtle"
                      : "bg-neutral-900/30 border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-4 font-mono text-[10px] text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Layers
                          size={12}
                          className={
                            isTargeted ? "text-amber-400" : "text-amber-500"
                          }
                        />{" "}
                        SŪTRA {verse.verseNumber}
                      </span>
                      <span className="text-[9px] font-mono text-neutral-600">
                        INDEX #{index + 1}
                      </span>
                    </div>
                    <h2
                      className={`text-lg font-bold font-serif tracking-wide mb-2 line-clamp-1 ${isTargeted ? "text-amber-400" : "text-neutral-200"}`}
                    >
                      {verse.sanskrit}
                    </h2>
                    <p className="text-neutral-300 text-sm border-l-2 border-neutral-800 pl-3 line-clamp-3">
                      {verse.translation}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
