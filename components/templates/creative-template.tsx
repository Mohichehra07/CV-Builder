"use client"

import type { CVData } from "@/lib/cv-types"
import { Mail, Phone, MapPin, Linkedin, Globe, Github, Send } from "lucide-react"

function formatDate(d: string) {
  if (!d) return ""
  const [y, m] = d.split("-")
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  return `${months[parseInt(m, 10) - 1]} ${y}`
}

export function CreativeTemplate({ data }: { data: CVData; density?: number }) {
  const { personal, contact, education, experience, skills, languages } = data
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(" ")
  const location = [contact.district, contact.province, contact.country].filter(Boolean).join(", ")

  const SIDEBAR = "#1a3a6b"
  const ACCENT = "#93c5fd"

  const s = {
    wrap: { width: "794px", minHeight: "1123px", backgroundColor: "#fff", display: "flex", fontFamily: "Arial, sans-serif", fontSize: "10px", boxSizing: "border-box" as const },
    sidebar: { width: "290px", minHeight: "1123px", backgroundColor: SIDEBAR, padding: "36px 24px", color: "#fff", flexShrink: 0, boxSizing: "border-box" as const },
    photo: { width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" as const, border: "3px solid rgba(147,197,253,0.4)", display: "block", margin: "0 auto 16px" },
    sidebarName: { fontSize: "17px", fontWeight: "700", color: "#fff", textAlign: "center" as const, lineHeight: "1.3" },
    sidebarTitle: { fontSize: "9px", fontWeight: "500", textTransform: "uppercase" as const, letterSpacing: "0.12em", color: ACCENT, textAlign: "center" as const, marginTop: "5px" },
    sidebarSection: { marginTop: "24px" },
    sidebarSectionTitle: { fontSize: "8px", fontWeight: "700", textTransform: "uppercase" as const, letterSpacing: "0.15em", color: "rgba(255,255,255,0.45)", marginBottom: "10px" },
    contactItem: { display: "flex", alignItems: "center", gap: "8px", fontSize: "9px", color: "rgba(255,255,255,0.8)", marginBottom: "7px" },
    skillItem: { marginBottom: "8px" },
    skillName: { fontSize: "9px", color: "rgba(255,255,255,0.9)", marginBottom: "4px" },
    pillRow: { display: "flex", gap: "3px" },
    pill: (active: boolean) => ({ width: "14px", height: "4px", borderRadius: "2px", backgroundColor: active ? "#fff" : "rgba(255,255,255,0.2)" }),
    eduItem: { marginBottom: "10px" },
    eduDeg: { fontSize: "9px", fontWeight: "600", color: "rgba(255,255,255,0.9)" },
    eduSchool: { fontSize: "8px", color: ACCENT, marginTop: "2px" },
    eduDate: { fontSize: "8px", color: "rgba(255,255,255,0.4)", marginTop: "1px" },
    langRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" },
    langName: { fontSize: "9px", color: "rgba(255,255,255,0.9)" },
    langLevel: { fontSize: "8px", color: ACCENT },
    // Right side
    main: { flex: 1, padding: "36px 32px", color: "#1f2937", boxSizing: "border-box" as const },
    mainSection: { marginBottom: "22px" },
    mainSectionTitle: { display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: "700", textTransform: "uppercase" as const, letterSpacing: "0.08em", color: SIDEBAR, marginBottom: "12px" },
    accentLine: { width: "18px", height: "2px", backgroundColor: "#3b82f6", display: "inline-block", flexShrink: 0 },
    summary: { fontSize: "10px", color: "#4b5563", lineHeight: "1.65" },
    expItem: { position: "relative" as const, paddingLeft: "14px", marginBottom: "11px" },
    bullet: { position: "absolute" as const, left: "0", top: "4px", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#3b82f6" },
    itemHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
    itemTitle: { fontSize: "10px", fontWeight: "700", color: "#111827" },
    itemSub: { fontSize: "9px", fontWeight: "500", color: "#2563eb", marginTop: "1px" },
    itemDate: { fontSize: "9px", color: "#9ca3af", whiteSpace: "nowrap" as const },
    itemDesc: { fontSize: "9px", color: "#6b7280", marginTop: "3px", lineHeight: "1.5" },
  }

  return (
    <div style={s.wrap}>
      {/* Sidebar */}
      <div style={s.sidebar}>
        {personal.photo && (
          <img src={personal.photo} alt="Profile" style={s.photo} crossOrigin="anonymous" />
        )}
        <div style={s.sidebarName}>{fullName || "Your Name"}</div>
        {personal.jobTitle && <div style={s.sidebarTitle}>{personal.jobTitle}</div>}

        {/* Contact */}
        <div style={s.sidebarSection}>
          <div style={s.sidebarSectionTitle}>Contact</div>
          {contact.email && <div style={s.contactItem}><Mail size={9} color={ACCENT} /><span style={{wordBreak:"break-all"}}>{contact.email}</span></div>}
          {contact.phone && <div style={s.contactItem}><Phone size={9} color={ACCENT} /><span>{contact.phone}</span></div>}
          {location && <div style={s.contactItem}><MapPin size={9} color={ACCENT} /><span>{location}</span></div>}
          {contact.linkedin && <div style={s.contactItem}><Linkedin size={9} color={ACCENT} /><span style={{wordBreak:"break-all"}}>{contact.linkedin}</span></div>}
          {contact.website && <div style={s.contactItem}><Globe size={9} color={ACCENT} /><span style={{wordBreak:"break-all"}}>{contact.website}</span></div>}
          {contact.github && <div style={s.contactItem}><Github size={9} color={ACCENT} /><span style={{wordBreak:"break-all"}}>{contact.github}</span></div>}
          {contact.telegram && <div style={s.contactItem}><Send size={9} color={ACCENT} /><span>{contact.telegram}</span></div>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div style={s.sidebarSection}>
            <div style={s.sidebarSectionTitle}>Skills</div>
            {skills.map((skill) => (
              <div key={skill.id} style={s.skillItem}>
                <div style={s.skillName}>{skill.name}</div>
                <div style={s.pillRow}>
                  {[1,2,3,4,5].map(i => <div key={i} style={s.pill(i <= skill.level)} />)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={s.sidebarSection}>
            <div style={s.sidebarSectionTitle}>Education</div>
            {education.map((edu) => (
              <div key={edu.id} style={s.eduItem}>
                <div style={s.eduDeg}>{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                <div style={s.eduSchool}>{edu.school}</div>
                <div style={s.eduDate}>{formatDate(edu.startDate)}{(edu.startDate || edu.endDate) && " – "}{formatDate(edu.endDate)}</div>
                {edu.description && <div style={{...s.itemDesc, color:"rgba(255,255,255,0.5)"}}>{edu.description}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div style={s.sidebarSection}>
            <div style={s.sidebarSectionTitle}>Languages</div>
            {languages.map((lang) => (
              <div key={lang.id} style={s.langRow}>
                <span style={s.langName}>{lang.name}</span>
                <span style={s.langLevel}>{lang.level.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={s.main}>
        {personal.summary && (
          <div style={s.mainSection}>
            <div style={s.mainSectionTitle}>
              <span style={s.accentLine} />
              About Me
            </div>
            <p style={s.summary}>{personal.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={s.mainSection}>
            <div style={s.mainSectionTitle}>
              <span style={s.accentLine} />
              Experience
            </div>
            {experience.map((exp) => (
              <div key={exp.id} style={s.expItem}>
                <div style={s.bullet} />
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
      </div>
    </div>
  )
}
