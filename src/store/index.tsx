import { atom } from "jotai";
import { produce } from "immer";
import { generateId } from "@/utils";
import { atomFamily, selectAtom } from "jotai/utils";

export enum EEntity {
  TEXT = "TEXT",
  BLOCK = "BLOCK",
}

type IBlock = {
  childrenIds: string[];
  _type: EEntity.BLOCK;
};

type IText = {
  text: string;
  _type: EEntity.TEXT;
};

export type IEntity = { id: string } & (IBlock | IText);

interface IStore {
  children: { [key: string]: IEntity };
  childrenIds: string[];
  selectedEntityId?: string;
  hoveringOverEntityId?: string;
}

const store: IStore = { children: {}, childrenIds: [] };

export const storeAtom = atom(store);

export const rootChildrenIdsAtom = selectAtom(
  storeAtom,
  (store) => store.childrenIds,
);

export const entityFamily = atomFamily((entityId: string) =>
  atom((get) => get(storeAtom).children[entityId]),
);

export const hoveringOverEntityIdAtom = selectAtom(
  storeAtom,
  (store) => store.hoveringOverEntityId,
);
export const selectedEntityIdAtom = selectAtom(
  storeAtom,
  (store) => store.selectedEntityId,
);

export const addEntityAtom = atom(null, (get, set, type: EEntity) => {
  const entity = ((type: EEntity): IEntity | null => {
    const id = generateId();
    switch (type) {
      case EEntity.TEXT:
        return { _type: EEntity.TEXT, text: "", id };

      case EEntity.BLOCK:
        return { _type: EEntity.BLOCK, childrenIds: [], id };

      default:
        return null;
    }
  })(type);
  if (!entity) return;

  const store = get(storeAtom);
  const update = produce(store, (draft) => {
    // add entity
    draft.children[entity.id] = entity;

    const selectedEntity = draft.selectedEntityId
      ? draft.children[draft.selectedEntityId]
      : null;

    //if selected element supports children, add to it
    if (selectedEntity && selectedEntity._type === EEntity.BLOCK)
      selectedEntity.childrenIds.push(entity.id);
    else draft.childrenIds.push(entity.id);

    draft.selectedEntityId = entity.id;
  });
  set(storeAtom, update);
  return entity;
});

export const addTextEntityAtom = atom(
  null,
  (get, set, options: Partial<IText>) => {
    const entityId = set(addEntityAtom, EEntity.TEXT)?.id;
    if (!entityId) return;

    const store = get(storeAtom);
    const update = produce(store, (draft) => {
      Object.assign(draft.children[entityId], options);
    });
    set(storeAtom, update);
  },
);

export const setHoveringOverAtom = atom(null, (get, set, entityId?: string) => {
  const store = get(storeAtom);
  const update = produce(store, (draft) => {
    draft.hoveringOverEntityId = entityId;
  });
  set(storeAtom, update);
});
export const setSelectedAtom = atom(null, (get, set, entityId?: string) => {
  const store = get(storeAtom);
  const update = produce(store, (draft) => {
    draft.selectedEntityId = entityId;
  });
  set(storeAtom, update);
});
