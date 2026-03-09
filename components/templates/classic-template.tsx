"use client"

import type { CVData } from "@/lib/cv-types"

function formatDate(d: string) {
  if (!d) return ""
  const [y, m] = d.split("-")
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  return `${months[parseInt(m, 10) - 1]} ${y}`
}

export function ClassicTemplate({ data }: { data: CVData; density?: number }) {
  const { personal, contact, education, experience, skills, languages } = data
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(" ")
  const location = [contact.district, contact.province, contact.country].filter(Boolean).join(", ")

  const s = {
    wrap: { width: "794px", minHeight: "1123px", backgroundColor: "#fff", padding: "44px 52px", fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "10px", color: "#1f2937", boxSizing: "border-box" as const, lineHeight: "1.6" },
    headerCenter: { textAlign: "center" as const, marginBottom: "20px" },
    photo: { width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover" as const, border: "2px solid #d1d5db", marginBottom: "10px" },
    name: { fontSize: "24px", fontWeight: "700", letterSpacing: "0.04em", color: "#111827", margin: 0 },
    title: { fontSize: "11px", color: "#6b7280", letterSpacing: "0.1em", marginTop: "4px" },
    contactLine: { display: "flex", justifyContent: "center", flexWrap: "wrap" as const, gap: "0 6px", marginTop: "8px", fontSize: "9px", color: "#6b7280" },
    sep: { color: "#d1d5db" },
    doubleLine: { borderTop: "2px double #9ca3af", marginBottom: "20px" },
    section: { marginBottom: "18px" },
    sectionTitle: { fontSize: "10px", fontWeight: "700", textTransform: "uppercase" as const, letterSpacing: "0.15em", color: "#111827", borderBottom: "1px solid #d1d5db", paddingBottom: "4px", marginBottom: "10px" },
    summary: { fontSize: "10px", color: "#4b5563", lineHeight: "1.7" },
    itemWrap: { marginBottom: "10px" },
    itemHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
    itemTitle: { fontSize: "10px", fontWeight: "700", color: "#111827" },
    itemSub: { fontSize: "9px", fontStyle: "italic", color: "#6b7280", marginTop: "1px" },
    itemDate: { fontSize: "9px", fontStyle: "italic", color: "#6b7280", whiteSpace: "nowrap" as const },
    itemDesc: { fontSize: "9px", color: "#6b7280", marginTop: "3px", lineHeight: "1.5" },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 32px" },
    skillItem: { marginBottom: "2px" },
    skillName: { fontSize: "10px", color: "#374151", marginBottom: "2px" },
    bar: { height: "3px", backgroundColor: "#e5e7eb", borderRadius: "2px" },
    barFill: (level: number) => ({ height: "3px", backgroundColor: "#374151", borderRadius: "2px", width: `${(level / 5) * 100}%` }),
    langRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    langName: { fontSize: "10px", color: "#374151" },
    langLevel: { fontSize: "9px", fontStyle: "italic", color: "#6b7280" },
  }

  return (
    <div style={s.wrap}>
      {/* Header */}
      <div style={s.headerCenter}>
        {personal.photo && (
          <div><img src={personal.photo} alt="Profile" style={s.photo} crossOrigin="anonymous" /></div>
        )}
        <h1 style={s.name}>{fullName || "Your Name"}</h1>
        {personal.jobTitle && <p style={s.title}>{personal.jobTitle}</p>}
        <div style={s.contactLine}>
          {contact.email && <span>{contact.email}</span>}
          {contact.phone && <><span style={s.sep}> | </span><span>{contact.phone}</span></>}
          {location && <><span style={s.sep}> | </span><span>{location}</span></>}
          {contact.linkedin && <><span style={s.sep}> | </span><span>{contact.linkedin}</span></>}
          {contact.github && <><span style={s.sep}> | </span><span>{contact.github}</span></>}
          {contact.telegram && <><span style={s.sep}> | </span><span>{contact.telegram}</span></>}
          {contact.website && <><span style={s.sep}> | </span><span>{contact.website}</span></>}
        </div>
      </div>

      <div style={s.doubleLine} />

      {personal.summary && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Professional Summary</div>
          <p style={s.summary}>{personal.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Professional Experience</div>
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
          <div style={s.grid2}>
            {skills.map((skill) => (
              <div key={skill.id} style={s.skillItem}>
                <div style={s.skillName}>{skill.name}</div>
                <div style={s.bar}><div style={s.barFill(skill.level)} /></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {languages.length > 0 && (
        <div style={s.section}>
          <div style={s.sectionTitle}>Languages</div>
          <div style={s.grid2}>
            {languages.map((lang) => (
              <div key={lang.id} style={s.langRow}>
                <span style={s.langName}>{lang.name}</span>
                <span style={s.langLevel}>{lang.level.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
