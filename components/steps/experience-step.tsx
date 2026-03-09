"use client"

import { useCVContext } from "@/lib/cv-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, Briefcase } from "lucide-react"
import type { Experience } from "@/lib/cv-types"

export function ExperienceStep() {
  const { data, updateData } = useCVContext()
  const { experience } = data

  function addExperience() {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    updateData("experience", [...experience, newExp])
  }

  function updateExp(
    id: string,
    field: keyof Experience,
    value: string | boolean
  ) {
    updateData(
      "experience",
      experience.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    )
  }

  function removeExp(id: string) {
    updateData(
      "experience",
      experience.filter((e) => e.id !== id)
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Work Experience</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Highlight your professional experience, starting from the most recent role.
        </p>
      </div>

      {experience.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-muted/30 py-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">No experience entries yet</p>
          <Button onClick={addExperience} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-1.5 h-4 w-4" />
            Add Experience
          </Button>
        </div>
      )}

      {experience.map((exp, idx) => (
        <div
          key={exp.id}
          className="rounded-xl border border-border bg-card p-5 transition-all"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Experience #{idx + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExp(exp.id)}
              className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove experience</span>
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Company</Label>
                <Input
                  placeholder="Acme Corp"
                  value={exp.company}
                  onChange={(e) =>
                    updateExp(exp.id, "company", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Position</Label>
                <Input
                  placeholder="Senior Developer"
                  value={exp.position}
                  onChange={(e) =>
                    updateExp(exp.id, "position", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExp(exp.id, "startDate", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={exp.endDate}
                  disabled={exp.current}
                  onChange={(e) =>
                    updateExp(exp.id, "endDate", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id={`current-${exp.id}`}
                checked={exp.current}
                onCheckedChange={(checked) =>
                  updateExp(exp.id, "current", !!checked)
                }
              />
              <Label htmlFor={`current-${exp.id}`} className="text-sm font-normal">
                I currently work here
              </Label>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe your responsibilities and achievements..."
                className="min-h-[80px] resize-none"
                value={exp.description}
                onChange={(e) =>
                  updateExp(exp.id, "description", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}

      {experience.length > 0 && (
        <Button
          onClick={addExperience}
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
