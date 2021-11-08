import requests

request_url = "https://openapi.naver.com/v1/papago/n2mt"  # 고정

headers = {
    "X-Naver-Client-Id": "LDk_gpt29WzQuVaOFwMT",  # 클라이언트 아이디
    "X-Naver-Client-Secret": "aUUPJp9IPj"  # 클라이언트 시크릿
}

text = "난 탈덕할때 굿즈파는 사람들이 제일 부러워 ㅋㅋㅋ"  # 번역할 문장

data = {"source": "ko",  # 번역 설정: 입력한 언어/바꿀 언어/내용
        "target": "en",
        "text": text
        }

response = requests.post(request_url, headers=headers, data=data)  # 고정
result = response.json()

print(result['message']['result']['translatedText'])  # 번역 결과만을 출력
