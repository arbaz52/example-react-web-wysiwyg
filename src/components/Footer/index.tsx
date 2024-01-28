import { useAtomValue } from "jotai";
import { FC, PropsWithChildren } from "react";
import { hoveringOverEntityIdAtom, selectedEntityIdAtom } from "@/store";

const Id: FC<PropsWithChildren> = ({ children }) => (
  <code className="bg-gray-200">{children}</code>
);

export const Footer: FC = () => {
  const hoveringOverEntityId = useAtomValue(hoveringOverEntityIdAtom);
  const selectedEntityId = useAtomValue(selectedEntityIdAtom);

  return (
    <footer className="h-9 bg-gray-50 text-gray-500 w-full px-3 text-xs flex gap-3 items-center">
      {selectedEntityId ? (
        <span>
          Selected: <Id>{selectedEntityId}</Id>
        </span>
      ) : null}
      {hoveringOverEntityId ? (
        <span>
          Hovering over: <Id>{hoveringOverEntityId}</Id>
        </span>
      ) : null}
    </footer>
  );
};
