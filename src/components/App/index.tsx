import { useAtomValue } from "jotai";
import { Entity } from "@/components/Entity";
import { Footer } from "@/components/Footer";
import { rootChildrenIdsAtom } from "@/store";
import { FC, PropsWithChildren } from "react";
import { Overlay } from "@/components/Overlay";
import { Elements } from "@/components/Elements";
import { FaBarsStaggered, FaPlus } from "react-icons/fa6";

const IconButton: FC<PropsWithChildren> = ({ children }) => (
  <div className="w-8 h-8 rounded-md bg-gray-200 active:bg-gray-300 cursor-pointer flex items-center justify-center">
    {children}
  </div>
);

const App: FC = () => {
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
      <section className="flex-1 flex flex-col bg-gray-100 items-center">
        <div className="w-full flex-1 max-w-3xl bg-white">
          {childrenIds.map((entityId) => (
            <Entity key={entityId} entityId={entityId} />
          ))}
        </div>
        <Footer />
      </section>
      <Overlay />
    </div>
  );
};

export default App;
