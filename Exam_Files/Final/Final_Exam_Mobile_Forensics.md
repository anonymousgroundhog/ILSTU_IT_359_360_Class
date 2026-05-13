# Final Exam: Mobile Forensic Investigation & Disaster Recovery

**Course:** Digital Forensics  
**Total Points:** 150

---

## Part 1: Technical Investigation (75 Points)

**Objective:** Perform static and dynamic analysis on the provided *Fruits Coloring Book APK* to uncover its underlying malicious functionality.

### Task 1: Static Analysis (37.5 Points)
Using tools such as `apktool` or `Ghidra`, and utilizing VirusTotal for reputation scanning, complete the following:

1.  **Permissions Scrutiny (15 pts):** Identify three "dangerous" permissions requested by the app (e.g., `RECEIVE_SMS` or `READ_SMS`). Explain how these are used by the Joker malware family to intercept one-time passwords (OTPs) for premium subscriptions.
2.  **Manifest & Code Review (12.5 pts):** Locate and decompile the `AndroidManifest.xml` using `apktool`. Identify the Main Activity and any hidden WebViews used to silently load background "Offer Pages".
3.  **Hardcoded Indicators (10 pts):** Extract any embedded IP addresses, URLs, or API keys found in the code using Ghidra or by grepping decompiled files. Use VirusTotal to check these indicators against known malicious C2 infrastructure.

### Task 2: Dynamic Analysis (37.5 Points)
Using a sandbox Android emulator and a proxy tool like Burp Suite or HTTP Toolkit, perform the following:

1.  **Network Behavior (20 pts):** Capture and analyze traffic to identify if the app contacts external ad-fraud servers or Command & Control (C2) domains.
2.  **Data Exfiltration (17.5 pts):** Identify if the app attempts to siphon device metadata, local files, or contact lists.

---

## Part 2: The Incident Scenario

An executive inadvertently installed the *Fruits Coloring Book APK* on a corporate-managed tablet. The app successfully bypassed basic filters and executed the following:

* **Credential Theft:** Scraped saved browser sessions to steal session cookies.
* **Financial Breach:** Subscribed the corporate account to thousands of dollars in premium SMS services.
* **Lateral Movement:** Used stolen OAuth tokens to access corporate cloud storage, resulting in the encryption of 40% of the firm's active project files (Ransomware pivot).

---

## Part 3: Disaster Recovery Plan (DRP) (75 Points)

**Objective:** Draft a Disaster Recovery Plan (DRP) to restore business continuity and remediate the breach.

### Pillar 1: Emergency Response & Containment (15 Points)
* Detail the steps required to isolate infected mobile devices via EDR or network disabling.
* Outline the immediate actions to revoke compromised OAuth tokens and Active Directory (AD) passwords.

### Pillar 2: Recovery Strategy (22.5 Points)
* **RTO & RPO:** Define a realistic Recovery Time Objective (how fast to be back up) and Recovery Point Objective (acceptable data loss) for the encrypted files.
* **Restoration:** Detail the process for restoring cloud data from immutable backups that cannot be encrypted by ransomware.

### Pillar 3: Forensic Integration (15 Points)
* Explain how findings from Part 1 (C2 IPs, file hashes verified via VirusTotal) will be used to update EDR Watchlists to prevent re-infection during recovery.

### Pillar 4: Communication Plan (7.5 Points)
* Draft an internal memo regarding the dangers of side-loading APKs.
* Draft a formal notification for stakeholders regarding the service interruption.

### Professionalism & Logic (15 Points)
* **RTO/RPO Realism (7.5 pts):** Ensure goals align with the 40% data loss scenario.
* **Documentation (7.5 pts):** Use correct forensic terminology and a clear technical report format.

---

## Point Summary

| Component | Weight | Points |
| :--- | :--- | :--- |
| Static Analysis | 25% | 37.5 |
| Dynamic Analysis | 25% | 37.5 |
| DRP Strategy | 30% | 45.0 |
| RTO/RPO Logic | 10% | 15.0 |
| Professionalism | 10% | 15.0 |
| **Total** | **100%** | **150** |
