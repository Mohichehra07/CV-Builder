"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Camera, Trash2, ZoomIn } from "lucide-react"

interface ImageUploadProps {
  value: string | null
  onChange: (value: string | null) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rawImage, setRawImage] = useState<string | null>(null)
  const [showCrop, setShowCrop] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const offsetStart = useRef({ x: 0, y: 0 })

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setRawImage(reader.result as string)
      setZoom(1)
      setOffset({ x: 0, y: 0 })
      setShowCrop(true)
    }
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  const drawPreview = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !rawImage) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const size = 300
      canvas.width = size
      canvas.height = size
      ctx.clearRect(0, 0, size, size)

      // Circular clip
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      ctx.clip()

      const scale = zoom * Math.max(size / img.width, size / img.height)
      const w = img.width * scale
      const h = img.height * scale
      const x = (size - w) / 2 + offset.x
      const y = (size - h) / 2 + offset.y

      ctx.drawImage(img, x, y, w, h)
    }
    img.src = rawImage
  }, [rawImage, zoom, offset])

  useEffect(() => {
    if (showCrop) drawPreview()
  }, [showCrop, drawPreview])

  function handleMouseDown(e: React.MouseEvent) {
    setDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    offsetStart.current = { ...offset }
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!dragging) return
    setOffset({
      x: offsetStart.current.x + (e.clientX - dragStart.current.x),
      y: offsetStart.current.y + (e.clientY - dragStart.current.y),
    })
  }

  function handleMouseUp() {
    setDragging(false)
  }

  function applyCrop() {
    const canvas = canvasRef.current
    if (!canvas) return
    onChange(canvas.toDataURL("image/jpeg", 0.9))
    setShowCrop(false)
    setRawImage(null)
  }

  function remove() {
    onChange(null)
  }

  return (
    <>
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative">
            <img
              src={value}
              alt="Profile photo"
              className="h-20 w-20 rounded-full border-2 border-border object-cover"
            />
            <button
              onClick={remove}
              className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white shadow-md transition-transform hover:scale-110"
              aria-label="Remove photo"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-full border-2 border-dashed border-border bg-muted/50 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            <Camera className="h-5 w-5" />
            <span className="text-[9px] font-medium">Upload</span>
          </button>
        )}
        <div>
          <p className="text-sm font-medium text-foreground">Profile Photo</p>
          <p className="text-xs text-muted-foreground">
            {value ? "Click the X to remove" : "Upload a professional headshot"}
          </p>
          {value && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-1 h-7 px-2 text-xs text-primary"
              onClick={() => fileRef.current?.click()}
            >
              Change Photo
            </Button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      <Dialog open={showCrop} onOpenChange={setShowCrop}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Crop Photo</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <div
              className="relative cursor-move overflow-hidden rounded-full border-2 border-border"
              style={{ width: 250, height: 250 }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <canvas
                ref={canvasRef}
                className="h-full w-full"
                style={{ width: 250, height: 250 }}
              />
            </div>
            <div className="flex w-full items-center gap-3 px-4">
              <ZoomIn className="h-4 w-4 text-muted-foreground" />
              <Slider
                min={1}
                max={3}
                step={0.05}
                value={[zoom]}
                onValueChange={([v]) => setZoom(v)}
                className="flex-1"
              />
              <span className="w-10 text-right text-xs text-muted-foreground">
                {Math.round(zoom * 100)}%
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCrop(false)}>
              Cancel
            </Button>
            <Button onClick={applyCrop} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
