import { useSetAtom } from "jotai";
import { FC, PropsWithChildren } from "react";
import { setHoveringOverAtom, setSelectedAtom } from "@/store";

export const Selectable: FC<PropsWithChildren & { entityId: string }> = ({
  children,
  entityId,
}) => {
  const setSelected = useSetAtom(setSelectedAtom);
  const setHoveringOver = useSetAtom(setHoveringOverAtom);
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
