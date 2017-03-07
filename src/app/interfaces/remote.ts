export interface WinItem {
  riichi: string; // comma-separated
  winner_id: number;
  han: number;
  fu: number;
  dora: number;
  uradora: number;
  kandora: number;
  kanuradora: number;
  yaku: string; // comma-separated ids
}

// rounds

export interface RRoundRon extends WinItem {
  round_index: number;
  honba: number;
  outcome: 'ron';
  loser_id: number;
  multi_ron: null;
}

export interface RRoundMultiRon {
  round_index: number;
  honba: number;
  outcome: 'multiron';
  loser_id: number;
  multi_ron: number; // should equal to wins.length
  wins: WinItem[];
}

export interface RRoundTsumo extends WinItem {
  round_index: number;
  honba: number;
  outcome: 'tsumo';
  multi_ron: null;
}

export interface RRoundDraw {
  round_index: number;
  honba: number;
  outcome: 'draw';
  riichi: string; // comma-separated
  tempai: string; // comma-separated
}

export interface RRoundAbort {
  round_index: number;
  honba: number;
  outcome: 'abort';
  riichi: string; // comma-separated
}

export interface RRoundChombo {
  round_index: number;
  honba: number;
  outcome: 'chombo';
  loser_id: number;
}

export type RRound
  = RRoundRon
  | RRoundMultiRon
  | RRoundTsumo
  | RRoundDraw
  | RRoundAbort
  | RRoundChombo
  ;

export interface RGameConfig {
  allowedYaku: number[];
  startPoints: number;
  withKazoe: boolean;
  withKiriageMangan: boolean;
  withAbortives: boolean;
  withNagashiMangan: boolean;
  eventTitle: string;
  withAtamahane: boolean;
  autoSeating: boolean;
  rulesetTitle: string;
  eventStatHost: string;
  tonpuusen: boolean;
  startRating: number;
  riichiGoesToWinner: boolean;
  extraChomboPayments: boolean;
  chomboPenalty: number;
  withKuitan: boolean;
  withButtobi: boolean;
  withMultiYakumans: boolean;
  gameExpirationTime: number;
  withLeadingDealerGameover: boolean;
  redZone: number | null;
}

export interface RTimerState {
  started: boolean;
  finished: boolean;
  time_remaining: string;
}

export interface RSessionOverview {
  id: number;
  table_index: number;
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

export type RAllPlayersInEvent = {
  id: number;
  alias: string;
  display_name: string;
  tenhou_id: string;
}[]

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
  rating_delta: number;
}

export type RLastResults = RPlayerData[];

export type RCurrentGames = {
  hashcode: string;
  table_index: number;
  players: RPlayerData[]; // players data
  status: string; // should always be inprogress with current logic
}[];

export interface RAddRoundDryRun {
  dealer: number; // player id
  round: number;
  riichi: number; // riichis on table
  riichiIds: number[]; // player ids
  outcome: 'ron' | 'multiron' | 'tsumo' | 'draw' | 'abort' | 'chombo';
  penaltyFor: number | null;
  honba: number;
  scores: number[];
  payments: {
    direct: { [key: string]: number },
    riichi: { [key: string]: number },
    honba: { [key: string]: number }
  };
}
