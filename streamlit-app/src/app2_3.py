import streamlit as st

# st.header("1. 카메라로 사진 찍기")

# picture = st.camera_input("사진을 찍어보아요!")

# if picture:
#     st.image(picture)

# st.header("2. 오디오 녹음")
# audio_data = st.audio_input("목소리를 남겨주세요.")

# if audio_data:
#     st.audio(audio_data)

st.header("3. 파일 업로드")
uploaded_file = st.file_uploader("이미지를 선택하세요.", type=["png", "jpg", "jpeg", "gif"])

if uploaded_file:
    st.image(uploaded_file)

st.header("4. 색상 선택")
color = st.color_picker("좋아하는 색상을 선택", "#ccc")

st.write(f"선택한 색상: {color}")