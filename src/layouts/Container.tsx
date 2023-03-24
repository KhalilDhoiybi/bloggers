import type { ReactNode, FC, HTMLAttributes } from "react";

interface ConainerProps {
  children: ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

const Container: FC<ConainerProps> = ({ children, className }) => {
  return (
    <div className={`mx-auto max-w-5xl ${className || ""}`}>{children}</div>
  );
};

export default Container;
