"""Builds dist/tropical-weather-card.js from src/ (card source + translations)."""
from pathlib import Path

root = Path(__file__).parent
card = (root / "src" / "card.src.js").read_text(encoding="utf-8")
i18n = (root / "src" / "i18n.js").read_text(encoding="utf-8")
i18n += "\n" + (root / "src" / "tile_icons.js").read_text(encoding="utf-8")
assert card.count("/*__I18N__*/") == 1, "translation marker missing in card source"
(root / "dist" / "tropical-weather-card.js").write_text(card.replace("/*__I18N__*/", i18n.rstrip() + "\n"), encoding="utf-8")
print("dist/tropical-weather-card.js built")
