import { Yaku } from '../interfaces/common';

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
    name: "Toitoi"
  },
  {
    id: YakuId.HONROTO,
    yakuman: false,
    name: "Honroto"
  },
  {
    id: YakuId.SANANKOU,
    yakuman: false,
    name: "Sanankou"
  },
  {
    id: YakuId.SANSHOKUDOUKOU,
    yakuman: false,
    name: "Sanshoku doko"
  },
  {
    id: YakuId.SANKANTSU,
    yakuman: false,
    name: "Sankantsu"
  },
  {
    id: YakuId.SUUKANTSU,
    yakuman: true,
    name: "Suukantsu"
  },
  {
    id: YakuId.SUUANKOU,
    yakuman: true,
    name: "Suuankou"
  },
  {
    id: YakuId.PINFU,
    yakuman: false,
    name: "Pin-fu"
  },
  {
    id: YakuId.IIPEIKOU,
    yakuman: false,
    name: "Iipeikou"
  },
  {
    id: YakuId.RYANPEIKOU,
    yakuman: false,
    name: "Ryanpeikou"
  },
  {
    id: YakuId.SANSHOKUDOUJUN,
    yakuman: false,
    name: "Sanshoku"
  },
  {
    id: YakuId.ITTSU,
    yakuman: false,
    name: "Ittsu"
  },
  {
    id: YakuId.YAKUHAI1,
    yakuman: false,
    name: "Yakuhai 1"
  },
  {
    id: YakuId.YAKUHAI2,
    yakuman: false,
    name: "Yakuhai 2"
  },
  {
    id: YakuId.YAKUHAI3,
    yakuman: false,
    name: "Yakuhai 3"
  },
  {
    id: YakuId.YAKUHAI4,
    yakuman: false,
    name: "Yakuhai 4"
  },
  {
    id: YakuId.YAKUHAI5,
    yakuman: false,
    name: "Yakuhai 5"
  },
  {
    id: YakuId.SHOSANGEN,
    yakuman: false,
    name: "Shosangen"
  },
  {
    id: YakuId.DAISANGEN,
    yakuman: true,
    name: "Daisangen"
  },
  {
    id: YakuId.SHOSUUSHII,
    yakuman: true,
    name: "Shosuushi"
  },
  {
    id: YakuId.DAISUUSHII,
    yakuman: true,
    name: "Daisuushii"
  },
  {
    id: YakuId.TSUUIISOU,
    yakuman: true,
    name: "Tsuuiisou"
  },
  {
    id: YakuId.TANYAO,
    yakuman: false,
    name: "Tan-yao"
  },
  {
    id: YakuId.CHANTA,
    yakuman: false,
    name: "Chanta"
  },
  {
    id: YakuId.JUNCHAN,
    yakuman: false,
    name: "Junchan"
  },
  {
    id: YakuId.CHINROTO,
    yakuman: true,
    name: "Chinroto"
  },
  {
    id: YakuId.HONITSU,
    yakuman: false,
    name: "Honitsu"
  },
  {
    id: YakuId.CHINITSU,
    yakuman: false,
    name: "Chinitsu"
  },
  {
    id: YakuId.CHUURENPOUTO,
    yakuman: true,
    name: "Chuurenpoutou"
  },
  {
    id: YakuId.RYUUIISOU,
    yakuman: true,
    name: "Ryuuisou"
  },
  {
    id: YakuId.CHIITOITSU,
    yakuman: false,
    name: "Chiitoitsu"
  },
  {
    id: YakuId.KOKUSHIMUSOU,
    yakuman: true,
    name: "Kokushimusou"
  },
  {
    id: YakuId.RIICHI,
    yakuman: false,
    name: "Riichi"
  },
  {
    id: YakuId.DOUBLERIICHI,
    yakuman: false,
    name: "Double riichi"
  },
  {
    id: YakuId.IPPATSU,
    yakuman: false,
    name: "Ippatsu"
  },
  {
    id: YakuId.MENZENTSUMO,
    yakuman: false,
    name: "Menzen tsumo"
  },
  {
    id: YakuId.HAITEI,
    yakuman: false,
    name: "Haitei"
  },
  {
    id: YakuId.RINSHANKAIHOU,
    yakuman: false,
    name: "Rinshan kaihou"
  },
  {
    id: YakuId.TENHOU,
    yakuman: true,
    name: "Tenhou"
  },
  {
    id: YakuId.CHIHOU,
    yakuman: true,
    name: "Chihou"
  },
  {
    id: YakuId.HOUTEI,
    yakuman: false,
    name: "Houtei"
  },
  {
    id: YakuId.CHANKAN,
    yakuman: false,
    name: "Chankan"
  },
  {
    id: YakuId.RENHOU,
    yakuman: false,
    name: "Renhou"
  },
  {
    id: YakuId.OPENRIICHI,
    yakuman: false,
    name: "Open riichi"
  },
];