# Nöbetçi — Discord Koruma & Yönetim Botu

> Türkçe topluluklar ve FiveM sunucuları için tasarlanmış **çok sunuculu** koruma, moderasyon, kayıt, ekonomi ve **web panelli** Discord botu. Kendi sunucun (VPS) üzerinde, tamamen sana ait çalışır.

**Geliştirici:** [reazgan](https://github.com/ReazGan) &nbsp;·&nbsp; discord.js 14 &nbsp;·&nbsp; TypeScript &nbsp;·&nbsp; better-sqlite3

<!-- Banner eklemek istersen: ekran-goruntuleri/banner.png koy, alttaki yorumu aç -->
<!-- ![Nöbetçi](ekran-goruntuleri/banner.png) -->

---

Nöbetçi; anti-raid koruma, moderasyon, kayıt, ekonomi/seviye, ticket, çekiliş ve daha fazlasını **tek botta** toplar. Ayarların tamamı hem Discord komutlarından hem de **gömülü web panelinden** (Discord ile giriş) yönetilir. Büyük sunucular için Capella tarzı **çok-bot** mimarisi (ayrı koruma + karşılama + seste duran botlar) destekler.

> Bu depo bir **tanıtım / vitrindir.** Botun tam kaynak kodu satışa/kiralamaya özeldir ve burada paylaşılmaz. Aşağıda özellikler, ekran görüntüleri, komut listesi ve örnek kod bulabilirsin. Satın almak / denemek için [iletişim](#satın-alma--i̇letişim).

## Öne çıkanlar

**🛡️ Koruma (anti-raid / anti-nuke)**
Kanal & rol silme, toplu ban/kick, izinsiz bot girişi, yetki verme koruması. Limit aşan yetkiliyi otomatik durdurur (jetleme), güvenli liste ile beyaz listeye alır. Denetim kaydı (audit log) tabanlı, gerçek zamanlı.

**⚔️ Moderasyon**
`ban` · `kick` · `mute` (rol tabanlı chat-mute, timeout değil) · `jail` · `uyar` / ceza puanı · `sicil` · `unban` · `forceban` · `banliste`. Sesli moderasyon: `vmute` · `allmute` · `allmove`.

**📝 Kayıt sistemi**
Erkek/kadın kayıt, otorol, kayıtsız rolü, yaş sorgusu. **Sese girince yetkili çağırma** (karşılama botları kayıt sesini dinler) ve karşılama kartı.

**💰 Ekonomi & Seviye**
Coin ekonomisi, günlük ödül, market, mini oyunlar (`slot` · `yazitura` · `tahmin`), mesaj/ses XP'si ve **kişiye özel seviye kartı** (görsel). Panelden tema/renk özelleştirme.

**🎛️ Web kontrol paneli**
Botla birlikte gelen, sıfır-bağımlılık gömülü panel. Discord ile giriş, tüm ayarlar + liste yönetimi (oto-cevap, rol menüleri, market, sayaçlar…) ve **istatistik dashboard'u**.

**🤖 Çok-bot (Capella tarzı)**
Ayrı koruma botları (yükü paylaşır), karşılama botları ve seste duran süs botları. `.env`'de isimli satırlarla kolay kurulum, ses kanalları panelden yönetilir.

**🎫 Ticket · 🎉 Çekiliş · 📊 İstatistik**
HTML transcript'li ticket sistemi, `cek` ile çekiliş, davet takibi (`davettop`), en aktif yazı/ses kanalları ve haftalık rapor.

**🧩 Özelleştirme**
Özel komutlar, oto-cevap, tepki/emoji rolleri, geçici ses odaları, sayaç kanalları, doğum günü & boost kutlama, başvuru/whitelist formu, **panik/lockdown** modu ve **toplantı** komutu.

**📋 Granül loglar**
13 ayrı log kanalı (mesaj, giriş/çıkış, isim, rol, kanal, ses, ban, mute, jail, uyarı, kayıt, koruma, sunucu) — her olay yerli yerinde.

> Tüm komutlar için → **[KOMUTLAR.md](KOMUTLAR.md)**

## Ekran görüntüleri

<!-- Görselleri ekran-goruntuleri/ klasörüne bu adlarla koy; yorumları aç -->
<!-- ![Web paneli](ekran-goruntuleri/panel.png) -->
<!-- ![Panel — ayarlar](ekran-goruntuleri/panel-ayarlar.png) -->
<!-- ![Koruma — Discord içi](ekran-goruntuleri/koruma.png) -->
<!-- ![Seviye kartı](ekran-goruntuleri/seviye-kart.png) -->
<!-- ![Ticket transcript](ekran-goruntuleri/ticket.png) -->
<!-- ![Loglar](ekran-goruntuleri/loglar.png) -->

_Ekran görüntüleri yakında._ <!-- görselleri ekledikten sonra bu satırı sil -->

## Komutlar

90+ komut, hem slash (`/`) hem `!` ön ekiyle. Birkaç örnek:

| Komut | Ne yapar |
|---|---|
| `/kurulum` | Sunucuyu tek yerden ayarla (log, kayıt, ceza…) |
| `/ban` · `/mute` · `/jail` | Moderasyon aksiyonları |
| `/kayit` | Üye kaydı (otorol + yaş) |
| `/cek` | Çekiliş başlat |
| `/seviyetop` · `/davettop` | Sıralamalar |
| `/panik` | Lockdown / acil kilit |
| `/toplanti` | Yetkilileri toplantıya çağır |

Tam liste: **[KOMUTLAR.md](KOMUTLAR.md)**

## Kod kalitesi

Tek komut tanımı hem slash hem `!` ön ek olarak çalışır — ortak bir `Ctx` soyutlaması argümanları iki tarafta da aynı şekilde okur:

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
    return ctx.reply({
      embeds: [embed(COLOR.blue).setAuthor({ name: user.username }).setImage(url)],
    });
  },
};
```

Mimari kısaca: sunucu başına ayarlar (deep-merge JSON), şema tabanlı panel form motoru, denetim-kaydı tabanlı koruma, `@discordjs/voice` ile seste duran botlar. Kod TypeScript, `better-sqlite3` ile yerel veritabanı, sıfır dış servis bağımlılığı.

Daha fazla örnek → **[ornek-kod/](ornek-kod/)**

## Kurulum & teslim

Anahtar teslim: kurulumu birlikte yaparız, bot **senin VPS'inde** çalışır, kaynağı sende durur. Node.js 22 + `npm install` + `npm run build`, 7/24 için pm2. Detaylı kurulum rehberi teslim paketinde (`KURULUM.txt`).

- Tek sunucu = tek kopya = tek VPS
- Veriler ve token tamamen sende (gömülü SQLite, dış servis yok)
- Türkiye'den barındırmaya uygun (yerleşik DNS aşımı)

## Satın alma / İletişim

Fiyat ve paketler için iletişime geç — sunucunun büyüklüğüne göre satış veya aylık kiralama.

- **Discord sunucusu:** https://discord.gg/azt
- **Discord DM:** `reazgan0511`
- **GitHub:** [github.com/ReazGan](https://github.com/ReazGan)

## Lisans

© reazgan. Tüm hakları saklıdır. Bu depodaki içerik ve örnek kod yalnızca tanıtım amaçlıdır; izinsiz kullanılamaz, kopyalanamaz, satılamaz veya dağıtılamaz. Botun kullanımı satın alma/kiralama sözleşmesine tabidir. Ayrıntı: [LICENSE](LICENSE).

---

# Nöbetçi — Discord Protection & Management Bot _(English)_

> A **multi-server** protection, moderation, registration, economy and **web-panel** Discord bot built for Turkish communities and FiveM servers. Runs entirely on your own VPS.

**Author:** [reazgan](https://github.com/ReazGan) · discord.js 14 · TypeScript · better-sqlite3

Nöbetçi combines anti-raid protection, moderation, member registration, economy/leveling, tickets and giveaways in **one bot**. Everything is configurable from Discord commands *and* an embedded **web panel** (Discord login). For large servers it supports a Capella-style **multi-bot** setup (separate guard, welcome and voice-idle bots).

> This repository is a **showcase.** The bot's full source code is proprietary and not published here. See features, screenshots, the command list and sample code above. To buy or try it, [get in touch](#purchase--contact).

**Highlights**
- **Protection (anti-raid / anti-nuke):** channel/role deletion, mass ban/kick, unauthorized bot joins and permission-grant protection — audit-log based, real time, with a safe list.
- **Moderation:** ban, kick, role-based chat-mute, jail, warnings/penalty points, records, plus voice moderation.
- **Registration:** male/female registration, autorole, age prompt, and voice-based staff calling with welcome cards.
- **Economy & leveling:** coins, daily rewards, shop, mini-games, message/voice XP and per-user **level cards**.
- **Web panel:** zero-dependency embedded panel with Discord login, full settings + list management and a stats dashboard.
- **Multi-bot (Capella-style):** separate guard/welcome/voice-idle bots, configured via named `.env` lines and the panel.
- **Tickets, giveaways, invite tracking, granular logging** (13 dedicated log channels), custom commands, auto-replies, reaction roles, temp voice rooms, panic/lockdown and a meeting command.

**Delivery.** Turnkey: set up together, runs on **your VPS**, source stays with you. Node.js 22 + `npm install` + `npm run build`, pm2 for 24/7. Single server = single copy = single VPS.

**Purchase / Contact.** Pricing on request (one-time purchase or monthly rental).
Discord: https://discord.gg/azt · DM: `reazgan0511` · GitHub: [github.com/ReazGan](https://github.com/ReazGan)

**License.** © reazgan. All rights reserved. Showcase only; the sample code may not be used, copied, sold or redistributed. See [LICENSE](LICENSE).
