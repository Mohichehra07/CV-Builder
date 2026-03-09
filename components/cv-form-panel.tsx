"use client"

import { useCVContext } from "@/lib/cv-context"
import { STEPS, type StepId } from "@/lib/cv-types"
import { PersonalStep } from "@/components/steps/personal-step"
import { ContactStep } from "@/components/steps/contact-step"
import { EducationStep } from "@/components/steps/education-step"
import { ExperienceStep } from "@/components/steps/experience-step"
import { SkillsStep } from "@/components/steps/skills-step"
import { LanguagesStep } from "@/components/steps/languages-step"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const stepOrder: StepId[] = STEPS.map((s) => s.id)

const stepComponents: Record<StepId, React.ComponentType> = {
  personal: PersonalStep,
  contact: ContactStep,
  education: EducationStep,
  experience: ExperienceStep,
  skills: SkillsStep,
  languages: LanguagesStep,
}

export function CVFormPanel() {
  const { currentStep, setCurrentStep } = useCVContext()
  const currentIdx = stepOrder.indexOf(currentStep)
  const StepComponent = stepComponents[currentStep]
  const isFirst = currentIdx === 0
  const isLast = currentIdx === stepOrder.length - 1

  function goNext() {
    if (!isLast) setCurrentStep(stepOrder[currentIdx + 1])
  }

  function goPrev() {
    if (!isFirst) setCurrentStep(stepOrder[currentIdx - 1])
  }

  return (
    <div className="flex h-full flex-col min-h-0">
      {/* Step indicator — scrolls horizontally on tiny screens */}
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3 overflow-x-auto shrink-0 scrollbar-none">
        {STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setCurrentStep(step.id)}
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all shrink-0 ${
                i < currentIdx
                  ? "bg-primary text-primary-foreground"
                  : i === currentIdx
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-2 ring-offset-card"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {i + 1}
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={`h-px w-4 shrink-0 transition-colors ${
                  i < currentIdx ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
        {/* Step label on the right */}
        <span className="ml-auto shrink-0 text-xs font-medium text-muted-foreground pl-2">
          {STEPS[currentIdx]?.label}
        </span>
      </div>

      {/* Form content — takes remaining space */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-4 sm:p-6">
          <StepComponent />
        </div>
      </ScrollArea>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-border px-4 py-3 shrink-0">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={isFirst}
          size="sm"
          className="gap-1.5"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        <span className="text-xs text-muted-foreground">
          {currentIdx + 1} / {STEPS.length}
        </span>
        <Button
          onClick={goNext}
          disabled={isLast}
          size="sm"
          className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
