from scapy.all import rdpcap, IP, TCP, UDP
import requests
import json

def analyze_pcap_with_scapy(file_path, token, model_name):
    # 1. Load the PCAP file using Scapy
    packets = rdpcap(file_path)
    
    # 2. Extract meaningful text summary (First 50 packets to avoid token limits)
    summary_lines = []
    for i, pkt in enumerate(packets[:50]): 
        if pkt.haslayer(IP):
            src = pkt[IP].src
            dst = pkt[IP].dst
            proto = "TCP" if pkt.haslayer(TCP) else "UDP" if pkt.haslayer(UDP) else "Other"
            summary_lines.append(f"Packet {i}: {src} -> {dst} | Protocol: {proto}")

    packet_summary = "\n".join(summary_lines)

    # 3. Prepare the API Request
    url = 'http://sushi.it.ilstu.edu:8080/api/chat/completions'
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    
    data = {
        "model": model_name,
        "messages": [
            {
                "role": "user",
                "content": f"Analyze these network packets for suspicious MintsLoader activity:\n{packet_summary}"
            }
        ]
    }

    # 4. Send to Model
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        return response.json()['choices'][0]['message']['content']
    else:
        return f"Error: {response.status_code} - {response.text}"

# Configuration
API_key = "PASTE KEY HERE"
file_path = "/home/sean/Downloads/2026-02-02-KongTuke-activity-for-MintsLoader-and-GhostWeaver-RAT.pcap"

print(analyze_pcap_with_scapy(file_path, API_key, "translategemma:latest"))
