import httpx
import asyncio

async def get_post(num):
    async with httpx.AsyncClient() as client:
        url = f"https://jsonplaceholder.typicode.com/posts/{num}"

        res = await client.get(url)
        result = res.json()

        return result['id'], result['title']


# async def main():
#     for i in range(1, 11):
#         result = await get_post(i)
#         print(result)

async def main():
    get_posts = [get_post(i) for i in range(1, 11)]

    results = await asyncio.gather(*get_posts)
    print(results)


asyncio.run(main())
