"use client"

import { useMemo } from "react"
import { useCVContext } from "@/lib/cv-context"
import { ModernTemplate } from "@/components/templates/modern-template"
import { ClassicTemplate } from "@/components/templates/classic-template"
import { CreativeTemplate } from "@/components/templates/creative-template"
import type { CVData } from "@/lib/cv-types"

function computeDensity(data: CVData): number {
  let weight = 0
  const { personal, contact, education, experience, skills, languages } = data
  if (personal.summary && personal.summary.length > 100) weight += 1
  if (personal.summary && personal.summary.length > 250) weight += 1
  const contactFields = [contact.email, contact.phone, contact.country, contact.linkedin, contact.website, contact.github, contact.telegram]
  if (contactFields.filter(Boolean).length >= 5) weight += 1
  weight += education.length * 1.5
  education.forEach(e => { if (e.description && e.description.length > 50) weight += 0.5 })
  weight += experience.length * 2
  experience.forEach(e => { if (e.description && e.description.length > 80) weight += 1 })
  weight += skills.length * 0.3
  weight += languages.length * 0.3
  if (weight <= 6) return 0
  if (weight <= 10) return 1
  if (weight <= 16) return 2
  return 3
}

export function CVPreview() {
  const { data, template } = useCVContext()
  const density = useMemo(() => computeDensity(data), [data])

  return (
    <div
      id="cv-preview"
      style={{
        width: "794px",
        height: "1123px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {template === "modern" && <ModernTemplate data={data} density={density} />}
      {template === "classic" && <ClassicTemplate data={data} density={density} />}
      {template === "creative" && <CreativeTemplate data={data} density={density} />}
    </div>
  )
}
