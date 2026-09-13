from db import supabase
from dataclasses import dataclass, asdict
from typing import Literal

# 회원가입 데이터 전달용 데이터 클래스
@dataclass(kw_only=True)
class SignUp:
    email: str
    password: str
    cellphone: str
    zipcode: str = None
    address: str = None
    address_sub: str = None


# 미로그인 상태만 가능하게 제한
def guest_only(callback):
    def wrapper(*args, **kwargs):
        if args and args[0] and isinstance(args[0], Users):
            self = args[0]
            if self.is_login(): 
                raise PermissionError("로그인 상태에서는 접근할수 없습니다.")
             
        result = callback(*args, **kwargs)

        return result
    return wrapper

# 로그인 상태만 가능하게 제한
def user_only(callback):
    def wrapper(*args, **kwargs):
        if args and args[0] and isinstance(args[0], Users):
            self = args[0]
            if not self.is_login(): 
                raise PermissionError("로그인이 필요합니다.")
             
        result = callback(*args, **kwargs)

        return result
    return wrapper

class Users:
    def __init__(self):
        self.user = self.get_my_info()

    # 회원가입
    @guest_only
    def sign_up(self, data: SignUp) -> bool:
       
        in_data = asdict(data)
        del in_data['email']
        del in_data['password']

        # auth.users테이블에 가입 
        response = supabase.auth.sign_up({
            "email": data.email,
            "password": data.password
        })

        # user_details 테이블에 회원 상세 추가
        if response and response.user:
            id = response.user.id
            in_data['id'] = id
            res = (
                supabase.table("user_details")
                    .insert(in_data)
                    .execute()
            )
            if res and res.data: return True

        return False


    # 로그인
    @guest_only
    def sign_in(self, email: str, password: str) -> None:
        res = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })

        if res and res.user:
            self.user = self.get_my_info()

    # 로그아웃
    @user_only
    def sign_out(self) -> None:
        supabase.auth.sign_out()
    
    # 주소 변경
    @user_only
    def change_address(self, zipcode: str, address: str, address_sub: str):
        pass

    # 휴대전화 변경
    @user_only
    def change_cellphone(self: str, cellphone: str) -> bool:
        response = (
            supabase.table("user_details")
                .update({
                    "cellphone": cellphone
                })
                .eq("id", self.user['id'])
                .execute()
        )

        return True if response and response.data else False

    # 로그인한 회원 정보 조회
    def get_my_info(self):
        data = supabase.auth.get_user()
        if data: 
            response = (
                supabase.table("user_details")
                    .select("*")
                    .eq("id", data.user.id)
                    .is_("deleted_at", "null")
                    .maybe_single()
                    .execute()
            )
            if response and response.data:
                user = dict(response.data)
                user['email'] = data.user.email
                return user

    # 회원 목록 조회
    def get_users(self, page: int = 1, limit: int = 20, type: Literal['BUYER', 'SELLER', None] = None, keyword: str = None):
        user_select = (
                supabase.table("user_details")
                    .select("*")
            )
        if type:
            user_select.eq("type", type)

        if keyword and keyword.strip():
            keyword = keyword.strip()
            user_select.or_(
                f"cellphone.ilike.%{keyword}%,zipcode.ilike.%{keyword}%,address.ilike.%{keyword}%,address_sub.ilike.%{keyword}%"
            )

        offset = (page - 1) * limit

        response = (
                user_select
                    .offset(offset)
                    .limit(limit)
                    .execute()
            )

        return response.data if response and response.data else []
        

    # 로그인 여부
    def is_login(self) -> bool:
        return True if self.user else False





if __name__ == '__main__':
    user = Users()
    user.sign_in("user03@test.org", "password1234")
    print(user.get_users(1, 20, 'BUYER'))
    # data = user.get_my_info()
    # print(data, user.is_login())
    # data = SignUp(
    #     email="user03@test.org",
    #     password="password1234",
    #     cellphone="01010001000",
    #     zipcode="12345",
    #     address="주소1",
    #     address_sub="주소2"
    # )

    # print(user.sign_up(data))