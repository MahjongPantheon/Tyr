import { Outcome as OutcomeType } from './common';
import { YakuId } from '../primitives/yaku';

export interface Outcome {
  selectedOutcome: OutcomeType;
  roundIndex: number;
}

export interface WinProps {
  winner: number;
  han: number;
  fu: number;
  possibleFu: number[];
  yaku: YakuId[];
  dora: number;
}

export interface AppOutcomeRon extends Outcome, WinProps {
  selectedOutcome: 'ron';
  loser: number;
  riichiBets: number[]; // ids of players 
}

export interface AppOutcomeMultiRon extends Outcome {
  selectedOutcome: 'multiron';
  loser: number;
  multiRon: number;
  wins: { [key: number]: WinProps };
  riichiBets: number[]; // ids of players 
}

export interface AppOutcomeTsumo extends Outcome, WinProps {
  selectedOutcome: 'tsumo';
  riichiBets: number[]; // ids of players 
}

export interface AppOutcomeAbort extends Outcome {
  selectedOutcome: 'abort';
  riichiBets: number[]; // ids of players
}

export interface AppOutcomeDraw extends Outcome {
  selectedOutcome: 'draw';
  riichiBets: number[]; // ids of players
  tempai: number[]; // ids of players
}

export interface AppOutcomeChombo extends Outcome {
  selectedOutcome: 'chombo';
  loser: number;
}

export type AppOutcome
  = AppOutcomeRon
  | AppOutcomeTsumo
  | AppOutcomeMultiRon
  | AppOutcomeDraw
  | AppOutcomeAbort
  | AppOutcomeChombo
  ;


