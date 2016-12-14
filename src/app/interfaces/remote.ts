// rounds

export interface RRoundRon {
  outcome: 'ron';
  riichi: string; // comma-separated
  winner_id: number;
  loser_id: number;
  han: number;
  fu: number;
  multi_ron: null;
  dora: number;
  uradora: number;
  kandora: number;
  kanuradora: number;
  yaku: string; // comma-separated ids
}

export interface RRoundTsumo {
  outcome: 'tsumo';
  riichi: string; // comma-separated
  winner_id: number;
  han: number;
  fu: number;
  multi_ron: null;
  dora: number;
  uradora: number;
  kandora: number;
  kanuradora: number;
  yaku: string; // comma-separated ids
}

export interface RRoundDraw {
  outcome: 'draw';
  riichi: string; // comma-separated
  tempai: string; // comma-separated
}

export interface RRoundAbort {
  outcome: 'abort';
  riichi: string; // comma-separated
}

export interface RRoundChombo {
  outcome: 'chombo';
  loser_id: number;
}

export type RRound
  = RRoundRon
  | RRoundTsumo
  | RRoundDraw
  | RRoundAbort
  | RRoundChombo
  ;

export interface RGameConfig {
  allowedYaku: { [key: string]: number };
  startPoints: number;
  withKazoe: boolean;
  withKiriageMangan: boolean;
  withAbortives: boolean;
  withNagashiMangan: boolean;
}

export interface RTimerState {
  started: boolean;
  finished: boolean;
  time_remaining: string;
}

export interface RSessionOverview {
  id: number;
  players: {
    id: number,
    display_name: string,
    ident: string
  }[];
  state: {
    dealer: number; // player id
    round: number;
    riichi: number; // on table
    honba: number;
    scores: { [key: number]: number };
    finished: boolean;
  }
}

// for getPlayer
export interface RUserInfo {
  id: number;
  alias: string;
  ident: string;
  display_name: string;
  tenhou_id: string;
}

// for current games info
export interface RPlayerData {
  id: number;
  alias: string;
  ident: string;
  display_name: string;
  score: number;
}

export type RCurrentGames = {
  hashcode: string;
  players: RPlayerData[]; // players data
  status: string; // should always be inprogress with current logic
}[];

export interface RAddRoundDryRun {
  dealer: number; // player id
  round: number;
  riichi: number; // riichis on table
  honba: number;
  scores: number[];
  payments: {
    direct: { [key: string]: number },
    riichi: { [key: string]: number },
    honba: { [key: string]: number }
  };
}
