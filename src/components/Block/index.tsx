import { FC } from "react";
import { EEntity, IEntity } from "@/store";
import { Entity } from "@/components/Entity";

export const Block: FC<IEntity> = (entity) => {
  if (entity._type !== EEntity.BLOCK) return <></>;

  const { childrenIds } = entity;

  return (
    <div data-id={entity.id} className="p-2 bg-gray-100">
      {childrenIds.map((childId) => (
        <Entity entityId={childId} key={childId} />
      ))}
    </div>
  );
};
