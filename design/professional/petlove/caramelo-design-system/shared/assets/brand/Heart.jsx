// figma node: 4:7588 Heart (2 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "solid=" + __venc(p.solid);

export function Heart(_p = {}) {
  const props = { ..._p, solid: _p.solid ?? true };
  const __body0 = () => (
    <div className={props.className} style={{
      width: "calc(var(--icon-xl) * 1px)",
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "var(--patterns-foreground-base-brand)",
      ...props.style,
    }}>
      <svg width={20} height={17.857} viewBox="0 0 20 17.857" fill="none" style={{
        position: "absolute",
        left: 2,
        top: 3.071,
        width: 20,
        height: 17.857,
      }}>
        <path d={"M 20 5.93 C 19.965 3.624 18.633 1.362 16.599 0.433 C 15.566 -0.038 14.371 -0.155 13.123 0.233 C 12.073 0.56 11.018 1.233 10 2.297 C 8.982 1.233 7.927 0.56 6.877 0.233 C 5.629 -0.155 4.434 -0.038 3.401 0.434 C 1.367 1.362 0.035 3.624 0 5.931 L 0 5.941 C 0 9.301 2.039 12.276 4.195 14.362 C 5.283 15.416 6.432 16.273 7.434 16.871 C 7.934 17.17 8.408 17.409 8.826 17.577 C 9.227 17.737 9.64 17.857 10 17.857 C 10.36 17.857 10.773 17.737 11.174 17.577 C 11.592 17.409 12.066 17.17 12.566 16.871 C 13.568 16.273 14.716 15.416 15.805 14.362 C 17.961 12.276 20 9.301 20 5.941 L 20 5.93 Z"} fill="currentColor" fillRule="evenodd" />
      </svg>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: "calc(var(--icon-xl) * 1px)",
      height: 24,
      overflow: "hidden",
      position: "relative",
      color: "var(--patterns-foreground-base-brand)",
      ...props.style,
    }}>
      <svg width={20} height={17.868} viewBox="0 0 20 17.868" fill="none" style={{
        position: "absolute",
        left: 2,
        top: 3.066,
        width: 20,
        height: 17.868,
      }}>
        <path d={"M 3.415 0.436 C 4.453 -0.038 5.655 -0.156 6.909 0.234 C 7.951 0.558 8.994 1.222 10 2.263 C 11.006 1.222 12.049 0.558 13.091 0.234 C 14.345 -0.156 15.548 -0.038 16.586 0.436 C 18.63 1.37 19.965 3.639 20 5.951 L 20 5.962 C 20 9.325 17.961 12.298 15.812 14.377 C 14.726 15.427 13.58 16.282 12.58 16.879 C 12.08 17.177 11.607 17.417 11.187 17.585 C 10.787 17.745 10.368 17.868 10 17.868 C 9.632 17.868 9.213 17.745 8.813 17.585 C 8.394 17.417 7.92 17.177 7.421 16.879 C 6.421 16.282 5.275 15.427 4.189 14.377 C 2.04 12.298 0 9.325 0 5.962 L 0.001 5.951 C 0.036 3.639 1.371 1.37 3.415 0.436 Z M 15.952 1.824 C 15.247 1.502 14.43 1.416 13.544 1.691 C 12.649 1.97 11.634 2.634 10.587 3.893 C 10.442 4.067 10.227 4.168 10 4.168 C 9.773 4.168 9.558 4.067 9.413 3.893 C 8.366 2.634 7.351 1.97 6.456 1.691 C 5.57 1.416 4.754 1.502 4.049 1.824 C 2.609 2.481 1.559 4.168 1.527 5.962 L 1.531 6.22 C 1.633 8.88 3.286 11.379 5.251 13.28 C 6.253 14.25 7.306 15.033 8.204 15.569 C 8.652 15.837 9.052 16.038 9.379 16.169 C 9.725 16.307 9.926 16.341 10 16.341 C 10.074 16.341 10.275 16.307 10.621 16.169 C 10.948 16.038 11.348 15.837 11.797 15.569 C 12.695 15.033 13.748 14.25 14.75 13.28 C 16.775 11.321 18.469 8.725 18.474 5.974 C 18.447 4.176 17.395 2.483 15.952 1.824 Z"} fill="currentColor" fillRule="evenodd" />
      </svg>
    </div>
  );
  const __impls = {
    // figma: Solid=True
    "solid=true": __body0,
    // figma: Solid=False
    "solid=false": __body1,
  };
  return (__impls[__vkey(props)] ?? __body0)();
}
export default Heart;
