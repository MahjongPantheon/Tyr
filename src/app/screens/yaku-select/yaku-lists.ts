import { Yaku } from '../../interfaces/common';
import { yakuList, YakuId } from '../../primitives/yaku';

export const yakuGroups = [
  yakuList.filter((y: Yaku) => [
    YakuId.__OPENHAND
  ].indexOf(y.id) !== -1),

  yakuList.filter((y: Yaku) => [
    YakuId.RIICHI,
    YakuId.IPPATSU,
    YakuId.MENZENTSUMO
  ].indexOf(y.id) !== -1),

  yakuList.filter((y: Yaku) => [
    YakuId.PINFU,
    YakuId.TANYAO
  ].indexOf(y.id) !== -1),

  yakuList.filter((y: Yaku) => [
    YakuId.YAKUHAI1,
    YakuId.YAKUHAI2,
    YakuId.YAKUHAI3
  ].indexOf(y.id) !== -1),

  yakuList.filter((y: Yaku) => [
    YakuId.ITTSU,
    YakuId.HONITSU,
    YakuId.CHINITSU
  ].indexOf(y.id) !== -1),

  yakuList.filter((y: Yaku) => [
    YakuId.TOITOI,
    YakuId.CHIITOITSU
  ].indexOf(y.id) !== -1),

  yakuList.filter((y: Yaku) => [
    YakuId.CHANTA,
    YakuId.JUNCHAN
  ].indexOf(y.id) !== -1),

  yakuList.filter((y: Yaku) => [
    YakuId.SANSHOKUDOUJUN,
    YakuId.IIPEIKOU
  ].indexOf(y.id) !== -1),
];

export const yakuRareGroups = [
  yakuList.filter((y: Yaku) => [
    YakuId.DOUBLERIICHI,
    YakuId.OPENRIICHI
  ].indexOf(y.id) !== -1),

  yakuList.filter((y: Yaku) => [
    YakuId.HONROTO,
    YakuId.SHOSANGEN,
    YakuId.YAKUHAI4
    //YakuId.YAKUHAI5
  ].indexOf(y.id) !== -1),

  yakuList.filter((y: Yaku) => [
    YakuId.SANANKOU,
    YakuId.SANSHOKUDOUKOU,
    YakuId.SANKANTSU
  ].indexOf(y.id) !== -1),

  yakuList.filter((y: Yaku) => [
    YakuId.RYANPEIKOU
  ].indexOf(y.id) !== -1),

  yakuList.filter((y: Yaku) => [
    YakuId.HAITEI,
    YakuId.HOUTEI,
    YakuId.RINSHANKAIHOU
  ].indexOf(y.id) !== -1),

  yakuList.filter((y: Yaku) => [
    YakuId.CHANKAN,
    YakuId.RENHOU
  ].indexOf(y.id) !== -1),
];

export const yakumanGroups = [
  yakuList.filter((y: Yaku) => [
    YakuId.TENHOU,
    YakuId.CHIHOU
  ].indexOf(y.id) !== -1),

  yakuList.filter((y: Yaku) => [
    YakuId.DAISANGEN,
    YakuId.DAISUUSHII,
    YakuId.SHOSUUSHII
  ].indexOf(y.id) !== -1),

  yakuList.filter((y: Yaku) => [
    YakuId.SUUANKOU,
    YakuId.SUUKANTSU
  ].indexOf(y.id) !== -1),

  yakuList.filter((y: Yaku) => [
    YakuId.CHINROTO,
    YakuId.TSUUIISOU,
    YakuId.KOKUSHIMUSOU
  ].indexOf(y.id) !== -1),

  yakuList.filter((y: Yaku) => [
    YakuId.RYUUIISOU,
    YakuId.CHUURENPOUTO
  ].indexOf(y.id) !== -1),
];
