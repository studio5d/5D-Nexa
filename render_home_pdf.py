import fitz
from pathlib import Path
path = Path('Home.pdf')
doc = fitz.open(path)
for i in range(min(2, len(doc))):
    pix = doc[i].get_pixmap(alpha=False, dpi=150)
    out = Path(f'home_design_page_{i+1}.png')
    pix.save(out)
    print(out.name, out.exists())
