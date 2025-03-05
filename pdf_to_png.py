import fitz  # pymupdf

pdf_path = "public\\bayesian_graphs_front_page.pdf"
doc = fitz.open(pdf_path)

for page_number in range(len(doc)):
    page = doc.load_page(page_number)
    pix = page.get_pixmap(dpi=300)  # Higher DPI = better quality
    pix.save(f"bayesian_graphs_front_page_{page_number+1}.png")

print("PDF successfully converted to images!")
