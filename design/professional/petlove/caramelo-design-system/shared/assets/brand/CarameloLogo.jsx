import { CoreSolid } from './CoreSolid.jsx';

// figma node: 4:41 .Caramelo logo (4 variants)
const __venc = (v) => String(v).replace(/[%|=]/g, encodeURIComponent);
const __vkey = (p) => "blue=" + __venc(p.blue);

export function CarameloLogo(_p = {}) {
  const props = { ..._p, blue: _p.blue ?? "default" };
  const __body0 = () => (
    <div className={props.className} style={{
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "var(--patterns-background-brand-strong)",
      boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      justifyContent: "space-between",
      alignItems: "center",
      boxSizing: "border-box",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        width: 24,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={15.714} height={15} viewBox="0 0 15.714 15" fill="none" style={{
          position: "absolute",
          left: 2.143,
          top: 2.5,
          width: 15.714,
          height: 15,
          color: "rgb(234,83,74)",
        }}>
          <path d={"M 4.005 0 C 5.882 0.029 7.476 1.27 8.765 2.885 C 9.03 3.22 9.618 3.359 9.887 3.029 C 12.398 0 15.717 0.7 15.712 3.882 C 15.903 10.336 6.044 19.756 3.642 12.195 C 2.583 8.87 0.112 6.618 0.004 4.14 C -0.099 1.898 1.715 -0.033 4.005 0 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
    </div>
  );
  const __body1 = () => (
    <div className={props.className} style={{
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "var(--patterns-background-brand-primary)",
      boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      justifyContent: "space-between",
      alignItems: "center",
      boxSizing: "border-box",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "rgb(234,83,74)",
        }}>{props.icon1 ?? <CoreSolid />}</div>
    </div>
  );
  const __body2 = () => (
    <div className={props.className} style={{
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "var(--patterns-background-surface-primary)",
      boxShadow: "inset 0 0 0 0.500px var(--patterns-border-base-secondary), 0 0 0 0.500px var(--patterns-border-base-secondary), 0px 1px 2px 0px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "row",
      padding: "12px 12px 12px 12px",
      justifyContent: "space-between",
      alignItems: "center",
      boxSizing: "border-box",
      position: "relative",
      ...props.style,
    }}>
      <div style={{
          position: "relative",
          width: 24,
          flexShrink: 0,
          alignSelf: "stretch",
          height: "auto",
          color: "rgb(234,83,74)",
        }}>{props.icon1 ?? <CoreSolid />}</div>
    </div>
  );
  const __body3 = () => (
    <div className={props.className} style={{
      width: "fit-content",
      display: "flex",
      flexDirection: "column",
      gap: 7.999983787536621,
      alignItems: "flex-start",
      position: "relative",
      color: "var(--patterns-foreground-base-brand)",
      ...props.style,
    }}>
      <div style={{
        position: "relative",
        height: 14.687,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
      }}>
        <svg width={10.443} height={10.871} viewBox="0 0 10.443 10.871" fill="none" style={{
          position: "absolute",
          left: 75.785,
          top: 3.797,
          width: 10.443,
          height: 10.871,
        }}>
          <path d={"M 5.212 10.871 C 1.638 10.871 0 8.6 0 5.491 C 0 2.457 1.731 -0.019 5.305 0 C 8.786 0.037 10.443 2.401 10.443 5.491 C 10.443 8.6 8.712 10.871 5.212 10.871 Z M 5.826 7.93 C 6.98 7.707 7.353 6.739 6.98 5.212 C 6.534 3.369 5.882 2.643 4.728 2.885 C 3.63 3.09 3.146 4.226 3.555 5.938 C 3.946 7.465 4.691 8.172 5.826 7.93 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
        <svg width={6.143} height={14.426} viewBox="0 0 6.143 14.426" fill="none" style={{
          position: "absolute",
          left: 69.429,
          top: 0,
          width: 6.143,
          height: 14.426,
        }}>
          <path d={"M 3.351 14.426 C 1.247 14.426 0.503 14.315 0.503 12.993 C 0.503 12.49 0.558 12.099 1.135 11.653 C 1.564 11.336 1.638 10.964 1.694 10.015 C 1.731 9.4 1.731 8.283 1.731 7.39 L 1.713 4.43 C 1.694 3.872 1.582 3.779 1.08 3.779 C 0.465 3.779 0 3.723 0 2.997 C 0 2.345 0.354 1.731 0.819 1.173 C 1.359 0.484 2.178 0 3.127 0 C 4.3 0 5.305 0.67 5.305 2.048 C 5.305 2.55 5.268 3.406 5.156 4.896 C 5.082 6.366 4.877 9.047 4.989 10.443 C 5.026 11.038 5.082 11.262 5.51 11.578 C 5.938 11.876 6.143 12.211 6.143 12.844 C 6.143 13.905 5.677 14.426 3.351 14.426 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
        <svg width={9.884} height={10.908} viewBox="0 0 9.884 10.908" fill="none" style={{
          position: "absolute",
          left: 59.642,
          top: 3.779,
          width: 9.884,
          height: 10.908,
        }}>
          <path d={"M 5.212 10.908 C 2.103 10.908 0 8.712 0 5.696 C 0 2.774 1.713 0 5.212 0 C 7.986 0 9.884 1.638 9.884 4.616 C 9.884 6.012 9.568 6.217 7.911 6.217 L 3.686 6.217 C 3.444 6.217 3.313 6.329 3.313 6.571 C 3.332 7.316 4.523 7.893 6.068 7.893 C 7.26 7.893 7.874 7.669 8.339 7.427 C 8.619 7.297 8.823 7.167 9.028 7.167 C 9.475 7.167 9.493 7.725 9.382 8.302 C 9.047 9.922 7.371 10.908 5.212 10.908 Z M 4.002 4.467 C 6.143 4.467 6.441 4.337 6.441 3.835 C 6.441 3.071 5.789 2.364 4.933 2.364 C 3.89 2.364 3.258 3.127 3.313 4.17 C 3.332 4.43 3.444 4.467 4.002 4.467 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
        <svg width={17.907} height={10.537} viewBox="0 0 17.907 10.537" fill="none" style={{
          position: "absolute",
          left: 41.587,
          top: 3.89,
          width: 17.907,
          height: 10.537,
        }}>
          <path d={"M 3.332 10.536 C 1.135 10.536 0.391 10.424 0.391 9.103 C 0.391 8.526 0.54 8.209 1.061 7.818 C 1.694 7.316 1.787 7.037 1.787 6.162 L 1.787 3.965 C 1.787 3.351 1.601 3.295 1.154 3.295 C 0.41 3.295 0 3.165 0 2.364 C 0 1.75 0.41 1.173 1.005 0.726 C 1.545 0.298 2.215 0.037 2.885 0.037 C 3.928 0.037 4.393 0.447 4.393 1.34 C 4.393 1.731 4.412 1.88 4.616 1.88 C 4.877 1.88 4.84 1.62 5.305 1.005 C 5.659 0.54 6.478 0 7.781 0 C 8.972 0 9.642 0.372 9.996 0.819 C 10.461 1.378 10.48 1.955 10.722 1.936 C 11.001 1.918 11.001 1.508 11.615 0.875 C 12.248 0.242 12.807 0.019 13.812 0 C 15.655 -0.018 16.939 1.21 16.902 3.072 C 16.865 4.524 16.753 5.38 16.753 6.534 C 16.753 7.334 16.865 7.669 17.274 7.967 C 17.777 8.34 17.907 8.824 17.907 9.27 C 17.907 10.61 17.2 10.536 14.966 10.536 C 12.881 10.536 12.472 10.182 12.472 9.14 C 12.472 8.488 12.695 8.191 13.03 7.93 C 13.421 7.576 13.551 7.185 13.551 6.534 L 13.551 4.877 C 13.551 3.909 13.179 3.276 12.36 3.276 C 11.299 3.276 11.001 3.872 10.927 5.268 C 10.908 5.808 10.908 6.404 10.908 6.739 C 10.908 7.446 10.964 7.688 11.262 8.004 C 11.56 8.377 11.709 8.768 11.709 9.27 C 11.709 10.61 11.02 10.536 9.103 10.536 C 7.018 10.536 6.59 10.182 6.59 9.14 C 6.59 8.488 6.85 8.191 7.167 7.911 C 7.595 7.52 7.669 7.167 7.669 6.18 L 7.669 4.691 C 7.669 3.798 7.241 3.239 6.515 3.239 C 5.287 3.239 4.97 4.263 4.97 5.603 L 4.97 6.757 C 4.989 7.409 5.007 7.614 5.305 7.911 C 5.547 8.228 5.826 8.526 5.826 9.14 C 5.826 10.182 5.398 10.536 3.332 10.536 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
        <svg width={10.610} height={10.927} viewBox="0 0 10.610 10.927" fill="none" style={{
          position: "absolute",
          left: 30.955,
          top: 3.648,
          width: 10.61,
          height: 10.927,
        }}>
          <path d={"M 2.922 10.927 C 0.8 10.927 0 9.605 0 7.818 C 0 6.087 1.303 4.784 3.5 4.784 C 4.635 4.784 5.045 4.989 5.417 4.989 C 5.733 4.989 5.864 4.951 5.826 3.984 C 5.808 2.941 5.324 2.513 4.542 2.513 C 3.76 2.513 3.406 2.718 3.258 3.313 C 3.071 4.058 2.736 4.337 2.01 4.337 C 1.024 4.337 0.242 3.965 0.242 2.96 C 0.242 2.141 0.652 1.545 1.415 1.024 C 2.401 0.354 3.648 0 5.342 0 C 7.893 0 9.233 1.21 9.233 3.332 C 9.233 4.691 9.028 6.738 9.028 7.241 C 9.028 7.613 9.214 7.762 9.456 7.762 C 9.68 7.762 9.828 7.669 10.052 7.669 C 10.48 7.669 10.61 7.948 10.61 8.544 C 10.61 9.493 9.922 10.908 8.358 10.908 C 7.632 10.908 6.999 10.703 6.552 10.182 C 6.143 9.717 6.124 9.363 5.864 9.363 C 5.566 9.363 5.473 9.717 5.156 10.108 C 4.747 10.592 4.3 10.927 2.922 10.927 Z M 4.561 8.339 C 5.342 8.339 5.864 7.706 5.864 6.85 C 5.864 6.199 5.733 6.236 5.026 6.236 C 4.281 6.236 3.723 6.701 3.723 7.427 C 3.723 8.097 4.021 8.339 4.561 8.339 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
        <svg width={9.512} height={10.648} viewBox="0 0 9.512 10.648" fill="none" style={{
          position: "absolute",
          left: 21.155,
          top: 3.779,
          width: 9.512,
          height: 10.648,
        }}>
          <path d={"M 3.946 10.648 C 1.266 10.648 0.54 10.722 0.54 9.456 C 0.54 8.954 0.652 8.451 1.21 8.116 C 1.638 7.874 1.843 7.651 1.899 6.962 C 1.973 6.161 1.955 4.765 1.955 4.058 C 1.955 3.462 1.694 3.406 1.173 3.406 C 0.521 3.406 0 3.332 0 2.643 C 0 1.955 0.428 1.322 1.005 0.856 C 1.564 0.41 2.252 0.149 2.885 0.149 C 3.779 0.149 4.3 0.596 4.3 1.284 C 4.3 1.731 4.226 2.029 4.523 2.029 C 4.747 2.029 4.84 1.787 5.212 1.154 C 5.584 0.503 6.143 0 7.204 0 C 8.786 0 9.531 1.117 9.512 2.848 C 9.493 4.188 8.972 4.951 7.688 4.951 C 7.092 4.951 6.776 4.765 6.552 4.319 C 6.348 3.853 6.217 3.444 5.771 3.444 C 5.212 3.444 5.1 3.965 5.082 4.505 C 5.045 5.342 5.082 5.957 5.156 6.794 C 5.193 7.334 5.249 7.576 5.957 7.874 C 6.776 8.228 7.111 8.432 7.111 9.326 C 7.111 10.368 6.59 10.648 3.946 10.648 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
        <svg width={10.610} height={10.927} viewBox="0 0 10.610 10.927" fill="none" style={{
          position: "absolute",
          left: 10.523,
          top: 3.648,
          width: 10.61,
          height: 10.927,
        }}>
          <path d={"M 2.922 10.927 C 0.8 10.927 0 9.605 0 7.818 C 0 6.087 1.303 4.784 3.5 4.784 C 4.635 4.784 5.045 4.989 5.417 4.989 C 5.733 4.989 5.864 4.951 5.826 3.984 C 5.808 2.941 5.324 2.513 4.542 2.513 C 3.76 2.513 3.406 2.718 3.258 3.313 C 3.071 4.058 2.736 4.337 2.01 4.337 C 1.024 4.337 0.242 3.965 0.242 2.96 C 0.242 2.141 0.652 1.545 1.415 1.024 C 2.401 0.354 3.648 0 5.342 0 C 7.893 0 9.233 1.21 9.233 3.332 C 9.233 4.691 9.028 6.738 9.028 7.241 C 9.028 7.613 9.214 7.762 9.456 7.762 C 9.68 7.762 9.828 7.669 10.052 7.669 C 10.48 7.669 10.61 7.948 10.61 8.544 C 10.61 9.493 9.922 10.908 8.358 10.908 C 7.632 10.908 6.999 10.703 6.552 10.182 C 6.143 9.717 6.124 9.363 5.864 9.363 C 5.566 9.363 5.473 9.717 5.156 10.108 C 4.747 10.592 4.3 10.927 2.922 10.927 Z M 4.561 8.339 C 5.342 8.339 5.864 7.706 5.864 6.85 C 5.864 6.199 5.733 6.236 5.026 6.236 C 4.281 6.236 3.723 6.701 3.723 7.427 C 3.723 8.097 4.021 8.339 4.561 8.339 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
        <svg width={10.108} height={10.815} viewBox="0 0 10.108 10.815" fill="none" style={{
          position: "absolute",
          left: 0,
          top: 3.835,
          width: 10.108,
          height: 10.815,
        }}>
          <path d={"M 5.119 10.815 C 1.955 10.815 0 8.693 0 5.435 C 0 2.513 1.806 0 4.803 0 C 5.696 0 6.143 0.168 6.59 0.521 C 6.794 0.707 6.925 0.819 7.167 0.819 C 7.334 0.819 7.39 0.652 7.502 0.428 C 7.669 0.149 7.818 0.074 8.172 0.056 C 8.991 0.019 9.047 0.596 9.624 1.955 C 10.406 3.816 10.294 4.561 8.898 4.896 C 7.911 5.119 7.26 4.393 6.85 3.835 C 6.273 3.053 5.938 2.774 5.1 2.774 C 4.002 2.774 3.5 3.611 3.518 4.654 C 3.537 6.254 4.319 7.781 6.217 7.781 C 7.148 7.781 8.209 7.316 8.73 6.962 C 8.916 6.832 9.028 6.794 9.177 6.794 C 9.493 6.794 9.642 6.999 9.624 7.353 C 9.438 9.345 7.706 10.815 5.119 10.815 Z"} fill="currentColor" fillRule="nonzero" />
        </svg>
      </div>
      <div style={{
          position: "absolute",
          left: 85,
          top: -2,
          width: 9,
          height: 9,
          color: "rgb(234,83,74)",
        }}>{props.icon1 ?? <CoreSolid style={{ transform: "scale(0.450, 0.450)", transformOrigin: "0 0" }} />}</div>
    </div>
  );
  const __impls = {
    // figma: Blue=Dark
    "blue=dark": __body0,
    // figma: Blue=Blue
    "blue=blue": __body1,
    // figma: Blue=White
    "blue=white": __body2,
    // figma: Blue=Default
    "blue=default": __body3,
  };
  return (__impls[__vkey(props)] ?? __body3)();
}
export default CarameloLogo;
