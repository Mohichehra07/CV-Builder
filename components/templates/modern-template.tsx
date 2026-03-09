"use client"

import type { CVData } from "@/lib/cv-types"
import { Mail, Phone, MapPin, Linkedin, Globe, Github, Send } from "lucide-react"

function formatDate(d: string) {
  if (!d) return ""
  const [y, m] = d.split("-")
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  return `${months[parseInt(m, 10) - 1]} ${y}`
}

export function ModernTemplate({ data }: { data: CVData; density?: number }) {
  const { personal, contact, education, experience, skills, languages } = data
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(" ")
  const location = [contact.district, contact.province, contact.country].filter(Boolean).join(", ")

  const s = {
    wrap: { width: "794px", minHeight: "1123px", backgroundColor: "#fff", padding: "40px 44px", fontFamily: "Arial, sans-serif", fontSize: "10px", color: "#1f2937", boxSizing: "border-box" as const, lineHeight: "1.5" },
    header: { display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "24px" },
    photo: { width: "68px", height: "68px", borderRadius: "50%", objectFit: "cover" as const, flexShrink: 0 },
    name: { fontSize: "22px", fontWeight: "700", color: "#111827", margin: 0, lineHeight: "1.2" },
    title: { fontSize: "11px", fontWeight: "600", color: "#4f46e5", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginTop: "4px" },
    contactRow: { display: "flex", flexWrap: "wrap" as const, gap: "4px 16px", marginTop: "8px" },
    contactItem: { display: "flex", alignItems: "center", gap: "4px", fontSize: "9px", color: "#6b7280" },
    divider: { height: "1px", backgroundColor: "#e5e7eb", margin: "0 0 20px 0" },
    section: { marginBottom: "20px" },
    sectionTitle: { fontSize: "11px", fontWeight: "700", textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#111827", marginBottom: "10px" },
    summary: { fontSize: "10px", color: "#4b5563", lineHeight: "1.6" },
    itemWrap: { marginBottom: "10px" },
    itemHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
    itemTitle: { fontSize: "10px", fontWeight: "600", color: "#111827" },
    itemSub: { fontSize: "9px", fontWeight: "500", color: "#4f46e5", marginTop: "1px" },
    itemDate: { fontSize: "9px", color: "#9ca3af", whiteSpace: "nowrap" as const },
    itemDesc: { fontSize: "9px", color: "#6b7280", marginTop: "3px", lineHeight: "1.5" },
    skillsWrap: { display: "flex", flexWrap: "wrap" as const, gap: "6px 20px" },
    skillItem: { display: "flex", alignItems: "center", gap: "8px" },
    skillName: { fontSize: "10px", color: "#374151" },
    dotsWrap: { display: "flex", gap: "3px" },
    dot: (active: boolean) => ({ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: active ? "#4f46e5" : "#e5e7eb" }),
    langWrap: { display: "flex", flexWrap: "wrap" as const, gap: "4px 24px" },
    langItem: { display: "flex", alignItems: "center", gap: "6px" },
    langName: { fontSize: "10px", color: "#374151" },
    langLevel: { fontSize: "9px", color: "#4f46e5" },
  }

  return (
    <div style={s.wrap}>
      {/* Header */}
      <div style={s.header}>
        {personal.photo && (
          <img src={personal.photo} alt="Profile" style={s.photo} crossOrigin="anonymous" />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={s.name}>{fullName || "Your Name"}</h1>
          {personal.jobTitle && <p style={s.title}>{personal.jobTitle}</p>}
          <div style={s.contactRow}>
            {contact.email && <span style={s.contactItem}><Mail size={9} />{contact.email}</span>}
            {contact.phone && <span style={s.contactItem}><Phone size={9} />{contact.phone}</span>}
            {location && <span style={s.contactItem}><MapPin size={9} />{location}</span>}
            {contact.linkedin && <span style={s.contactItem}><Linkedin size={9} />{contact.linkedin}</span>}
            {contact.website && <span style={s.contactItem}><Globe size={9} />{contact.website}</span>}
            {contact.github && <span style={s.contactItem}><Github size={9} />{contact.github}</span>}
            {contact.telegram && <span style={s.contactItem}><Send size={9} />{contact.telegram}</span>}
          </div>
        </div>
      </div>

      {personal.summary && (
        <div style={s.section}>
          <p style={s.summary}>{personal.summary}</p>
        </div>
      )}

      <div style={s.divider} />

      {experience.length > 0 && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Experience</div>
          {experience.map((exp) => (
            <div key={exp.id} style={s.itemWrap}>
              <div style={s.itemHeader}>
                <div>
                  <div style={s.itemTitle}>{exp.position}</div>
                  <div style={s.itemSub}>{exp.company}</div>
                </div>
                <div style={s.itemDate}>
                  {formatDate(exp.startDate)}{(exp.startDate || exp.endDate || exp.current) && " – "}{exp.current ? "Present" : formatDate(exp.endDate)}
                </div>
              </div>
              {exp.description && <div style={s.itemDesc}>{exp.description}</div>}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Education</div>
          {education.map((edu) => (
            <div key={edu.id} style={s.itemWrap}>
              <div style={s.itemHeader}>
                <div>
                  <div style={s.itemTitle}>{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                  <div style={s.itemSub}>{edu.school}</div>
                </div>
                <div style={s.itemDate}>
                  {formatDate(edu.startDate)}{(edu.startDate || edu.endDate) && " – "}{formatDate(edu.endDate)}
                </div>
              </div>
              {edu.description && <div style={s.itemDesc}>{edu.description}</div>}
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Skills</div>
          <div style={s.skillsWrap}>
            {skills.map((skill) => (
              <div key={skill.id} style={s.skillItem}>
                <span style={s.skillName}>{skill.name}</span>
                <div style={s.dotsWrap}>
                  {[1,2,3,4,5].map(i => <div key={i} style={s.dot(i <= skill.level)} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {languages.length > 0 && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Languages</div>
          <div style={s.langWrap}>
            {languages.map((lang) => (
              <div key={lang.id} style={s.langItem}>
                <span style={s.langName}>{lang.name}</span>
                <span style={s.langLevel}>({lang.level.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
