"use client"

import { useCVContext } from "@/lib/cv-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Languages } from "lucide-react"
import type { Language, LanguageLevel } from "@/lib/cv-types"

const LEVEL_OPTIONS: { value: LanguageLevel; label: string }[] = [
  { value: "beginner", label: "Beginner (A1)" },
  { value: "elementary", label: "Elementary (A2)" },
  { value: "intermediate", label: "Intermediate (B1)" },
  { value: "upper-intermediate", label: "Upper-Intermediate (B2)" },
  { value: "advanced", label: "Advanced (C1)" },
  { value: "native", label: "Native / Fluent (C2)" },
]

export function LanguagesStep() {
  const { data, updateData } = useCVContext()
  const { languages } = data

  function addLanguage() {
    const newLang: Language = {
      id: crypto.randomUUID(),
      name: "",
      level: "intermediate",
    }
    updateData("languages", [...languages, newLang])
  }

  function updateLanguage(id: string, field: keyof Language, value: string) {
    updateData(
      "languages",
      languages.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    )
  }

  function removeLanguage(id: string) {
    updateData(
      "languages",
      languages.filter((l) => l.id !== id)
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Languages</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add languages you speak and select your proficiency level for each.
        </p>
      </div>

      {languages.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-muted/30 py-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Languages className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">No languages added yet</p>
          <Button onClick={addLanguage} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-1.5 h-4 w-4" />
            Add Language
          </Button>
        </div>
      )}

      {languages.map((lang, idx) => (
        <div
          key={lang.id}
          className="rounded-xl border border-border bg-card p-5 transition-all"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Language #{idx + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeLanguage(lang.id)}
              className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove language</span>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Language</Label>
              <Input
                placeholder="English, Uzbek, Russian..."
                value={lang.name}
                onChange={(e) => updateLanguage(lang.id, "name", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Proficiency Level</Label>
              <Select
                value={lang.level}
                onValueChange={(val) => updateLanguage(lang.id, "level", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {LEVEL_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}

      {languages.length > 0 && (
        <Button
          onClick={addLanguage}
          variant="outline"
          className="self-start border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Add Another
        </Button>
      )}
    </div>
  )
}
