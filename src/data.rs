//! The portfolio's files, generated from data/info.txt by build.rs.

pub enum Kind {
    Txt(&'static str),
    Pdf(&'static str),
    Alert(&'static str),
    Folder(&'static [usize]),
}

pub struct File {
    pub name: &'static str,
    pub icon: Option<&'static str>,
    pub open: bool,
    pub kind: Kind,
}

impl File {
    pub fn icon(&self) -> &'static str {
        let fallback = match self.kind {
            Kind::Txt(_) => "txt",
            Kind::Pdf(_) => "pdf",
            Kind::Alert(_) => "alert",
            Kind::Folder(_) => "folder",
        };
        crate::icons::lookup(self.icon.unwrap_or(fallback))
            .or_else(|| crate::icons::lookup(fallback))
            .unwrap_or("📄")
    }
}

include!(concat!(env!("OUT_DIR"), "/files.rs"));
