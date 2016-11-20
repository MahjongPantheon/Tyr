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
