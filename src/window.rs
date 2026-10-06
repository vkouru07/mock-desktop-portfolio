use crate::app::{Desk, Win};
use crate::data::{FILES, Kind};
use leptos::ev::PointerEvent;
use leptos::prelude::*;
use web_sys::wasm_bindgen::JsCast;

const WINDOW_SIZE: (u32, u32) = (400, 300);
const PDF_WINDOW_SIZE: (u32, u32) = (560, 640);
/// how much of a window must stay on screen while dragging.
const MIN_VISIBLE: f64 = 60.0;
const TASKBAR_HEIGHT: f64 = 40.0;

#[component]
pub fn Window(win: Win) -> impl IntoView {
    let desk = expect_context::<Desk>();
    let file = &FILES[win.file];
    // pointer offset from the window's top-left corner while dragging
    let drag = StoredValue::new(None::<(f64, f64)>);

    let (width, height) = match file.kind {
        Kind::Pdf(_) => PDF_WINDOW_SIZE,
        _ => WINDOW_SIZE,
    };

    let body = match file.kind {
        Kind::Txt(text) | Kind::Alert(text) => view! { <div class="text" inner_html=text></div> }.into_any(),
        Kind::Pdf(src) => view! { <iframe class="pdf" src=src title=file.name></iframe> }.into_any(),
        Kind::Folder(children) => view! {
            <ul class="folder">
                {children
                    .iter()
                    .map(|&child| {
                        view! {
                            <li on:click=move |_| desk.open(child)>
                                {FILES[child].icon()} " " {FILES[child].name}
                            </li>
                        }
                    })
                    .collect_view()}
            </ul>
        }
        .into_any(),
    };

    let start_drag = move |ev: PointerEvent| {
        if let Some(header) = ev.current_target().and_then(|t| t.dyn_into::<web_sys::Element>().ok()) {
            let _ = header.set_pointer_capture(ev.pointer_id());
        }
        let (x, y) = (ev.client_x() as f64, ev.client_y() as f64);
        drag.set_value(Some((x - win.x.get_untracked(), y - win.y.get_untracked())));
    };
    let move_drag = move |ev: PointerEvent| {
        let Some((dx, dy)) = drag.get_value() else { return };
        let vw = window().inner_width().ok().and_then(|v| v.as_f64()).unwrap_or(f64::MAX);
        let vh = window().inner_height().ok().and_then(|v| v.as_f64()).unwrap_or(f64::MAX);
        win.x.set((ev.client_x() as f64 - dx).clamp(0.0, (vw - MIN_VISIBLE).max(0.0)));
        win.y.set((ev.client_y() as f64 - dy).clamp(0.0, (vh - TASKBAR_HEIGHT - MIN_VISIBLE).max(0.0)));
    };
    let end_drag = move |_: PointerEvent| drag.set_value(None);

    view! {
        <div
            class="window"
            style:z-index=move || win.z.get().to_string()
            style:left=move || format!("{}px", win.x.get())
            style:top=move || format!("{}px", win.y.get())
            style:width=format!("{width}px")
            style:height=format!("{height}px")
            on:pointerdown=move |_| desk.focus(win.file)
        >
            <div
                class="window-header"
                on:pointerdown=start_drag
                on:pointermove=move_drag
                on:pointerup=end_drag
                on:pointercancel=end_drag
            >
                <span>{file.name}</span>
                <button
                    class="x-button"
                    on:pointerdown=|ev| ev.stop_propagation()
                    on:click=move |_| desk.close(win.file)
                >
                    "x"
                </button>
            </div>
            <div class="window-content">{body}</div>
        </div>
    }
}
