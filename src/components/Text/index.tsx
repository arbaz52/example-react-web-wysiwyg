import { useSetAtom } from "jotai";
import { tv } from "tailwind-variants";
import { FC, useRef, useState } from "react";
import { EEntity, IEntity, setEntityAtom } from "@/store";

const text = tv({
  base: "inline-block whitespace-pre-wrap",
  variants: {
    type: {
      span: "w-fit",
      paragraph: "w-full",
      heading: "w-full text-2xl",
    },
  },
});

export const Text: FC<IEntity> = (entity) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const setEntity = useSetAtom(setEntityAtom);
  const [editable, setEditable] = useState(false);

  if (entity._type !== EEntity.TEXT) return <></>;

  const { text: children, textType, id } = entity;

  const stopEditing = () => {
    const div = ref.current;
    if (!div) return;

    setEntity(id, {
      _type: EEntity.TEXT,
      text: div.textContent || "",
    });

    setEditable(false);
  };

  return (
    <div
      ref={ref}
      data-id={id}
      className={text({ type: textType })}
      onDoubleClick={(evt) => {
        setEditable(true);
        setTimeout(() => {
          (evt.target as HTMLDivElement).focus();
        }, 0);
      }}
      onKeyDown={(evt) => {
        evt.key === "Escape" && stopEditing();
      }}
      onBlur={() => stopEditing()}
      contentEditable={editable}
      dangerouslySetInnerHTML={{
        __html: children,
      }}
    ></div>
  );
};
