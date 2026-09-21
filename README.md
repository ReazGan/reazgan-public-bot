# Nöbetçi

Türkçe topluluklar ve FiveM sunucuları için çok sunuculu Discord koruma, moderasyon ve yönetim botu. Anti-raid koruma, moderasyon, kayıt, ekonomi/seviye, ticket ve web panelini tek botta toplar. Kendi sunucunda (VPS) çalışır, veriler ve token tamamen sende kalır.

`discord.js 14` · `TypeScript` · `better-sqlite3` · geliştirici: [reazgan](https://github.com/ReazGan)

Botun tam kaynak kodu satışa/kiralamaya özeldir, bu depoda yer almaz. Aşağıda özellikler, komut listesi ve örnek kod var; iletişim en altta.

## Özellikler

- **Koruma (anti-raid / anti-nuke).** Kanal & rol silme, toplu ban/kick, izinsiz bot girişi ve yetki verme koruması. Limit aşan yetkiliyi otomatik durdurur, güvenli liste ile beyaz listeye alır. Denetim kaydı tabanlı, gerçek zamanlı.
- **Moderasyon.** Ban, kick, rol tabanlı chat-mute (timeout değil), jail, uyarı/ceza puanı, sicil. Sesli moderasyon: vmute, allmute, allmove.
- **Kayıt.** Erkek/kadın kayıt, otorol, kayıtsız rolü, yaş sorgusu. Sese girince yetkili çağırma ve karşılama kartı.
- **Ekonomi & seviye.** Coin ekonomisi, günlük ödül, market, mini oyunlar, mesaj/ses XP'si ve kişiye özel seviye kartı. Tema/renk panelden ayarlanır.
- **Web kontrol paneli.** Botla gelen, sıfır dış bağımlılıklı gömülü panel. Discord ile giriş, tüm ayarlar + liste yönetimi ve istatistik dashboard'u.
- **Çok-bot (Capella tarzı).** Ayrı koruma botları (yükü paylaşır), karşılama botları ve seste duran botlar. `.env`'de isimli satırlarla kurulur, ses kanalları panelden yönetilir.
- **Ticket, çekiliş, davet takibi.** HTML transcript'li ticket, çekiliş, davet sıralaması, en aktif kanallar, haftalık rapor.
- **Özelleştirme.** Özel komutlar, oto-cevap, tepki/emoji rolleri, geçici ses odaları, sayaç kanalları, doğum günü & boost kutlama, başvuru/whitelist, panik/lockdown ve toplantı komutu.
- **Granül loglar.** 13 ayrı log kanalı (mesaj, giriş/çıkış, isim, rol, kanal, ses, ban, mute, jail, uyarı, kayıt, koruma, sunucu).

## Komutlar

90+ komut, hem slash (`/`) hem `!` ön ekiyle. Tam liste: [KOMUTLAR.md](KOMUTLAR.md).

## Örnek kod

Bir komutu bir kere yazarsın, hem slash hem ön ek olarak çalışır — ortak bir `ctx` argümanları iki tarafta da aynı şekilde okur:

```ts
export const avatar: HybridCommand = {
  kind: 'hybrid',
  name: 'avatar',
  aliases: ['av', 'pp'],
  category: 'Bilgi',
  description: 'Üyenin avatarını gösterir',
  options: [{ type: 'user', name: 'uye', description: 'Üye (boşsa sen)' }],
  async run(ctx) {
    const user = ctx.userOpt('uye') ?? ctx.user;        // /avatar @kişi  ya da  !avatar @kişi
    const url = user.displayAvatarURL({ size: 1024 });
    return ctx.reply({ embeds: [embed(COLOR.blue).setAuthor({ name: user.username }).setImage(url)] });
  },
};
```

Mimari: sunucu başına ayarlar (deep-merge JSON), şema tabanlı panel form motoru, denetim-kaydı tabanlı koruma, `@discordjs/voice` ile seste duran botlar. Dış servis bağımlılığı yok. Daha fazlası: [ornek-kod/](ornek-kod/).

## Kurulum

Kurulumu birlikte yaparız; bot senin VPS'inde çalışır, kaynak sende durur. Node.js 22 + `npm install` + `npm run build`, 7/24 için pm2. Tek sunucu = tek kopya = tek VPS. Türkiye'den barındırmaya uygun (yerleşik DNS aşımı).

## İletişim

Fiyat ve paketler için yaz (satış veya aylık kiralama):

- Discord: https://discord.gg/azt
- Discord DM: `reazgan0511`
- GitHub: [github.com/ReazGan](https://github.com/ReazGan)

## Lisans

© reazgan. Tüm hakları saklıdır. Bu depodaki içerik ve örnek kod izinsiz kullanılamaz, kopyalanamaz veya dağıtılamaz. Botun kullanımı satın alma/kiralama sözleşmesine tabidir. Bkz. [LICENSE](LICENSE).

---

## English

A multi-server Discord protection, moderation and management bot for Turkish communities and FiveM servers. Anti-raid protection, moderation, registration, economy/leveling, tickets and a web panel in one bot. Runs on your own VPS; data and token stay with you.

The full source code is proprietary and not published here. Features, command list and sample code are above; contact is below.

- **Protection (anti-raid / anti-nuke):** channel/role deletion, mass ban/kick, unauthorized bot joins and permission-grant protection — audit-log based, real time, with a safe list.
- **Moderation:** ban, kick, role-based chat-mute, jail, warnings/penalty points, records, plus voice moderation.
- **Registration:** male/female registration, autorole, age prompt, voice-based staff calling and welcome cards.
- **Economy & leveling:** coins, daily rewards, shop, mini-games, message/voice XP and per-user level cards.
- **Web panel:** zero-dependency embedded panel with Discord login, full settings + list management and a stats dashboard.
- **Multi-bot (Capella-style):** separate guard/welcome/voice-idle bots, configured via named `.env` lines and the panel.
- **Tickets, giveaways, invite tracking, granular logging, custom commands, auto-replies, reaction roles, temp voice rooms, panic/lockdown and a meeting command.**

Turnkey delivery: set up together, runs on your VPS, source stays with you. `Node.js 22` + `npm install` + `npm run build`, pm2 for 24/7.

Pricing on request (one-time purchase or monthly rental). Discord: https://discord.gg/azt · DM: `reazgan0511` · GitHub: [github.com/ReazGan](https://github.com/ReazGan)

© reazgan. All rights reserved. See [LICENSE](LICENSE).
