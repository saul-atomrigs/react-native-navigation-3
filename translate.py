import requests

request_url = "https://openapi.naver.com/v1/papago/n2mt"  # 고정

headers = {
    "X-Naver-Client-Id": "LDk_gpt29WzQuVaOFwMT",  # 클라이언트 아이디
    "X-Naver-Client-Secret": "aUUPJp9IPj"  # 클라이언트 시크릿
}
# 번역할 문장
text = """[Camera with flash]  # 앳스타일12월호 #여자아이들 #미연 화보 CUT
미연이한테만 필터 낀 건가요?Shushing face
사람 이목구비가 이렇게 뚜렷할 수 있는건지 처음 알았습니다만...!Kissing face with closed eyesBeating heart
Dizzy symbol미연이 미모 감상은 앳스타일 12월호에서Love-you gesture"""

data = {"source": "ko",  # 번역 설정: 입력한 언어/바꿀 언어/내용
        "target": "en",
        "text": text
        }

response = requests.post(request_url, headers=headers, data=data)  # 고정
result = response.json()

print(result['message']['result']['translatedText'])  # 번역 결과만을 출력
