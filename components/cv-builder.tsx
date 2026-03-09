"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { CVSidebar } from "@/components/cv-sidebar"
import { CVFormPanel } from "@/components/cv-form-panel"
import { CVPreview } from "@/components/cv-preview"
import { TemplateSwitcher } from "@/components/template-switcher"
import { downloadPDF } from "@/lib/download-pdf"
import { Button } from "@/components/ui/button"
import { Download, Eye, PenLine, Menu, X } from "lucide-react"

const A4_WIDTH = 794
const A4_HEIGHT = 1123

export function CVBuilder() {
  const [downloading, setDownloading] = useState(false)
  const [mobileView, setMobileView] = useState<"form" | "preview">("form")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const previewWrapperRef = useRef<HTMLDivElement>(null)
  const [previewScale, setPreviewScale] = useState(0.5)

  const recalcPreviewScale = useCallback(() => {
    const wrapper = previewWrapperRef.current
    if (!wrapper) return
    const w = wrapper.clientWidth
    const h = wrapper.clientHeight
    if (w === 0 || h === 0) return
    const padding = 32
    const scaleW = (w - padding) / A4_WIDTH
    const scaleH = (h - padding) / A4_HEIGHT
    const scale = Math.min(scaleW, scaleH, 1)
    setPreviewScale(Math.max(scale, 0.15))
  }, [])

  useEffect(() => {
    // Initial calc after mount
    const t1 = setTimeout(recalcPreviewScale, 100)
    const t2 = setTimeout(recalcPreviewScale, 500)
    window.addEventListener("resize", recalcPreviewScale)

    const wrapper = previewWrapperRef.current
    let ro: ResizeObserver | undefined
    if (wrapper) {
      ro = new ResizeObserver(recalcPreviewScale)
      ro.observe(wrapper)
    }
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener("resize", recalcPreviewScale)
      ro?.disconnect()
    }
  }, [recalcPreviewScale])

  useEffect(() => {
    if (mobileView === "preview") {
      setTimeout(recalcPreviewScale, 50)
      setTimeout(recalcPreviewScale, 300)
    }
  }, [mobileView, recalcPreviewScale])

  async function handleDownload() {
    setDownloading(true)
    const wasOnForm = mobileView === "form"
    if (wasOnForm) {
      setMobileView("preview")
      await new Promise((r) => setTimeout(r, 500))
    }
    try {
      await downloadPDF()
    } catch {
      // silent
    } finally {
      if (wasOnForm) setMobileView("form")
      setDownloading(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <CVSidebar />
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border bg-card px-2 py-2 lg:px-6 lg:py-3 shrink-0 gap-2">
          {/* Left: hamburger + template switcher */}
          <div className="flex items-center gap-1.5 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted lg:hidden shrink-0"
            >
              <Menu className="h-4 w-4" />
            </button>
            {sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="fixed left-[15rem] top-4 z-[60] rounded-full bg-card p-1.5 shadow-lg lg:hidden"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <TemplateSwitcher />
          </div>

          {/* Right: edit/preview toggle + download */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Mobile Edit/Preview toggle — icon only */}
            <div className="flex rounded-lg bg-muted p-0.5 lg:hidden">
              <button
                onClick={() => setMobileView("form")}
                title="Edit"
                className={`flex items-center justify-center rounded-md p-1.5 transition-colors ${
                  mobileView === "form" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                <PenLine className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setMobileView("preview")}
                title="Preview"
                className={`flex items-center justify-center rounded-md p-1.5 transition-colors ${
                  mobileView === "preview" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Download — icon only on mobile */}
            <Button
              onClick={handleDownload}
              disabled={downloading}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 px-2 lg:px-3 lg:gap-1.5"
            >
              <Download className="h-4 w-4" />
              <span className="hidden lg:inline ml-1">
                {downloading ? "Generating..." : "Download PDF"}
              </span>
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden min-h-0">
          {/* Form */}
          <div
            className={`overflow-hidden bg-card min-w-0 lg:flex lg:flex-col lg:w-[460px] lg:shrink-0 ${
              mobileView === "form" ? "flex flex-col flex-1" : "hidden"
            }`}
          >
            <CVFormPanel />
          </div>

          {/* Preview */}
          <div
            ref={previewWrapperRef}
            className={`flex-1 overflow-hidden bg-muted/50 min-w-0 lg:flex ${
              mobileView === "preview" ? "flex" : "hidden"
            }`}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <div
              style={{
                width: A4_WIDTH * previewScale,
                height: A4_HEIGHT * previewScale,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  transform: `scale(${previewScale})`,
                  transformOrigin: "top left",
                  width: A4_WIDTH,
                  height: A4_HEIGHT,
                }}
              >
                <CVPreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
