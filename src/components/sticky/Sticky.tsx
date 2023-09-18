import { useCallback, useEffect, useRef, useState, FC, ReactNode } from "react";
import clsx from "clsx";
import { StyledBox } from "./styles";

// ============================================================
interface Props {
  fixedOn: number;
  children: ReactNode;
  scrollDistance?: number;
  onSticky?: (isFixed: boolean) => void;
}

// ============================================================

const Sticky: FC<Props> = ({ fixedOn, children, onSticky, scrollDistance = 0 }) => {
  const [fixed, setFixed] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const scrollListener = useCallback(() => {
    if (!window) return;

    const isFixed = window.scrollY >= fixedOn + scrollDistance;
    setFixed(isFixed);
  }, [fixedOn, scrollDistance]);

  useEffect(() => {
    if (!window) return;

    window.addEventListener("scroll", scrollListener);
    window.addEventListener("resize", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("resize", scrollListener);
    };
  }, [scrollListener]);

  useEffect(() => {
    if (onSticky) onSticky(fixed);
  }, [fixed, onSticky]);

  return (
    <StyledBox fixedOn={fixedOn} fixed={fixed}>
      <div className={clsx({ hold: !fixed, fixed: fixed })} ref={elementRef}>
        {children}
      </div>
    </StyledBox>
  );
};

export default Sticky;
