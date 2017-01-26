import { Player } from '../../interfaces/common';
import { AppOutcome } from '../../interfaces/app';
import { YakuId } from '../yaku';

export function toggleRiichi(
  p: Player,
  outcome: AppOutcome,
  removeYaku: (y: YakuId) => void
) {
  switch (outcome.selectedOutcome) {
    case 'ron':
    case 'tsumo':
    case 'abort':
    case 'draw':
    case 'multiron':
      if (
        outcome.selectedOutcome === 'draw' &&
        outcome.tempai.indexOf(p.id) === -1
      ) {
        outcome.tempai.push(p.id); // add tempai on riichi click
      }

      const pIdx = outcome.riichiBets.indexOf(p.id);
      if (pIdx === -1) {
        outcome.riichiBets.push(p.id);
        // We don't add riichi here, because it's added as
        // required yaku on yaku selector init, see getRequiredYaku
        return;
      }

      outcome.riichiBets.splice(pIdx, 1);

      // Remove riichi yaku if user is winner
      if (
        outcome.selectedOutcome !== 'ron' &&
        outcome.selectedOutcome !== 'tsumo'
      ) {
        return;
      }

      if (outcome.winner === p.id) {
        removeYaku(YakuId.RIICHI);
        removeYaku(YakuId.IPPATSU);
      }

      break;
    default:
      throw new Error('No winners exist on this outcome');
  }
}

export type PMap = { [key: number]: Player };

export function getRiichiUsers(outcome: AppOutcome, playerIdMap: PMap): Player[] {
  switch (outcome.selectedOutcome) {
    case 'ron':
    case 'tsumo':
    case 'draw':
    case 'abort':
    case 'multiron':
      return outcome.riichiBets.map((r) => playerIdMap[r]);
    default:
      return [];
  }
}
