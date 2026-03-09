"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { type CVData, type TemplateType, type StepId, defaultCVData } from "./cv-types"

interface CVContextType {
  data: CVData
  updateData: <K extends keyof CVData>(section: K, value: CVData[K]) => void
  template: TemplateType
  setTemplate: (t: TemplateType) => void
  currentStep: StepId
  setCurrentStep: (s: StepId) => void
}

const CVContext = createContext<CVContextType | null>(null)

export function CVProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CVData>(defaultCVData)
  const [template, setTemplate] = useState<TemplateType>("modern")
  const [currentStep, setCurrentStep] = useState<StepId>("personal")

  const updateData = useCallback(<K extends keyof CVData>(section: K, value: CVData[K]) => {
    setData((prev) => ({ ...prev, [section]: value }))
  }, [])

  return (
    <CVContext.Provider
      value={{ data, updateData, template, setTemplate, currentStep, setCurrentStep }}
    >
      {children}
    </CVContext.Provider>
  )
}

export function useCVContext() {
  const ctx = useContext(CVContext)
  if (!ctx) throw new Error("useCVContext must be used within CVProvider")
  return ctx
}
