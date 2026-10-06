mod app;
mod data;
mod icons;
mod window;

fn main() {
    leptos::mount::mount_to_body(app::App);
}
