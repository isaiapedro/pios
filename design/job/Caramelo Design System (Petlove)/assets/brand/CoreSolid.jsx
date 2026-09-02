// figma node: 4:11 .core-solid
export function CoreSolid(_p = {}) {
  const props = _p;
  return (
    <div className={props.className} style={{
      width: 20,
      height: 20,
      overflow: "hidden",
      position: "relative",
      color: "var(--patterns-foreground-base-primary)",
      ...props.style,
    }}>
      <svg width={15.714} height={15} viewBox="0 0 15.714 15" fill="none" style={{
        position: "absolute",
        left: 2.143,
        top: 2.5,
        width: 15.714,
        height: 15,
      }}>
        <path d={"M 4.005 0 C 5.882 0.029 7.476 1.27 8.765 2.885 C 9.03 3.22 9.618 3.359 9.887 3.029 C 12.398 0 15.717 0.7 15.712 3.882 C 15.903 10.336 6.044 19.756 3.642 12.195 C 2.583 8.87 0.112 6.618 0.004 4.14 C -0.099 1.898 1.715 -0.033 4.005 0 Z"} fill="currentColor" fillRule="nonzero" />
      </svg>
    </div>
  );
}
export default CoreSolid;
