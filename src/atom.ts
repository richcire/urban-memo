import { atom } from "recoil";

interface IRecoilStorage {
  done: (string | null)[];
  todo: (string | null)[];
  willDo: (string | null)[];
}
export const recoilStorage = atom<IRecoilStorage>({
  key: "storageState",
  default: {
    done: ["Place done here"],
    todo: ["Add new todo!"],
    willDo: ["PLace will here"],
  },
});
