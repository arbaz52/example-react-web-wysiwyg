import { FC } from "react";
import { tv } from "tailwind-variants";
import { EEntity, IEntity } from "@/store";

const text = tv({
  base: "inline-block",
  variants: {
    type: {
      span: "w-fit",
      paragraph: "w-full",
      heading: "w-full text-2xl",
    },
  },
});

export const Text: FC<IEntity> = (entity) => {
  if (entity._type !== EEntity.TEXT) return <></>;

  const { text: children, textType, id } = entity;
  return (
    <div data-id={id} className={text({ type: textType })}>
      {children}
    </div>
  );
};
