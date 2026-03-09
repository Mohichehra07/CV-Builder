import { CVProvider } from "@/lib/cv-context"
import { CVBuilder } from "@/components/cv-builder"

export default function Page() {
  return (
    <CVProvider>
      <CVBuilder />
    </CVProvider>
    
  )
}
