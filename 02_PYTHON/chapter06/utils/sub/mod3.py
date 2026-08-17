#from chapter06.mod1 import VERSION  # 모듈이 있는 전체 경로로 접근
from mod1 import VERSION
from utils.sub.test2 import TEST

def divide(num1, num2):
    return num1 / num2


def print_version():
    print("프로그램 버전:", VERSION)