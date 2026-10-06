use crate::data::{DESKTOP, FILES, Kind, TITLE};
use crate::window::Window;
use leptos::prelude::*;
use std::time::Duration;

const INIT_OFFSET_X: f64 = 200.0;
const INIT_OFFSET_Y: f64 = 100.0;
const X_TO_Y_OFFSET_RATIO: f64 = 2.5;
const INCREMENTAL_OFFSET: f64 = 100.0;

/// an open window, identified by the index of its file in `FILES`.
#[derive(Clone, Copy)]
pub struct Win {
    pub file: usize,
    pub z: RwSignal<u32>,
    pub x: RwSignal<f64>,
    pub y: RwSignal<f64>,
}

impl Win {
    fn new(file: usize, z: u32, x: f64, y: f64) -> Self {
        Win { file, z: RwSignal::new(z), x: RwSignal::new(x), y: RwSignal::new(y) }
    }
}

/// shared desktop state, available to every component through context.
#[derive(Clone, Copy)]
pub struct Desk {
    pub wins: RwSignal<Vec<Win>>,
    top_z: StoredValue<u32>,
}

impl Desk {
    pub fn open(self, file: usize) {
        if let Kind::Alert(text) = FILES[file].kind {
            let _ = window().alert_with_message(&strip_tags(text));
            return;
        }
        if self.wins.with_untracked(|ws| ws.iter().any(|w| w.file == file)) {
            self.focus(file);
            return;
        }
        let offset = self.wins.with_untracked(Vec::len) as f64 * 20.0 + INCREMENTAL_OFFSET;
        let win = Win::new(file, self.next_z(), offset, offset);
        self.wins.update(|ws| ws.push(win));
    }

    pub fn focus(self, file: usize) {
        if let Some(win) = self.wins.with_untracked(|ws| ws.iter().find(|w| w.file == file).copied()) {
            win.z.set(self.next_z());
        }
    }

    pub fn close(self, file: usize) {
        self.wins.update(|ws| ws.retain(|w| w.file != file));
    }

    fn next_z(self) -> u32 {
        self.top_z.update_value(|z| *z += 1);
        self.top_z.get_value()
    }
}

fn strip_tags(html: &str) -> String {
    let mut out = String::new();
    let mut in_tag = false;
    for c in html.chars() {
        match c {
            '<' => in_tag = true,
            '>' => in_tag = false,
            c if !in_tag => out.push(c),
            _ => {}
        }
    }
    out
}

#[component]
pub fn App() -> impl IntoView {
    document().set_title(TITLE);

    let initial: Vec<Win> = (0..FILES.len())
        .filter(|&i| FILES[i].open)
        .enumerate()
        .map(|(n, file)| {
            let offset = n as f64 * 70.0;
            Win::new(file, n as u32 + 1, INIT_OFFSET_X + offset * X_TO_Y_OFFSET_RATIO, INIT_OFFSET_Y + offset)
        })
        .collect();
    let desk = Desk { top_z: StoredValue::new(initial.len() as u32), wins: RwSignal::new(initial) };
    provide_context(desk);

    view! {
        <div class="app">
            <Desktop />
            <For each=move || desk.wins.get() key=|w| w.file children=|w| view! { <Window win=w /> } />
            <Taskbar />
        </div>
    }
}

#[component]
fn Desktop() -> impl IntoView {
    let desk = expect_context::<Desk>();
    view! {
        <div class="desktop">
            {DESKTOP
                .iter()
                .map(|&i| {
                    view! {
                        <div class="desktop-icon" on:dblclick=move |_| desk.open(i)>
                            <div class="icon">{FILES[i].icon()}</div>
                            <div class="label">{FILES[i].name}</div>
                        </div>
                    }
                })
                .collect_view()}
        </div>
    }
}

#[component]
fn Taskbar() -> impl IntoView {
    let desk = expect_context::<Desk>();
    let clock = RwSignal::new(now());
    set_interval(move || clock.set(now()), Duration::from_secs(10));

    view! {
        <div class="taskbar">
            <div class="start">"whee"</div>
            <div class="open-windows">
                <For
                    each=move || desk.wins.get()
                    key=|w| w.file
                    children=move |w| {
                        view! {
                            <button class="taskbar-button" on:click=move |_| desk.focus(w.file)>
                                {FILES[w.file].name}
                            </button>
                        }
                    }
                />
            </div>
            <div class="clock">{move || clock.get()}</div>
        </div>
    }
}

fn now() -> String {
    let date = js_sys::Date::new_0();
    let (h, m) = (date.get_hours(), date.get_minutes());
    let suffix = if h < 12 { "AM" } else { "PM" };
    format!("{}:{m:02} {suffix}", (h + 11) % 12 + 1)
}
