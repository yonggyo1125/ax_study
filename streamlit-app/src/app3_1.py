import streamlit as st
import pandas as pd

chart_data = pd.DataFrame({
    "온도": [22, 24, 21, 26, 23]
})

st.header("1. 선 차트")
st.line_chart(chart_data)

st.header("2. 막대 차트")
st.bar_chart(chart_data)

chart_data2 = pd.DataFrame({
    '키': [150, 160, 170, 178, 180],
    '몸무게': [40, 50, 60, 70, 78]
})

st.header("3. 영역 차트")
st.area_chart(chart_data2)

st.header("4. 산점도 차트")
st.scatter_chart(chart_data2)

st.header("5. 지도")

map_data = pd.DataFrame({
    "lat": [37.5665, 37.5511, 37.5110],
    "lon": [126.9780, 126.9882, 127.0590]
})

st.map(map_data)