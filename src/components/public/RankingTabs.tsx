"use client";

import { useState } from "react";
import { RankingList } from "@/components/public/RankingList";
import { ParticipantRankingList } from "@/components/public/ParticipantRankingList";
import type { Church, TopParticipant } from "@/lib/types";
import { cn } from "@/lib/utils";

export function RankingTabs({
  churches,
  participants,
}: {
  churches: Church[];
  participants: TopParticipant[];
}) {
  const [tab, setTab] = useState<"igrejas" | "participantes">("igrejas");

  return (
    <div className="flex flex-col gap-6">
      <div className="inline-flex w-fit rounded-full border border-border bg-background-elevated p-1">
        {(
          [
            { key: "igrejas", label: "Por igreja" },
            { key: "participantes", label: "Por participante" },
          ] as const
        ).map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={cn(
              "rounded-full px-4 py-2 text-sm transition-colors",
              tab === item.key
                ? "bg-gold text-black"
                : "text-foreground-muted hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "igrejas" ? (
        <RankingList churches={churches} />
      ) : (
        <ParticipantRankingList participants={participants} />
      )}
    </div>
  );
}
