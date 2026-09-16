import streamlit as st

st.header("1. 한줄 텍스트 입력")

name = st.text_input("당신의 이름은?", placeholder="이름")

if name:
    st.write(f"반갑습니다. {name}님!")

st.header("2. 여러줄 텍스트 입력")

feedback = st.text_area(
    "서비스에 대한 의견을 자유롭게 작성하세요.",
    placeholder="글 입력..."                    
)

if feedback:
    st.write("소중한 의견 감사합니다.")
    st.write(feedback)

st.header("3. 숫자 입력")

age = st.number_input(
    "나이는?",
    min_value=0,
    max_value=120
)

st.write(f"입력한 나이: {age}")

st.header("4. 슬라이더")
volume = st.slider("음량을 조정하세요.", 0, 100, 50)

st.write(f"현재 볼륨은 {volume}%")

st.header("5. 슬라이더로 요소 선택")

value = st.select_slider(
    "만족도",
    options=['나쁨', "보통", "좋음"]
)

st.write(f"만족도: {value}")