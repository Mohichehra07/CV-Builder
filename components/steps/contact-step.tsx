"use client"

import { useCVContext } from "@/lib/cv-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ContactStep() {
  const { data, updateData } = useCVContext()
  const { contact } = data

  function update(field: keyof typeof contact, value: string) {
    updateData("contact", { ...contact, [field]: value })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Contact Details</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          How can potential employers reach you? Make sure these are up to date.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email..."
            value={contact.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={contact.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          placeholder="Enter your coutry"
          value={contact.country}
          onChange={(e) => update("country", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* <div className="flex flex-col gap-2">
          <Label htmlFor="province">Province</Label>
          <Input
            id="province"
            placeholder="California"
            value={contact.province}
            onChange={(e) => update("province", e.target.value)}
          />
        </div> */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="district">District / City</Label>
          <Input
            id="district"
            placeholder="Enter your city"
            value={contact.district}
            onChange={(e) => update("district", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/example"
            value={contact.linkedin}
            onChange={(e) => update("linkedin", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            placeholder="Your site.com"
            value={contact.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            placeholder="github.com/example"
            value={contact.github}
            onChange={(e) => update("github", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="telegram">Telegram</Label>
          <Input
            id="telegram"
            placeholder="@username"
            value={contact.telegram}
            onChange={(e) => update("telegram", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
