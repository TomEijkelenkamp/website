import fitz  # pymupdf

pdf_path = "public\\research_internship_front_page.pdf"
doc = fitz.open(pdf_path)

for page_number in range(len(doc)):
    page = doc.load_page(page_number)
    pix = page.get_pixmap(dpi=300)  # Higher DPI = better quality
    pix.save(f"research_internship_front_page_{page_number+1}.png")

print("PDF successfully converted to images!")
