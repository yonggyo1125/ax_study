from db import supabase
from users import Users
from dataclasses import dataclass, asdict

# 로그인 처리 먼저
user = Users()
user.sign_in("user03@test.org", "password1234")

@dataclass(kw_only=True)
class OrderItemRequest:
    product_id: str
    quantity: int = 1

@dataclass(kw_only=True)
class OrderRequest:
    p_order_name: str 
    p_order_email: str
    p_order_phone: str
    p_receiver_name: str
    p_receiver_phone: str
    p_zipcode: str
    p_address: str
    p_address_sub: str
    p_delivery_memo: str
    p_user_id: str = None
    p_items: list[OrderItemRequest]


class Orders:
    def __init__(self):
        self.user = user.get_my_info()

    def order(self, data: OrderRequest) -> str:
        # 주문 가능여부 확인
        self.check_orderable()

        order_data = asdict(data)
        order_data['p_user_id'] = self.user['id']
        res = supabase.rpc("create_order_transaction", order_data).execute()

        return res.data['order_no'] if res and res.data else None

    # 로그인 상태, type - BUYER
    def check_orderable(self):
        if not self.user and self.user['type'] != 'BUYER':
            raise PermissionError("주문은 구매자 회원만 가능합니다.") 


if __name__ == "__main__":
    order_items = [
        OrderItemRequest(product_id="11111111-1111-1111-1111-111111111111"),
        OrderItemRequest(product_id="22222222-2222-2222-2222-222222222222", quantity=2)
    ]

    data = OrderRequest(
        p_order_name="홍길동",
        p_order_email="hong@example.com",
        p_order_phone="010-1234-5678",
        p_receiver_name="이순신",
        p_receiver_phone="010-9876-5432",
        p_zipcode="06234",
        p_address="서울시 강남구 테헤란로 123",
        p_address_sub="7층",
        p_delivery_memo="문 앞에 놓아주세요.",
        p_items=order_items
    )

    order = Orders()
    print(order.order(data))
