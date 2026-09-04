// figma node: 608:17968 heart_solid
export function HeartSolid(_p = {}) {
  const props = _p;
  return (
    <div className={props.className} style={{
      width: "calc(var(--icon-lg) * 1px)",
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
}
export default HeartSolid;
