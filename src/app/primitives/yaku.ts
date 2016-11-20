import { Yaku } from '../interfaces/common';
import { filter, clone } from 'lodash';

export enum YakuId {
  TOITOI = 1,
  HONROTO = 2,
  SANANKOU = 3,
  SANSHOKUDOUKOU = 4,
  SANKANTSU = 5,
  SUUKANTSU = 6,
  SUUANKOU = 7,
  PINFU = 8,
  IIPEIKOU = 9,
  RYANPEIKOU = 10,
  SANSHOKUDOUJUN = 11,
  ITTSU = 12,
  YAKUHAI1 = 13,
  YAKUHAI2 = 14,
  YAKUHAI3 = 15,
  YAKUHAI4 = 16,
  YAKUHAI5 = 17,
  SHOSANGEN = 18,
  DAISANGEN = 19,
  SHOSUUSHII = 20,
  DAISUUSHII = 21,
  TSUUIISOU = 22,
  TANYAO = 23,
  CHANTA = 24,
  JUNCHAN = 25,
  CHINROTO = 26,
  HONITSU = 27,
  CHINITSU = 28,
  CHUURENPOUTO = 29,
  RYUUIISOU = 30,
  CHIITOITSU = 31,
  KOKUSHIMUSOU = 32,
  RIICHI = 33,
  DOUBLERIICHI = 34,
  IPPATSU = 35,
  MENZENTSUMO = 36,
  HAITEI = 37,
  RINSHANKAIHOU = 38,
  TENHOU = 39,
  CHIHOU = 40,
  HOUTEI = 41,
  CHANKAN = 42,
  RENHOU = 43,
  OPENRIICHI = 44
}

export const yakuList: Yaku[] = [
  {
    id: YakuId.TOITOI,
    yakuman: false,
    name: "Toitoi",
    shortName: "Toitoi",
  },
  {
    id: YakuId.HONROTO,
    yakuman: false,
    name: "Honroto",
    shortName: "Honroto"
  },
  {
    id: YakuId.SANANKOU,
    yakuman: false,
    name: "Sanankou",
    shortName: "Sanankou"
  },
  {
    id: YakuId.SANKANTSU,
    yakuman: false,
    name: "Sankantsu",
    shortName: "Sankantsu"
  },
  {
    id: YakuId.SUUKANTSU,
    yakuman: true,
    name: "Suukantsu",
    shortName: "Suukantsu",
  },
  {
    id: YakuId.SUUANKOU,
    yakuman: true,
    name: "Suuankou",
    shortName: "Suuankou"
  },
  {
    id: YakuId.PINFU,
    yakuman: false,
    name: "Pin-fu",
    shortName: "Pin-fu"
  },
  {
    id: YakuId.IIPEIKOU,
    yakuman: false,
    name: "Iipeikou",
    shortName: "Iipeikou"
  },
  {
    id: YakuId.RYANPEIKOU,
    yakuman: false,
    name: "Ryanpeikou",
    shortName: "Ryanpeikou"
  },
  {
    id: YakuId.SANSHOKUDOUJUN,
    yakuman: false,
    name: "Sanshoku",
    shortName: "Sanshoku"
  },
  {
    id: YakuId.SANSHOKUDOUKOU,
    yakuman: false,
    name: "Sanshoku doko",
    shortName: "doko"
  },
  {
    id: YakuId.ITTSU,
    yakuman: false,
    name: "Ittsu",
    shortName: "Ittsu"
  },
  {
    id: YakuId.YAKUHAI1,
    yakuman: false,
    name: "Yakuhai 1",
    shortName: "Yakuhai",
  },
  {
    id: YakuId.YAKUHAI2,
    yakuman: false,
    name: "Yakuhai 2",
    shortName: "x2",
  },
  {
    id: YakuId.YAKUHAI3,
    yakuman: false,
    name: "Yakuhai 3",
    shortName: "x3",
  },
  {
    id: YakuId.YAKUHAI4,
    yakuman: false,
    name: "Yakuhai 4",
    shortName: "x4"
  },
  //{
  //  id: YakuId.YAKUHAI5,
  //  yakuman: false,
  //  name: "Yakuhai 5",
  //  shortName: "x5"
  //},
  {
    id: YakuId.SHOSANGEN,
    yakuman: false,
    name: "Shosangen",
    shortName: "Shosangen"
  },
  {
    id: YakuId.DAISANGEN,
    yakuman: true,
    name: "Daisangen",
    shortName: "Daisangen"
  },
  {
    id: YakuId.SHOSUUSHII,
    yakuman: true,
    name: "Shosuushi",
    shortName: "Shosuushi",
  },
  {
    id: YakuId.DAISUUSHII,
    yakuman: true,
    name: "Daisuushii",
    shortName: "Daisuushii"
  },
  {
    id: YakuId.TSUUIISOU,
    yakuman: true,
    name: "Tsuuiisou",
    shortName: "Tsuuiisou"
  },
  {
    id: YakuId.TANYAO,
    yakuman: false,
    name: "Tan-yao",
    shortName: "Tan-yao"
  },
  {
    id: YakuId.CHANTA,
    yakuman: false,
    name: "Chanta",
    shortName: "Chanta"
  },
  {
    id: YakuId.JUNCHAN,
    yakuman: false,
    name: "Junchan",
    shortName: "Junchan"
  },
  {
    id: YakuId.CHINROTO,
    yakuman: true,
    name: "Chinroto",
    shortName: "Chinroto"
  },
  {
    id: YakuId.HONITSU,
    yakuman: false,
    name: "Honitsu",
    shortName: "Honitsu"
  },
  {
    id: YakuId.CHINITSU,
    yakuman: false,
    name: "Chinitsu",
    shortName: "Chinitsu"
  },
  {
    id: YakuId.CHUURENPOUTO,
    yakuman: true,
    name: "Chuurenpoutou",
    shortName: "Chuurenpoutou"
  },
  {
    id: YakuId.RYUUIISOU,
    yakuman: true,
    name: "Ryuuisou",
    shortName: "Ryuuisou"
  },
  {
    id: YakuId.CHIITOITSU,
    yakuman: false,
    name: "Chiitoitsu",
    shortName: "Chiitoitsu"
  },
  {
    id: YakuId.KOKUSHIMUSOU,
    yakuman: true,
    name: "Kokushimusou",
    shortName: "Kokushimusou"
  },
  {
    id: YakuId.RIICHI,
    yakuman: false,
    name: "Riichi",
    shortName: "Riichi",
  },
  {
    id: YakuId.DOUBLERIICHI,
    yakuman: false,
    name: "Double riichi",
    shortName: "Double"
  },
  {
    id: YakuId.IPPATSU,
    yakuman: false,
    name: "Ippatsu",
    shortName: "Ippatsu",
  },
  {
    id: YakuId.MENZENTSUMO,
    yakuman: false,
    name: "Menzen tsumo",
    shortName: "Tsumo",
  },
  {
    id: YakuId.HAITEI,
    yakuman: false,
    name: "Haitei",
    shortName: "Haitei"
  },
  {
    id: YakuId.RINSHANKAIHOU,
    yakuman: false,
    name: "Rinshan kaihou",
    shortName: "Rinshan"
  },
  {
    id: YakuId.TENHOU,
    yakuman: true,
    name: "Tenhou",
    shortName: "Tenhou"
  },
  {
    id: YakuId.CHIHOU,
    yakuman: true,
    name: "Chihou",
    shortName: "Chihou"
  },
  {
    id: YakuId.HOUTEI,
    yakuman: false,
    name: "Houtei",
    shortName: "Houtei"
  },
  {
    id: YakuId.CHANKAN,
    yakuman: false,
    name: "Chankan",
    shortName: "Chankan"
  },
  {
    id: YakuId.RENHOU,
    yakuman: false,
    name: "Renhou",
    shortName: "Renhou"
  },
  {
    id: YakuId.OPENRIICHI,
    yakuman: false,
    name: "Open riichi",
    shortName: "Open"
  },
];

export const yakuGroups = [
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

/*
  Идея для проверки совместимости яку:
  - Граф связей, если яку сочетается с другим яку - между ними есть ребро.
  - Сочетаемость группы яку проверяется как равенство единице диаметра подграфа, включающего все яку группы.
  Другими словами, все яку должны быть попарно сочетаемыми. Третьими словами, подграф должен быть полносвязным.
  - Допустимость добавления нового яку в группу проверяется простым обходом группы и проверкой наличия ребра до нужного яку.
  - Причина отсечения конкретного яку - отсутствие прямого ребра с уже выбарнными яку. Можно выводить где-то.
*/

export const yakuCompat = `

x
-x
--x
---x
----x
YYYYYx
YYYYY-x
nnnnnSSx
nnnnnSS-x
nnnnnSS-dx
nnnnnSS--nx
nnnnnSS--nnx
-----SSn-n--x
---n-SSn-nnndx
---n-SSnnnnnddx
---n-SSnnnnndddx
---n-SSnnnnnddddx
---n-SSnnnnn-----x
YYYYY--YYYYYYYYYYYx
YYYYY--YYYYYYYYYYY-x
YYYYY--YYYYYYYYYYY--x
YYYYY--YYYYYYYYYYY---x
-n---SS----nnnnnnnSSSSx
nsnnnSS----n------SSSSnx
nnnnnSS----nnnnnnnSSSSndx
YYYYY--YYYYYYYYYYY----YYYx
---n-SS---n-------SSSSn-nSx
-n-n-SS---n-nnnnnnSSSS-n-S-x
YYYYY--YYYYYYYYYYY----YYY-YYx
YYYYY--YYYYYYYYYYY----YYY-YY-x
n-nnnSSndsnnnnnnnnSSSS-nnS--SSx
YYYYY--YYYYYYYYYYY----YYY-YY--Yx
-----SS-----------SSSS---S--SS-Sx
-----SS-----------SSSS---S--SS-Sdx
-----SS-----------SSSS---S--SS-S--x
n----SS--------nn-SSSS---S--SS-S---x
-----SS-----------SSSS---S--SS-S----x
-----SSn-n--------SSSS---S--SSnS--n-nx
YYYYY--YYYYYYYYYYY----YYY-YY--Y-YYYYYYx
YYYYY--YYYYYYYYYYY----YYY-YY--Y-YYYYYY-x
-----SS-----------SSSS---S--SS-S---nnnSSx
-----SS-----------SSSS---S--SS-S---nnnSSnx
dddddSSdddddddddddSSSSdddSddSSddddddddSSddx
-----SS-----------SSSS---S--SS-S-d----SS---x

`.replace(/^\s+|\s+$/, '').split("\n");

// x: яку совпадают
// n: яку не совместимы и исключают друг друга
// Y: яку в строке - якуман и подавляет яку в строке
// S: яку в строке - подавлено якуманов столбце
// -: яку суммируются
// s: яку в строке подавлено другим яку в столбце
// d: яку в строке подавляет яку в столбце

export function addYakuToList(yaku: YakuId, enabledYaku: YakuId[]) {
  let newYakuList = clone(enabledYaku);
  for (let y of enabledYaku) {
    switch (yakuCompat[yaku - 1][y - 1]) {
      case 'n':
      case 's':
        return enabledYaku;
      case 'x':
        newYakuList = filter(newYakuList, (el) => el == yaku);
        break;
      case 'S':
        return [y];
      case 'Y':
        return [yaku];
      case 'd':
        newYakuList = filter(newYakuList, (el) => el == y);
        break;
      case '-':
      default: ;
    }
  }

  return newYakuList.concat([yaku]);
}

export function mayAddYaku(yaku: YakuId, enabledYaku: YakuId[]) {
  for (let y of enabledYaku) {
    switch (yakuCompat[yaku - 1][y - 1]) {
      case 'n':
      case 's':
      case 'x':
      case 'S':
        return false;
      case 'Y':
        return true;
      case 'd':
      case '-':
      default: ;
    }
  }

  return true;
}
