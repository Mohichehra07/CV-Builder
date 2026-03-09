"use client"

import { useCVContext } from "@/lib/cv-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/image-upload"

export function PersonalStep() {
  const { data, updateData } = useCVContext()
  const { personal } = data

  function update(field: keyof typeof personal, value: string | null) {
    updateData("personal", { ...personal, [field]: value })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Start with the basics. This information will appear at the top of your CV.
        </p>
      </div>

      <ImageUpload
        value={personal.photo}
        onChange={(v) => update("photo", v)}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="John"
            value={personal.firstName}
            onChange={(e) => update("firstName", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={personal.lastName}
            onChange={(e) => update("lastName", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="jobTitle">Job Title</Label>
        <Input
          id="jobTitle"
          placeholder="Senior Software Engineer"
          value={personal.jobTitle}
          onChange={(e) => update("jobTitle", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          placeholder="Write a brief professional summary highlighting your key strengths and career objectives..."
          className="min-h-[120px] resize-none"
          value={personal.summary}
          onChange={(e) => update("summary", e.target.value)}
        />
      </div>
    </div>
  )
}
