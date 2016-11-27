import { YakuId } from '../primitives/yaku';

export type Outcome = "ron" | "tsumo" | "draw" | "abort" | "chombo" | "multiron";

export interface Yaku {
  id: YakuId;
  name: string;
  shortName: string;
  yakuman: boolean;
  //valueMelded: number; // TODO
  //valueConcealed: number;
  disabled?: boolean;
}
