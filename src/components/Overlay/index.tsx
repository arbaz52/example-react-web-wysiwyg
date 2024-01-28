import {
  setSelectedAtom,
  selectedEntityIdAtom,
  hoveringOverEntityIdAtom,
} from "@/store";
import { FC, useEffect, useRef, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";

const useRect = (
  dataId: string | null,
  onChange: (rect: DOMRect | null) => void,
) => {
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    if (!dataId) return;

    const el = document.querySelector(`[data-id="${dataId}"]`);
    if (!el) return;

    const resize = () => {
      onChangeRef.current(el.getBoundingClientRect() || null);
    };

    resize();

    const mutationObserver = new MutationObserver(resize);
    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(el);
    resizeObserver.observe(document.body);
    mutationObserver.observe(document.body, { subtree: true, childList: true });

    return () => {
      onChangeRef.current(null);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [dataId]);
};

export const Overlay: FC = () => {
  const setSelected = useSetAtom(setSelectedAtom);
  const [selectedRect, setSelectedRect] = useState<null | DOMRect>(null);
  const [hoveringRect, setHoveringRect] = useState<null | DOMRect>(null);
  const selectedEntityId = useAtomValue(selectedEntityIdAtom);
  const hoveringOverEntityId = useAtomValue(hoveringOverEntityIdAtom);

  useRect(selectedEntityId || null, setSelectedRect);
  useRect(hoveringOverEntityId || null, setHoveringRect);

  useEffect(() => {
    const listener = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") setSelected();
    };
    document.body.addEventListener("keydown", listener);
    return () => {
      document.body.removeEventListener("keydown", listener);
    };
  }, [setSelected]);

  return (
    <>
      {selectedRect ? (
        <div
          className="border-2 border-blue-500 pointer-events-none absolute"
          style={{
            top: selectedRect.y,
            left: selectedRect.x,
            width: selectedRect.width,
            height: selectedRect.height,
          }}
        >
          <div className="bg-blue-500 text-xs px-1 absolute top-0 left-0 text-white">
            {selectedEntityId}
          </div>
        </div>
      ) : (
        <></>
      )}
      {hoveringRect ? (
        <div
          className="opacity-25 border-2 border-blue-500 pointer-events-none absolute"
          style={{
            top: hoveringRect.y,
            left: hoveringRect.x,
            width: hoveringRect.width,
            height: hoveringRect.height,
          }}
        >
          <div className="bg-blue-500 text-xs px-1 absolute top-0 left-0 text-white">
            {selectedEntityId}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
