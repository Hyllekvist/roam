import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  full?: boolean;
};

export function Button({ variant = "primary", full, className, ...props }: Props) {
  const cn = [styles.btn, variant === "ghost" ? styles.ghost : styles.primary, full ? styles.full : "", className]
    .filter(Boolean)
    .join(" ");
  return <button {...props} className={cn} />;
}
