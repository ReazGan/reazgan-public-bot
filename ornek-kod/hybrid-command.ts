/*
 * Nöbetçi — mimari örneği (tanıtım amaçlı, kısaltılmış)
 * geliştirici: reazgan · github.com/ReazGan
 *
 * Botun tamamı bu "hibrit komut" soyutlaması üzerine kurulu:
 * bir komutu bir kere yazarsın, hem slash (/) hem ön ek (!) olarak çalışır.
 * Argümanları iki tarafta da aynı `ctx` üzerinden okursun; kod tekrarı olmaz.
 */
import type { Guild, GuildMember, Role, User } from 'discord.js';

export type OptionType = 'user' | 'role' | 'channel' | 'string' | 'integer' | 'boolean';

export interface OptionDef {
  type: OptionType;
  name: string;
  description: string;
  required?: boolean;
  /** string: ön ek komutunda kalan tüm kelimeleri alır (ör. sebep) */
  rest?: boolean;
  choices?: { name: string; value: string }[];
}

/** Komut gövdesine gelen bağlam — slash ve ön ek için ortak arayüz. */
export interface Ctx {
  guild: Guild;
  member: GuildMember;
  user: User;
  isSlash: boolean;

  // Argüman okuyucular (kaynak slash seçeneği ya da ön ek kelimesi olabilir)
  str(name: string): string | null;
  int(name: string): number | null;
  bool(name: string): boolean | null;
  userOpt(name: string): User | null;
  role(name: string): Role | null;

  reply(data: Reply): Promise<unknown>;
}

export type Reply = string | { content?: string; ephemeral?: boolean /* + embeds, files, components */ };

export interface HybridCommand {
  kind: 'hybrid';
  name: string;
  aliases?: string[];
  category: string;
  description: string;
  options?: OptionDef[];
  /** yalnızca yetkili roller/izinler için (opsiyonel) */
  permission?: string;
  run(ctx: Ctx): Promise<unknown>;
}

/*
 * Örnek: yukarıdaki tipi kullanan gerçek bir komut için bkz. avatar.ts
 * Not: Bu dosya kısaltılmış bir örnektir; tam tip tanımları ve komut
 * yönlendiricisi (router) satın alınan kaynak kodunda yer alır.
 */
