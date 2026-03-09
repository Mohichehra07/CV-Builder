"use client"

import { useCVContext } from "@/lib/cv-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Plus, Trash2, Star } from "lucide-react"
import type { Skill } from "@/lib/cv-types"

const LEVEL_LABELS = ["", "Beginner", "Elementary", "Intermediate", "Advanced", "Expert"]

export function SkillsStep() {
  const { data, updateData } = useCVContext()
  const { skills } = data

  function addSkill() {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: "",
      level: 3,
    }
    updateData("skills", [...skills, newSkill])
  }

  function updateSkill(id: string, field: keyof Skill, value: string | number) {
    updateData(
      "skills",
      skills.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    )
  }

  function removeSkill(id: string) {
    updateData(
      "skills",
      skills.filter((s) => s.id !== id)
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Skills</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your key skills and rate your proficiency level for each.
        </p>
      </div>

      {skills.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-muted/30 py-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Star className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">No skills added yet</p>
          <Button onClick={addSkill} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-1.5 h-4 w-4" />
            Add Skill
          </Button>
        </div>
      )}

      {skills.map((skill, idx) => (
        <div
          key={skill.id}
          className="rounded-xl border border-border bg-card p-5 transition-all"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Skill #{idx + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeSkill(skill.id)}
              className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove skill</span>
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Skill Name</Label>
              <Input
                placeholder="React, TypeScript, Project Management..."
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label>Proficiency Level</Label>
                <span className="text-xs font-medium text-primary">
                  {LEVEL_LABELS[skill.level]}
                </span>
              </div>
              <Slider
                min={1}
                max={5}
                step={1}
                value={[skill.level]}
                onValueChange={([val]) => updateSkill(skill.id, "level", val)}
                className="py-2"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {skills.length > 0 && (
        <Button
          onClick={addSkill}
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
