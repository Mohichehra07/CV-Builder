"use client"

import { useCVContext } from "@/lib/cv-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, GraduationCap } from "lucide-react"
import type { Education } from "@/lib/cv-types"

export function EducationStep() {
  const { data, updateData } = useCVContext()
  const { education } = data

  function addEducation() {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    updateData("education", [...education, newEdu])
  }

  function updateEdu(id: string, field: keyof Education, value: string) {
    updateData(
      "education",
      education.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    )
  }

  function removeEdu(id: string) {
    updateData(
      "education",
      education.filter((e) => e.id !== id)
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Education</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your educational background, starting with the most recent.
        </p>
      </div>

      {education.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-muted/30 py-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">No education entries yet</p>
          <Button onClick={addEducation} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-1.5 h-4 w-4" />
            Add Education
          </Button>
        </div>
      )}

      {education.map((edu, idx) => (
        <div
          key={edu.id}
          className="rounded-xl border border-border bg-card p-5 transition-all"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Education #{idx + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEdu(edu.id)}
              className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove education</span>
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>School / University</Label>
              <Input
                placeholder="Harvard University"
                value={edu.school}
                onChange={(e) => updateEdu(edu.id, "school", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Degree</Label>
                <Input
                  placeholder="Bachelor's"
                  value={edu.degree}
                  onChange={(e) => updateEdu(edu.id, "degree", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Field of Study</Label>
                <Input
                  placeholder="Computer Science"
                  value={edu.field}
                  onChange={(e) => updateEdu(edu.id, "field", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) =>
                    updateEdu(edu.id, "startDate", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) =>
                    updateEdu(edu.id, "endDate", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Relevant courses, achievements, activities..."
                className="min-h-[80px] resize-none"
                value={edu.description}
                onChange={(e) =>
                  updateEdu(edu.id, "description", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}

      {education.length > 0 && (
        <Button
          onClick={addEducation}
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
