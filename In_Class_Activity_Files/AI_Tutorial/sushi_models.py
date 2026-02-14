import requests, json
from requests.exceptions import ConnectionError

url = "http://sushi.it.ilstu.edu:8080/api/models"
headers = {"Authorization": "Bearer PASTE KEY HERE"}

try:
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    # Pretty print to a string with 4 spaces of indentation
    pretty_json_string = json.dumps(response.json(), indent=4)
    json_dict = json.loads(pretty_json_string)
    #print(json_dict['data'])
    for item in json_dict['data']:
        print(item['id'])

except ConnectionError:
    print("❌ Connection Error: Are you connected to the ISU VPN or isunet?")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
