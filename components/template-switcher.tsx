"use client"

import { useCVContext } from "@/lib/cv-context"
import type { TemplateType } from "@/lib/cv-types"
import { cn } from "@/lib/utils"
import { Sparkles, Crown, Palette } from "lucide-react"

const templates: { id: TemplateType; label: string; icon: typeof Sparkles }[] = [
  { id: "modern",   label: "Modern",   icon: Sparkles },
  { id: "classic",  label: "Classic",  icon: Crown    },
  { id: "creative", label: "Creative", icon: Palette  },
]

export function TemplateSwitcher() {
  const { template, setTemplate } = useCVContext()

  return (
    <div className="flex items-center gap-1">
      {templates.map((t) => {
        const Icon = t.icon
        const active = template === t.id
        return (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            title={t.label}
            className={cn(
              "flex items-center gap-1 rounded-lg text-xs font-medium transition-all",
              // Mobile: icon only, compact
              "px-2 py-1.5 lg:px-3 lg:py-1.5",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            {/* Label faqat lg+ da ko'rinadi */}
            <span className="hidden lg:inline">{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}
