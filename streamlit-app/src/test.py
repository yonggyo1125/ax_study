import streamlit as st

st.title("제목")
st.header("대제목")
st.subheader("하위 제목")

audio = st.audio_input("노래한번?")
if audio:
    st.audio(audio)


file = st.file_uploader("파일 업로드", type=["png"])
if file:
    st.image(file)