import requests
url = 'http://localhost:5001/api/predict'

test_cases = [
    {'champion': 'Ahri', 'individualPosition': 'MID'},
    {'champion': 'Yasuo', 'individualPosition': 'TOP'},
    {'champion': 'Lux', 'individualPosition': 'MID'},
    {'champion': 'Riven', 'individualPosition': 'TOP'},
    {'champion': 'Ezreal', 'individualPosition': 'BOTTOM'},
    {'champion': 'Zed', 'individualPosition': 'JUNGLE'},
    {'champion': 'Garen', 'individualPosition': 'TOP'}
]

for case in test_cases:
    response = requests.post(url, json=case)
    print(f"Input: {case} | Predição: {response.json()}")