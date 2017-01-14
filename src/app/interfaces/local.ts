import { Player } from './common';
import { YakuId } from '../primitives/yaku';

export type LCurrentGame = {
  hashcode: string;
  players: [Player, Player, Player, Player]; // players data
  status: string; // should always be inprogress with current logic
};

export type LUser = {
  id: number;
  displayName: string;
  ident: string;
  tenhouId: string;
  alias: string;
}

export type LUserWithScore = LUser & {
  score: number;
}

export interface LTimerState {
  started: boolean;
  finished: boolean;
  timeRemaining: number;
}

export interface LWinItem {
  winner: number;
  han: number;
  fu: number;
  dora: number;
  uradora: number;
  kandora: number;
  kanuradora: number;
  yaku: YakuId[];
}
