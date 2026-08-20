type Props = {
  className?: string;
};

/**
 * A vermilion hankō seal bearing 一時 (hitotoki — "a moment").
 * Decorative; hidden from assistive technology.
 */
export default function Seal({ className }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="7"
        fill="var(--vermilion)"
      />
      <text
        x="32"
        y="27"
        textAnchor="middle"
        fontSize="22"
        fontFamily="serif"
        fill="var(--paper)"
      >
        一
      </text>
      <text
        x="32"
        y="54"
        textAnchor="middle"
        fontSize="22"
        fontFamily="serif"
        fill="var(--paper)"
      >
        時
      </text>
    </svg>
  );
}
