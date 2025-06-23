from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command

bot = Bot(token="7558413069:AAGC0nScvc7hv6VipJltR9Jm_9JzPkHqHuo")
dp = Dispatcher()

@dp.message(Command(commands=["start"]))
async def start(message: types.Message):
    await message.answer("hi")
dp.run_polling(bot)