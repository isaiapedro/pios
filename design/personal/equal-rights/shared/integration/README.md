# Equal Rights integration

Import `equal-rights.css` once at the application entry point. Apply `er-theme` to the public application root and add `er-theme--light` for light mode. The classes are deliberately prefixed `er-` to avoid collisions with application and framework styles.

Use the local `--er-*` tokens only inside Equal Rights surfaces. The source app can migrate page by page: import this package, replace repeated raw values with tokens, then adopt the prefixed patterns without changing routing, data, or CMS behavior.
