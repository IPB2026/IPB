#!/usr/bin/env python3
"""
Génère le QR code Google Reviews pour IPB Expertise.

Usage :
    pip install qrcode
    python scripts/generate-google-reviews-qr.py [URL_PERSONNALISEE]

Sans argument, génère un QR pointant vers une recherche Google
"IPB Expertise Toulouse". Pour le QR définitif, récupérer l'URL
courte officielle depuis Google Business Profile :

    Fiche entreprise → Demander des avis → Partager le lien

Format attendu :
    https://g.page/r/<idUnique>/review

Puis :
    python scripts/generate-google-reviews-qr.py "https://g.page/r/XXX/review"

Le SVG généré est utilisable :
- Sur les factures (en bas à droite, ~3cm)
- Sur les CR de chantier
- Sur les cartes de visite verso
- Affiché en boutique / au cabinet
"""

import sys
from pathlib import Path

try:
    import qrcode
    import qrcode.image.svg
except ImportError:
    print("Installe d'abord : pip install qrcode")
    sys.exit(1)


def generate(url: str, output_path: Path) -> None:
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(image_factory=qrcode.image.svg.SvgPathImage)
    img.save(str(output_path))
    print(f"QR généré : {output_path}")
    print(f"   URL encodée : {url}")
    print(f"   Taille : {output_path.stat().st_size} bytes")


if __name__ == "__main__":
    DEFAULT_URL = "https://www.google.com/search?q=IPB+Expertise+Toulouse&hl=fr"
    url = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_URL

    output = Path(__file__).parent.parent / "public" / "images" / "qr-google-reviews.svg"
    output.parent.mkdir(parents=True, exist_ok=True)
    generate(url, output)
