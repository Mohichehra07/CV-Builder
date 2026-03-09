export type TemplateType = "modern" | "classic" | "creative"

export interface PersonalInfo {
  firstName: string
  lastName: string
  jobTitle: string
  summary: string
  photo: string | null
}

export interface ContactInfo {
  email: string
  phone: string
  country: string
  province: string
  district: string
  linkedin: string
  website: string
  github: string
  telegram: string
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  description: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Skill {
  id: string
  name: string
  level: number // 1-5
}

export type LanguageLevel = "beginner" | "elementary" | "intermediate" | "upper-intermediate" | "advanced" | "native"

export interface Language {
  id: string
  name: string
  level: LanguageLevel
}

export interface CVData {
  personal: PersonalInfo
  contact: ContactInfo
  education: Education[]
  experience: Experience[]
  skills: Skill[]
  languages: Language[]
}

export const defaultCVData: CVData = {
  personal: {
    firstName: "",
    lastName: "",
    jobTitle: "",
    summary: "",
    photo: null,
  },
  contact: {
    email: "",
    phone: "",
    country: "",
    province: "",
    district: "",
    linkedin: "",
    website: "",
    github: "",
    telegram: "",
  },
  education: [],
  experience: [],
  skills: [],
  languages: [],
}

export const STEPS = [
  { id: "personal", label: "Personal", icon: "User" },
  { id: "contact", label: "Contact", icon: "Mail" },
  { id: "education", label: "Education", icon: "GraduationCap" },
  { id: "experience", label: "Experience", icon: "Briefcase" },
  { id: "skills", label: "Skills", icon: "Star" },
  { id: "languages", label: "Languages", icon: "Languages" },
] as const

export type StepId = (typeof STEPS)[number]["id"]
