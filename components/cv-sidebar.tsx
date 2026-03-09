"use client"

import { useCVContext } from "@/lib/cv-context"
import { STEPS, type StepId } from "@/lib/cv-types"
import {
  User,
  Mail,
  GraduationCap,
  Briefcase,
  Star,
  Languages,
  FileText,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap = {
  User,
  Mail,
  GraduationCap,
  Briefcase,
  Star,
  Languages,
}

const stepOrder: StepId[] = STEPS.map((s) => s.id)

function getStepStatus(stepId: StepId, currentStep: StepId) {
  const currentIdx = stepOrder.indexOf(currentStep)
  const stepIdx = stepOrder.indexOf(stepId)
  if (stepIdx < currentIdx) return "completed"
  if (stepIdx === currentIdx) return "current"
  return "upcoming"
}

export function CVSidebar() {
  const { currentStep, setCurrentStep } = useCVContext()

  return (
    <aside className="flex w-64 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2.5 border-b border-sidebar-border px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <FileText className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-base font-semibold tracking-tight text-sidebar-foreground">
            ResumeForge
          </h1>
          <p className="text-xs text-sidebar-foreground/60">AI CV Builder</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
          Build Steps
        </p>
        <ul className="flex flex-col gap-1">
          {STEPS.map((step) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap]
            const status = getStepStatus(step.id, currentStep)
            return (
              <li key={step.id}>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    status === "current" &&
                      "bg-sidebar-accent text-sidebar-accent-foreground",
                    status === "completed" &&
                      "text-sidebar-foreground/80 hover:bg-sidebar-accent/50",
                    status === "upcoming" &&
                      "text-sidebar-foreground/40 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground/60"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-md text-xs transition-all",
                      status === "current" &&
                        "bg-sidebar-primary text-sidebar-primary-foreground",
                      status === "completed" &&
                        "bg-sidebar-primary/20 text-sidebar-primary",
                      status === "upcoming" &&
                        "bg-sidebar-accent text-sidebar-foreground/40"
                    )}
                  >
                    {status === "completed" ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Icon className="h-3.5 w-3.5" />
                    )}
                  </span>
                  {step.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* <div className="border-t border-sidebar-border px-4 py-4">
        <p className="text-center text-[11px] text-sidebar-foreground/30">
          ResumeForge v1.0
        </p> */}
      {/* </div> */}
    </aside>
  )
}
