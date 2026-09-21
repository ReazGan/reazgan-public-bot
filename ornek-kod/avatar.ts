/*
 * Nöbetçi · github.com/ReazGan
 * Tek tanım; hem /avatar hem !avatar olarak çalışır.
 */
import { COLOR, embed } from '../lib/embeds';
import type { HybridCommand } from '../types';

const CAT = 'Bilgi';

export const avatar: HybridCommand = {
  kind: 'hybrid',
  name: 'avatar',
  aliases: ['av', 'pp'],
  category: CAT,
  description: 'Üyenin avatarını gösterir',
  options: [{ type: 'user', name: 'uye', description: 'Üye (boşsa sen)' }],

  async run(ctx) {
    // ctx.userOpt hem slash seçeneğini hem de "!avatar @kişi" argümanını okur
    const user = ctx.userOpt('uye') ?? ctx.user;
    const url = user.displayAvatarURL({ size: 1024 });

    return ctx.reply({
      embeds: [
        embed(COLOR.blue)
          .setAuthor({ name: user.username, iconURL: url })
          .setDescription(
            `[png](${user.displayAvatarURL({ extension: 'png', size: 1024 })}) · ` +
              `[webp](${user.displayAvatarURL({ extension: 'webp', size: 1024 })})`,
          )
          .setImage(url),
      ],
    });
  },
};
