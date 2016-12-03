import { Player } from './common';

export type LCurrentGame = {
  hashcode: string;
  players: [Player, Player, Player, Player]; // players data
  status: string; // should always be inprogress with current logic
};
