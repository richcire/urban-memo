import { atom } from "recoil";

interface IRecoilStorage {
  done: (string | null)[];
  todo: string[];
  willDo: (string | null)[];
}
export const recoilStorage = atom<IRecoilStorage>({
  key: "storageState",
  default: {
    done: [],
    todo: ["Add new todo!"],
    willDo: [],
  },
});
