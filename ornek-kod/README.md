# Örnek kod

Bu klasör, botun **kod kalitesini ve mimarisini** göstermek için paylaşılan
küçük, güvenli örnekler içerir. Botun tam kaynak kodu **satışa/kiralamaya
özeldir ve bu depoda yer almaz.**

| Dosya | Ne gösterir |
|---|---|
| [`hybrid-command.ts`](hybrid-command.ts) | Slash (`/`) + ön ek (`!`) komutlarını tek yerde birleştiren `Ctx` mimarisi |
| [`avatar.ts`](avatar.ts) | Bu mimariyi kullanan gerçek, çalışan bir komut örneği |

Bilinçli olarak **paylaşılmayanlar:** anti-raid/anti-nuke koruma motoru,
web kontrol paneli, çok-bot (Capella tarzı) yönetimi, ekonomi/seviye ve
veritabanı katmanı. Bunlar ürünün değerli kısmıdır ve teslim edilen
kaynak kodunda bulunur.

> Kod, TypeScript + discord.js 14 ile yazılmıştır; dış servis bağımlılığı
> yoktur (yerel `better-sqlite3`). Tam sürümü görmek/denemek için:
> Discord https://discord.gg/azt · DM `reazgan0511`
