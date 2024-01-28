import { useSetAtom } from "jotai";
import { setHoveringOverAtom, setSelectedAtom } from "@/store";
import { FC, PropsWithChildren } from "react";

export const Selectable: FC<PropsWithChildren & { entityId: string }> = ({
  children,
  entityId,
}) => {
  const setHoveringOver = useSetAtom(setHoveringOverAtom);
  const setSelected = useSetAtom(setSelectedAtom);
  return (
    <div
      className="contents"
      onClick={(evt) => {
        evt.stopPropagation();
        setSelected(entityId);
      }}
      onMouseOver={(evt) => {
        evt.stopPropagation();
        setHoveringOver(entityId);
      }}
      onMouseLeave={(evt) => {
        evt.stopPropagation();
        setHoveringOver();
      }}
    >
      {children}
    </div>
  );
};
