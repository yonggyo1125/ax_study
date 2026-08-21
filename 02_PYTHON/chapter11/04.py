import asyncio

async def work():
    await asyncio.sleep(2)
    print("작업 완료")


asyncio.run(work()) # 이벤트 루프 생성 -> 실행