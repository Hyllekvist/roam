import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export function Input({ label, hint, className, ...props }: Props) {
  return (
    <label className={styles.wrap}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <input className={[styles.input, className].filter(Boolean).join(" ")} {...props} />
      {hint ? <span className={styles.hint}>{hint}</span> : null}
    </label>
  );
}
