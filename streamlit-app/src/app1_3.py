import streamlit as st
import pandas as pd

st.title("데이터 대시보드")

st.header("1. 오늘의 핵심 지표")

st.metric(label="오늘의 방문자 수", value="1,500", delta="120명")
st.metric(label="이번 달 지출", value="450,000원", delta="-50,000원")

st.header("2. 데이터프레임")

data = {
    "이름": ["김철수", "이영희", "박지민", "최동훈", "정수진"],
    "점수": [85, 92, 78, 88, 95],
    "합격여부": ["Pass", "Pass", "Fail", "Pass", "Pass"]
}

df = pd.DataFrame(data)

# 데이터양이 많으면 스크롤바가 생성
st.dataframe(df)

st.header("3. 테이블(스크롤바 없음)")
st.table(df)

st.header("4. 수정 가능 데이터프레임")

edited_df = st.data_editor(df)
print(edited_df)

st.header("5. 딕셔너리 -> JSON")
st.json(data)