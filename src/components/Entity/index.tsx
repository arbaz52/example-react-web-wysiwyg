import { FC, memo } from "react";
import { useAtomValue } from "jotai";
import { Text } from "@/components/Text";
import { Block } from "@/components/Block";
import { EEntity, entityFamily } from "@/store";
import { Selectable } from "@/components/Selectable";

export const Entity: FC<{ entityId: string }> = memo(({ entityId }) => {
  const entity = useAtomValue(entityFamily(entityId));

  if (!entity) return <></>;

  const { _type } = entity;

  return (
    <Selectable entityId={entityId}>
      {_type === EEntity.TEXT && <Text {...entity} />}
      {_type === EEntity.BLOCK && <Block {...entity} />}
    </Selectable>
  );
});
