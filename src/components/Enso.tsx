type Props = {
  className?: string;
  animated?: boolean;
};

/**
 * An ensō — the single ink-brushed circle, left open where the brush lifts.
 * Two slightly offset strokes fake the uneven edge of a loaded brush.
 * Purely decorative; hidden from assistive technology.
 */
export default function Enso({ className, animated = false }: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`enso ${animated ? "enso--animated" : ""} ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M 102 22
           C 54 28, 16 70, 21 118
           C 26 163, 68 191, 113 186
           C 158 181, 187 144, 182 101
           C 178 70, 160 50, 144 42"
        strokeWidth="11"
        opacity="0.92"
      />
      <path
        d="M 100 28
           C 58 35, 24 74, 29 117
           C 34 157, 71 184, 111 180
           C 152 176, 179 141, 175 103
           C 172 76, 157 57, 143 49"
        strokeWidth="4.5"
        opacity="0.32"
      />
      <path
        d="M 104 17
           C 76 16, 44 34, 28 66"
        strokeWidth="2.5"
        opacity="0.25"
      />
    </svg>
  );
}
