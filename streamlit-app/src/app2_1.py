import streamlit as st

st.header("1. 기본 버튼")

if st.button("클릭!"):
    st.write("클릭 되었습니다!")

st.header("2. 다운로드 버튼")

text = "다운로드된 텍스트 파일의 내용입니다."

st.download_button(
    label="다운로드",
    data=text,
    file_name="test.txt"
)

st.header("3. 체크박스")

apple = st.checkbox("사과")
orange = st.checkbox("오렌지")

st.write(f"사과 선택: {apple}")
st.write(f"오렌지 선택: {orange}")

st.header("4. 라디오 버튼")

choice = st.radio("좋아하는 과일은?",
                  ["사과", "오렌지", "바나나"])

st.write(f"선택한 과일은? {choice}")

st.header("5. 셀렉트 박스")
choice2 = st.selectbox("좋아하는 과일은?",
                  ["사과", "오렌지", "바나나"])

st.write(f"선택한 과일은? {choice2}")

choice3 = st.multiselect("좋아하는 과일은?",
                  ["사과", "오렌지", "바나나"])

st.write(f"선택한 과일은? {choice3}")

st.header("6. 토클 스위치")

on = st.toggle("다크 모드 켜기")

if on: 
    st.write("다크모드 활성화!")
