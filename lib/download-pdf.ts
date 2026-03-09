import { domToCanvas } from 'modern-screenshot';
import { jsPDF } from 'jspdf';

export async function downloadPDF() {
  const element = document.getElementById("cv-preview");
  if (!element) return;

  try {
    // Rasmlar va shriftlar yuklanishi uchun kutamiz
    await new Promise(resolve => setTimeout(resolve, 300));

    // Element o'lchamini oldindan belgilaymiz — layout buzilmasin
    const canvas = await domToCanvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      width: 794,
      height: 1123,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();   // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("my-cv.pdf");

  } catch (error) {
    console.error("PDF xatosi:", error);
  }
}
