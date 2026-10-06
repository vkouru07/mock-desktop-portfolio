//! Icon names usable in data/info.txt. Files without an icon (or with an
//! unknown one) use the icon for their file type.

const ICONS: &[(&str, &str)] = &[
    ("txt", "📄"),
    ("pdf", "📕"),
    ("folder", "📁"),
    ("alert", "⚠️"),
    ("image", "🖼️"),
    ("help", "❔"),
    ("about", "🙂"),
    ("contact", "✉️"),
    ("resume", "📕"),
];

pub fn lookup(name: &str) -> Option<&'static str> {
    ICONS.iter().find(|(n, _)| *n == name).map(|(_, icon)| *icon)
}
