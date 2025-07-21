import { Telegraf } from 'telegraf';
import { USERS_QUEUE } from '@libs/constants';
import { CreateUserDto } from '@libs/types';

export function start() {
  const bot = new Telegraf(process.env.BOT_TOKEN || '');
  bot.start((ctx) => {
    const user: CreateUserDto = { username: ctx.from?.username || 'anon', password: '' };
    ctx.reply(`Queue: ${USERS_QUEUE}, user: ${user.username}`);
  });
  bot.launch();
  console.log('Bot started');
}

if (require.main === module) {
  start();
}
