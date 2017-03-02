import { AppOutcome } from '../../interfaces/app';
import { YakuId } from '../yaku';
import { getHan, getFixedFu } from '../yaku-values';
import { WinProps } from '../../interfaces/app';
import { getAllowedYaku as getAllowedYakuCompat, addYakuToList, initYakuGraph } from '../yaku-compat';

export const initYaku = initYakuGraph;

export function hasYaku(outcome: AppOutcome, id: YakuId, mrWinner: number) {
  switch (outcome.selectedOutcome) {
    case 'ron':
    case 'tsumo':
      return -1 !== outcome.yaku.indexOf(id);
    case 'multiron':
      return -1 !== outcome.wins[mrWinner].yaku.indexOf(id);
    default:
      return false;
  }
}

export function getRequiredYaku(outcome: AppOutcome, mrWinner: number): YakuId[] {
  switch (outcome.selectedOutcome) {
    case 'ron':
      if (outcome.riichiBets.indexOf(outcome.winner) !== -1) {
        return [YakuId.RIICHI];
      }
      break;
    case 'tsumo':
      if (outcome.riichiBets.indexOf(outcome.winner) !== -1) {
        return [
          YakuId.RIICHI,
          YakuId.MENZENTSUMO
        ];
      }
    case 'multiron':
      if (outcome.riichiBets.indexOf(mrWinner) !== -1) {
        return [YakuId.RIICHI];
      }
    default:
      return [];
  }

  return [];
}

export function getSelectedYaku(outcome: AppOutcome, mrWinner: number): YakuId[] {
  switch (outcome.selectedOutcome) {
    case 'ron':
    case 'tsumo':
      return [].concat(outcome.yaku);
    case 'multiron':
      return [].concat(outcome.wins[mrWinner].yaku);
    default:
      return [];
  }
}

function _addYakuToProps(outcome: AppOutcome, id: YakuId, props: WinProps, bypassChecks: boolean = false): boolean {
  if (props.yaku.indexOf(id) !== -1) {
    return false;
  }

  if (!bypassChecks && id === YakuId.RIICHI && props.yaku.indexOf(YakuId.RIICHI) === -1) {
    alert('Чтобы добавить риичи, вернитесь назад и отметьте риичи-ставку у победителя');
    return false;
  }

  if (
    !bypassChecks &&
    id === YakuId.DOUBLERIICHI && (
      outcome.selectedOutcome === 'ron' ||
      outcome.selectedOutcome === 'tsumo' ||
      outcome.selectedOutcome === 'multiron'
    ) &&
    outcome.riichiBets.indexOf(props.winner) === -1
  ) {
    alert('Чтобы добавить дабл-риичи, необходимо вернуться назад и отметить риичи-ставку у победителя');
    return false;
  }

  props.yaku = addYakuToList(id, props.yaku);
  props.han = getHan(props.yaku);
  props.possibleFu = getFixedFu(props.yaku, outcome.selectedOutcome);
  if (-1 === props.possibleFu.indexOf(props.fu)) {
    props.fu = props.possibleFu[0];
  }
  return true;
}

export function addYaku(outcome: AppOutcome, id: YakuId, mrWinner: number, bypassChecks: boolean = false): void {
  switch (outcome.selectedOutcome) {
    case 'ron':
    case 'tsumo':
      if (!_addYakuToProps(outcome, id, outcome, bypassChecks)) { // pass outcome to props - because we alter outcome itself
        return;
      }

      if (outcome.selectedOutcome === 'tsumo') {
        if (id === YakuId.MENZENTSUMO && outcome.yaku.indexOf(YakuId.__OPENHAND) !== -1) {
          removeYaku(outcome, YakuId.__OPENHAND, mrWinner);
        } else if (id === YakuId.__OPENHAND && outcome.yaku.indexOf(YakuId.MENZENTSUMO) !== -1) {
          removeYaku(outcome, YakuId.MENZENTSUMO, mrWinner);
        }
      }
      break;
    case 'multiron':
      let props = outcome.wins[mrWinner];
      _addYakuToProps(outcome, id, props, bypassChecks);
      break;
    default:
      throw new Error('No yaku may exist on this outcome');
  }
}

function _removeYakuFromProps(outcome: AppOutcome, id: YakuId, props: WinProps, mrWinner: number): boolean {
  if (props.yaku.indexOf(id) === -1) {
    return false;
  }

  if (getRequiredYaku(outcome, mrWinner).indexOf(id) !== -1) { // do not allow to disable required yaku
    return false;
  }
  const pIdx = props.yaku.indexOf(id);
  if (pIdx !== -1) {
    props.yaku.splice(pIdx, 1);
  }
  props.han = getHan(props.yaku);
  props.possibleFu = getFixedFu(props.yaku, outcome.selectedOutcome);
  if (-1 === props.possibleFu.indexOf(props.fu)) {
    props.fu = props.possibleFu[0];
  }
}

export function removeYaku(outcome: AppOutcome, id: YakuId, mrWinner: number): void {
  switch (outcome.selectedOutcome) {
    case 'ron':
    case 'tsumo':
      if (!_removeYakuFromProps(outcome, id, outcome, mrWinner)) { // pass outcome to props - because we alter outcome itself
        return;
      }

      if (outcome.selectedOutcome === 'tsumo') {
        if (id === YakuId.MENZENTSUMO && outcome.yaku.indexOf(YakuId.__OPENHAND) === -1) {
          addYaku(outcome, YakuId.__OPENHAND, mrWinner);
        } else if (id === YakuId.__OPENHAND && outcome.yaku.indexOf(YakuId.MENZENTSUMO) === -1) {
          addYaku(outcome, YakuId.MENZENTSUMO, mrWinner);
        }
      }
      break;
    // TODO: вернуть подавленные яку? или нет?
    case 'multiron':
      let props = outcome.wins[mrWinner];
      _removeYakuFromProps(outcome, id, props, mrWinner);
      break;
    default:
      throw new Error('No yaku may exist on this outcome');
  }
}

export function getAllowedYaku(outcome: AppOutcome, mrWinner: number): YakuId[] {
  switch (outcome.selectedOutcome) {
    case 'ron':
      return _excludeYaku(
        outcome,
        getAllowedYakuCompat(outcome.yaku),
        [
          YakuId.MENZENTSUMO,
          YakuId.HAITEI,
          YakuId.TENHOU,
          YakuId.CHIHOU
        ]
      );
    case 'tsumo':
      return _excludeYaku(
        outcome,
        getAllowedYakuCompat(outcome.yaku),
        [
          YakuId.HOUTEI,
          YakuId.CHANKAN,
          YakuId.RENHOU
        ]
      );
    case 'multiron':
      return _excludeYaku(
        outcome,
        getAllowedYakuCompat(outcome.wins[mrWinner].yaku),
        [
          YakuId.MENZENTSUMO,
          YakuId.HAITEI,
          YakuId.TENHOU,
          YakuId.CHIHOU
        ]
      );
    default:
      return [];
  }
}

function _excludeYaku(outcome: AppOutcome, list: YakuId[], toBeExcluded: YakuId[]) {
  return list.filter((yaku: YakuId) => {
    if ( // disable ippatsu if riichi is not selected
      yaku === YakuId.IPPATSU
      && (outcome.selectedOutcome === 'ron' || outcome.selectedOutcome === 'tsumo')
      && outcome.yaku.indexOf(YakuId.RIICHI) === -1
    ) {
      return false;
    }

    if (
      yaku === YakuId.__OPENHAND
      && (outcome.selectedOutcome === 'ron' || outcome.selectedOutcome === 'tsumo')
      && outcome.riichiBets.indexOf(outcome.winner) !== -1
    ) {
      return false; // disable open hand if one won with riichi
    }
    return toBeExcluded.indexOf(yaku) === -1;
  });
}
