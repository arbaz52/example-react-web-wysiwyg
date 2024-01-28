import { Entity } from "@/components/Entity";
import { Footer } from "@/components/Footer";
import { FC, PropsWithChildren } from "react";
import { Overlay } from "@/components/Overlay";
import { Elements } from "@/components/Elements";
import { useAtomValue, useSetAtom } from "jotai";
import { FaBarsStaggered, FaPlus } from "react-icons/fa6";
import { rootChildrenIdsAtom, setSelectedAtom } from "@/store";

const IconButton: FC<PropsWithChildren> = ({ children }) => (
  <div className="w-8 h-8 rounded-md bg-gray-200 active:bg-gray-300 cursor-pointer flex items-center justify-center">
    {children}
  </div>
);

const App: FC = () => {
  const setSelected = useSetAtom(setSelectedAtom);
  const childrenIds = useAtomValue(rootChildrenIdsAtom);
  return (
    <div className="h-[100svh] w-[100svw] flex">
      <aside className="bg-gray-100 flex flex-col items-center gap-3 p-4">
        <IconButton>
          <FaPlus />
        </IconButton>
        <IconButton>
          <FaBarsStaggered />
        </IconButton>
      </aside>
      <aside className="w-[300px] bg-gray-50 p-4">
        <Elements />
      </aside>
      <section
        onClick={(evt) => {
          evt.stopPropagation();
          setSelected();
        }}
        className="flex-1 flex flex-col bg-gray-100 overflow-auto"
      >
        <div className="flex-1 flex flex-col overflow-auto w-full items-center">
          <div className="w-full flex-1 my-8 max-w-3xl bg-white">
            {childrenIds.map((entityId) => (
              <Entity key={entityId} entityId={entityId} />
            ))}
          </div>
        </div>
        <Footer />
      </section>
      <Overlay />
    </div>
  );
};

export default App;
