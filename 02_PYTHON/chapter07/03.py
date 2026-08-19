# 실행 전, 4번째 라인인 'total += i' 왼쪽 공간을 클릭하여 빨간색 중단점(Breakpoint)을 설정합니다.
def accumulate_data():
    total = 0
    for i in range(1, 4):
        total += i  # [● 중단점 설정 위치 - 코드 왼쪽 여백 클릭]
    return total

# 셀 실행 버튼 옆의 드롭다운을 눌러 'Debug Cell'을 선택하여 디버거를 실행합니다.
final_result = accumulate_data()
print(f"최종 합계: {final_result}")