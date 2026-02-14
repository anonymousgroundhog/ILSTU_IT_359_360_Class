import requests

API_key= "PASTE KEY HERE"
model="translategemma:latest"

def chat_with_model(token):
    url = 'http://sushi.it.ilstu.edu:8080/api/chat/completions'
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    data = {
      "model": model,
      "messages": [
        {
          "role": "user",
          "content": "Why is the sky blue?"
        }
      ]
    }
    response = requests.post(url, headers=headers, json=data)
    return response.json()

print(chat_with_model(API_key)['choices'][0]['message']['content'])
