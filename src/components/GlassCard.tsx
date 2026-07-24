import type { ElementType, HTMLAttributes, ReactNode } from "react";

type GlassCardProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children: ReactNode;
};

export function GlassCard({
  as: Component = "article",
  className = "",
  children,
  ...props
}: GlassCardProps) {
  return (
    <Component className={`glass-card ${className}`} {...props}>
      {children}
    </Component>
  );
}

