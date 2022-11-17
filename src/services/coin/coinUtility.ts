import { Hex0x, prefix0x } from "./condition";
import { Bytes, bigint_to_bytes } from "clvm";
import { GetPuzzleApiCallback } from "../transfer/transfer";
import { CoinItem } from "@/models/wallet";
import { CoinSpend, OriginCoin } from "../spendbundle";

export interface NetworkContext {
  prefix: string;
  symbol: string;
  chainId: string;
  api: GetPuzzleApiCallback;
}

export interface NetworkContextWithOptionalApi {
  prefix: string;
  symbol: string;
  chainId: string;
  api?: GetPuzzleApiCallback;
}

export interface CompatibleCoin {
  amount: bigint | number;
  parent_coin_info: Hex0x | string;
  puzzle_hash: Hex0x | string;
}

export interface LockedCoin {
  coinName: string;
  coin: OriginCoin;
  transactionTime: number;
  symbol: string;
  network: string;
}

export interface PendingTransaction {
  coin: LockedCoin[];
  amount: bigint;
  time: number;
  network: string;
  symbol: string;
}

export async function lockCoins(coinSpends: CoinSpend[], transactionTime: number, symbol: string, network: string): Promise<void> {
  const lcStr = localStorage.getItem("LOCKED_COINS");
  const lc: LockedCoin[] = lcStr ? JSON.parse(lcStr) : [];
  for (const cs of coinSpends) {
    const coinName = getCoinName(cs.coin);
    lc.push({ coinName: coinName, coin: cs.coin, transactionTime: transactionTime, symbol: symbol, network: network });
  }
  localStorage.setItem("LOCKED_COINS", JSON.stringify(lc));
}

export async function unlockCoins(coins: OriginCoin[]): Promise<void> {
  const lcStr = localStorage.getItem("LOCKED_COINS");
  let lc: LockedCoin[] = lcStr ? JSON.parse(lcStr) : [];
  for (const coin of coins) {
    const cname = getCoinName(coin);
    lc = lc.filter(c => c.coinName !== cname);
  }
  localStorage.setItem("LOCKED_COINS", JSON.stringify(lc));
}

export function coinFilter(coins: OriginCoin[], network: string): OriginCoin[] {
  const lcStr = localStorage.getItem("LOCKED_COINS");
  let lc: LockedCoin[] = lcStr ? JSON.parse(lcStr) : [];
  lc = lc.filter((l) => l.network == network);
  return coins.filter(coin => {
    const name = getCoinName(coin);
    return lc.findIndex(c => c.coinName == name) == -1;
  });
}

export function getCoinName0x(coin: CompatibleCoin): Hex0x {
  return prefix0x(getCoinNameHex(coin).hex());
}

export function getCoinName(coin: CompatibleCoin): string {
  return getCoinNameHex(coin).hex();
}

export function getCoinNameHex(coin: CompatibleCoin): Bytes {
  const a = bigint_to_bytes(BigInt(coin.amount), { signed: true });
  const pci = Bytes.from(coin.parent_coin_info, "hex");
  const ph = Bytes.from(coin.puzzle_hash, "hex");
  const cont = pci.concat(ph).concat(a);
  const coinname = Bytes.SHA256(cont);
  return coinname;
}

export function convertToOriginCoin(coin: CoinItem | { amount: number, parent_coin_info: Hex0x | string, puzzle_hash: Hex0x | string }): OriginCoin {
  return "parentCoinInfo" in coin
    ? {
      amount: BigInt(coin.amount),
      parent_coin_info: coin.parentCoinInfo,
      puzzle_hash: coin.puzzleHash,
    }
    : {
      amount: BigInt(coin.amount),
      parent_coin_info: prefix0x(coin.parent_coin_info),
      puzzle_hash: prefix0x(coin.puzzle_hash),
    };
}