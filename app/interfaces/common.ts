import { YakuId } from '../primitives/yaku';

export type Outcome = "ron" | "tsumo" | "draw" | "abort" | "chombo" | "doubleron";

export interface Yaku {
  id: YakuId;
  name: string;
  yakuman: boolean;
  //valueMelded: number; // TODO
  //valueConcealed: number;
  disabled?: boolean;
}
