### simple mock desktop portfolio site

hii!!! this is a simple portfolio template, click on the 'deployments' tab to the right to view my example on github pages.

to use:
- add your info to ```data/info.txt``` (the format is described in ```grammar/portfolio.pest```)
- put a ```*``` in front of any file that should be opened when the site loads
- put PDFs and other assets in ```files/```
- optionally change the icons in ```src/icons.rs```

a typo in ```data/info.txt``` fails the build and points at the line.

#### to run local:
\$ `rustup target add wasm32-unknown-unknown` <br>
\$ `cargo install trunk` (or `brew install trunk`) <br>
\$ `trunk serve --open`

#### add to gh pages:
in the repo's settings, set Pages > Source to "GitHub Actions". every push to `main` deploys.

todo/issues:
- add icons, lnk,
- sit icon? can't remember what i meant by this :,)

Rust, Leptos, Trunk.
