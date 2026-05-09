import fitz
from pathlib import Path
path = Path('Sample Design/Home - TeamManager.pdf')
doc = fitz.open(path)
for i in range(len(doc)):
    pix = doc[i].get_pixmap(alpha=False, dpi=150)
    out = Path(f'home_teammanager_page_{i+1}.png')
    pix.save(out)
    print(out.name, out.exists())
