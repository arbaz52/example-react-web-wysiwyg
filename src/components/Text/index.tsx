import { FC } from "react";
import { EEntity, IEntity } from "@/store";

export const Text: FC<IEntity> = (entity) => {
  if (entity._type !== EEntity.TEXT) return <></>;

  return (
    <div data-id={entity.id} className="w-fit">
      {entity.text}
    </div>
  );
};
