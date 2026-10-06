//! Parses data/info.txt at compile time and generates the static file table
//! included by src/data.rs. A syntax error in the data fails the build.

use pest::Parser;
use pest::iterators::Pair;
use pest_derive::Parser;
use std::fmt::Write;
use std::{env, fs, path::Path, process};

#[derive(Parser)]
#[grammar = "../grammar/portfolio.pest"]
struct DataParser;

const DATA_PATH: &str = "data/info.txt";

fn main() {
    println!("cargo:rerun-if-changed={DATA_PATH}");
    println!("cargo:rerun-if-changed=grammar/portfolio.pest");

    let src = fs::read_to_string(DATA_PATH).unwrap_or_else(|e| fail(&format!("{DATA_PATH}: {e}")));
    let data = DataParser::parse(Rule::data, &src)
        .unwrap_or_else(|e| fail(&e.with_path(DATA_PATH).to_string()))
        .next()
        .unwrap();

    let mut title = String::from("portfolio");
    let mut files = Vec::new();
    let mut desktop = Vec::new();
    for pair in data.into_inner() {
        match pair.as_rule() {
            Rule::setting => title = unquote(pair.into_inner().next().unwrap()),
            Rule::file => desktop.push(flatten(pair, &mut files)),
            _ => {}
        }
    }

    let mut out = String::new();
    writeln!(out, "pub const TITLE: &str = {title:?};").unwrap();
    writeln!(out, "pub static DESKTOP: &[usize] = &{desktop:?};").unwrap();
    writeln!(out, "pub static FILES: &[File] = &[").unwrap();
    for f in &files {
        writeln!(out, "    {f},").unwrap();
    }
    writeln!(out, "];").unwrap();

    let dest = Path::new(&env::var("OUT_DIR").unwrap()).join("files.rs");
    fs::write(dest, out).unwrap();
}

/// Appends `file` and its descendants to `files` in pre-order, returning the
/// index of `file`.
fn flatten(file: Pair<Rule>, files: &mut Vec<String>) -> usize {
    let index = files.len();
    files.push(String::new());

    let mut open = false;
    let mut entry = None;
    for part in file.into_inner() {
        match part.as_rule() {
            Rule::open => open = true,
            _ => entry = Some(part),
        }
    }
    let entry = entry.unwrap();
    let is_folder = entry.as_rule() == Rule::folder;

    let mut name = String::new();
    let mut icon = None;
    let mut kind = String::new();
    let mut children = Vec::new();
    for part in entry.into_inner() {
        match part.as_rule() {
            Rule::text_kind => kind = part.as_str().to_owned(),
            Rule::name => name = unquote(part.into_inner().next().unwrap()),
            Rule::icon => icon = Some(part.as_str().to_owned()),
            Rule::text => {
                let body = trim_text(&part.into_inner().next().unwrap().as_str().replace("\\}", "}"));
                kind = match kind.as_str() {
                    "TXT" => format!("Kind::Txt({body:?})"),
                    "PDF" => format!("Kind::Pdf({:?})", body.trim()),
                    _ => format!("Kind::Alert({body:?})"),
                };
            }
            Rule::file => children.push(flatten(part, files)),
            _ => {}
        }
    }
    if is_folder {
        kind = format!("Kind::Folder(&{children:?})");
    }

    files[index] = format!("File {{ name: {name:?}, icon: {icon:?}, open: {open}, kind: {kind} }}");
    index
}

fn unquote(pair: Pair<Rule>) -> String {
    match pair.as_rule() {
        Rule::string => {
            let mut out = String::new();
            let mut chars = pair.into_inner().next().unwrap().as_str().chars();
            while let Some(c) = chars.next() {
                match c {
                    '\\' => out.extend(chars.next()),
                    c => out.push(c),
                }
            }
            out
        }
        _ => pair.as_str().to_owned(),
    }
}

/// Strips leading tabs from every line (tabs only indent the data file; use
/// spaces for indentation that should show up), then drops the blank first and
/// last lines that come from putting `{` and `}` on their own lines.
/// Single-line text is trimmed instead.
fn trim_text(text: &str) -> String {
    if !text.contains('\n') {
        return text.trim().to_owned();
    }
    let mut lines: Vec<&str> = text.split('\n').map(|l| l.trim_start_matches('\t')).collect();
    if lines.first().is_some_and(|l| l.trim().is_empty()) {
        lines.remove(0);
    }
    if lines.last().is_some_and(|l| l.trim().is_empty()) {
        lines.pop();
    }
    lines.join("\n")
}

fn fail(msg: &str) -> ! {
    eprintln!("\n{msg}\n");
    process::exit(1);
}
