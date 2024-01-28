import { FC } from "react";
import { useSetAtom } from "jotai";
import { Disclosure } from "@headlessui/react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { EEntity, addEntityAtom, addTextEntityAtom } from "@/store";

const Section: FC<{
  title: string;
  options: string[];
  onSelect: (option: string) => void;
}> = ({ title, options, onSelect }) => (
  <Disclosure>
    {({ open }) => (
      <div className="px-3 py-1 border border-gray-200 rounded-md">
        <Disclosure.Button className="w-full">
          <div className="w-full h-8 flex items-center justify-between">
            <div className="text-sm font-medium">{title}</div>
            {!open ? <FaAngleRight /> : <FaAngleDown />}
          </div>
        </Disclosure.Button>
        <Disclosure.Panel className="grid grid-cols-2 gap-3 my-3">
          {options.map((option) => (
            <div
              className="aspect-video border border-gray-200 active:bg-gray-200 select-none rounded-md flex items-center justify-center text-sm cursor-pointer"
              onClick={() => onSelect(option)}
            >
              {option}
            </div>
          ))}
        </Disclosure.Panel>
      </div>
    )}
  </Disclosure>
);

export const Elements: FC = () => {
  const addEntity = useSetAtom(addEntityAtom);
  const addTextEntity = useSetAtom(addTextEntityAtom);
  return (
    <>
      <div className="w-full h-8 flex items-center justify-between mb-3">
        <div className="text-sm font-semibold uppercase">Elements</div>
      </div>
      <div className="flex flex-col gap-3">
        <Section
          title="Typography"
          options={["Paragraph", "Heading"]}
          onSelect={(option) => {
            if (option === "Paragraph")
              addTextEntity({
                text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit, cupiditate.",
              });
            else if (option === "Heading")
              addTextEntity({ text: "Heading", textType: "heading" });
          }}
        />

        <Section
          title="Blocks"
          options={["Section"]}
          onSelect={() => {
            addEntity(EEntity.BLOCK);
          }}
        />
      </div>
    </>
  );
};
