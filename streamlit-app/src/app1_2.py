import streamlit as st

st.title("대 제목")
st.header("주 제목")
st.subheader("하위 제목")

st.divider()

st.caption("설명...") 

st.code("""
def sum(num1: int, num2: int) -> int:
    return sum1 + num2
""")