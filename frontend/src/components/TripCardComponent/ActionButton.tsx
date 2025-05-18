import { ReactNode } from "react";

interface ActionButtonProps {
  onClick: () => void;
  color: "primary" | "edit" | "delete" | "archive" | "restore";
  children: ReactNode;
  title?: string;
}

export default function ActionButton({ onClick, color, children, title }: ActionButtonProps) {
  return (
    <button
      className={`action-btn action-btn-${color}`}
      onClick={onClick}
      title={title}
      type="button"
    >
      {children}
    </button>
  );
}