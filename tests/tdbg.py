import asyncio,os,sys
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch();pg=await b.new_page()
    await pg.goto('file://'+os.path.abspath('index.html'));await pg.wait_for_timeout(1000)
    print(await pg.evaluate(sys.argv[1]))
    await b.close()
asyncio.run(main())
