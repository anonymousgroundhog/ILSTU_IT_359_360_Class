# Chapter 1: Computer Forensics — Instructor Talking Points

---

## Section 1: What is Computer Forensics?

### Key Points
- **Forensics vs. Digital Forensics** — forensics = court-admissible evidence techniques. Digital forensics expands scope beyond PCs to all digital devices (phones, IoT, wearables).
- The goal is not just finding evidence — it's preserving it so it holds up in court.
- The **scientific method** is mandatory. Guessing or shortcutting = inadmissible evidence.
- Forensics covers all 7 IT infrastructure domains — no domain is exempt from investigation.

### Activity 1 — Think-Pair-Share: "Is This Forensics?"
> **Time:** 5 min
>
> Present each scenario. Students discuss with a neighbor, then vote.
>
> | Scenario | Forensics? |
> |----------|-----------|
> | IT admin recovers deleted files for a user | Maybe |
> | Investigator images a suspect's drive after a court order | Yes |
> | Developer reads system logs to debug an app | No |
> | HR pulls email records in a harassment complaint | Maybe |
>
> **Debrief:** What separates forensic evidence collection from normal IT work? (Answer: documented procedures, chain of custody, court admissibility intent)

---

## Section 2: The Three-Stage Forensic Process

### Key Points
- **Collect → Analyze → Present** — each stage has strict requirements; failure at any stage can destroy the case.
- **Collecting:** improper collection = evidence thrown out, full stop.
- **Analyzing:** most time-consuming; approach like a puzzle — always consider alternative explanations before concluding.
- **Presenting:** translate technical findings to plain English; no jargon; court must understand.
- Expert report must be exhaustive — experts can ONLY testify on what's in it.
- Perjury is a felony. Always tell the truth, even if it hurts your case.

### Activity 2 — Case Scenario: "What Went Wrong?"
> **Time:** 8–10 min
>
> Present this fictional scenario:
>
> *An investigator seizes a laptop, powers it on to "check what's there," takes mental notes, and then hands it to the lab. At trial, opposing counsel challenges that the drive was modified after seizure. The expert witness adds verbal testimony about findings not in the report.*
>
> **Discussion questions:**
> 1. Which stage of the process was violated? (All three — collecting, analyzing chain, and presenting)
> 2. What should the investigator have done instead?
> 3. Why does verbal testimony outside the report matter legally?
>
> **Key takeaway:** Every step from seizure to courtroom must be documented and reproducible.

---

## Section 3: Federal Rules of Evidence

### Key Points
- Rules 401, 702, 703, 704, 705, 706 govern what evidence and testimony is admissible.
- **Rule 702** — expert must apply reliable methods to sufficient facts.
- Expert can opine on the *ultimate issue* (Rule 704) — not just technical facts.
- Court can appoint a neutral expert (Rule 706) — your testimony may be cross-checked.

### Activity 3 — Rule Matching Quiz (Quick Poll)
> **Time:** 5 min
>
> Pose each scenario verbally or on a slide. Students call out or hold up the rule number.
>
> - "The investigator testifies whether the defendant is guilty based on file evidence." → Rule 704
> - "Judge questions whether the forensic tool used is reliable science." → Rule 702
> - "Expert bases opinion on data not directly admissible but standard in the field." → Rule 703
> - "Evidence makes it more probable that files were deleted intentionally." → Rule 401
>
> **Debrief:** These rules aren't just legal formalities — they're why forensic methodology must be rigorous from day one.

---

## Section 4: Who Uses Digital Forensics?

### Key Points
- Wider than most students expect: military, federal agencies, law firms, insurance, corporations, individuals.
- Civil cases (divorce, wrongful termination) are just as common as criminal cases.
- Private firms and corporations conduct internal investigations that never go to court — but same standards apply.

### Activity 4 — "Who Calls the Forensic Investigator?" Brainstorm
> **Time:** 5 min
>
> Ask students: *Name a real-world situation where each sector might need digital forensics.*
>
> Fill in a class-generated table on the board (or collaborative doc):
>
> | Sector | Student-Generated Scenario |
> |--------|---------------------------|
> | Military | |
> | Corporation | |
> | Individual | |
> | Insurance Company | |
>
> **Prompt if stuck:** "What happened to [famous real case] — who would have called a forensic investigator?"
>
> **Key takeaway:** Digital forensics is not just law enforcement. Understanding the client shapes the investigation scope.

---

## Section 5: Four Types of Evidence

### Key Points
- **Real** (physical), **Documentary** (stored data), **Testimonial** (expert witness), **Demonstrative** (charts/models).
- Documentary evidence requires authentication — you must prove the data is what you claim.
- Chain of custody ties all evidence types together — break it, lose the evidence.

### Activity 5 — Evidence Sorting Cards
> **Time:** 5 min
>
> Read out evidence items; students classify verbally or via clicker response:
>
> - A hard drive found at the crime scene → Real
> - Email logs from the company mail server → Documentary
> - Investigator explains how the malware spread → Testimonial
> - A timeline diagram showing file access events → Demonstrative
> - Fingerprints on a USB drive → Real
> - Database records of financial transactions → Documentary
>
> **Follow-up:** Can one piece of evidence be multiple types? (Yes — e.g., a printed email = documentary + real object)

---

## Section 6: Scope Challenges

### Key Points
- **Volume:** modern cases involve terabytes; requires duplicate storage, robust infrastructure, strict chain of custody throughout.
- **Complexity:** must understand both technical systems and legal frameworks simultaneously.
- **Distributed crime scenes:** evidence spans jurisdictions, countries, languages; international cooperation is not optional.
- **Resource gap:** specialist demand outpaces supply; anti-forensics tools actively complicate investigations.

### Activity 6 — "Global Crime, Local Problem" Discussion
> **Time:** 5–7 min
>
> Scenario: *A ransomware attack hits a US hospital. The attacker's C2 server is in Country A, the money flows through Country B, and the malware was compiled in Country C — all with different extradition treaties.*
>
> **Questions:**
> 1. Where does the investigation start?
> 2. Which jurisdictions must cooperate?
> 3. What happens if one country refuses?
>
> **Key takeaway:** Jurisdictional complexity is one reason digital forensics cases drag on for years.

---

## Section 7: Hardware Knowledge

### Key Points
- CompTIA A+ baseline minimum for hardware understanding.
- **Volatile vs. nonvolatile memory** — critical distinction for live forensics.
  - RAM: volatile, loses data on power-off → must capture LIVE.
  - EEPROM/ROM: nonvolatile, survives power-off.
- **Slack space** on HDDs = hiding spot for data; SSDs + wear leveling make this less reliable.
- Forensic implications differ between HDDs and SSDs — don't assume the same techniques apply.

### Activity 7 — Volatile Memory Decision Drill
> **Time:** 5 min
>
> *You arrive at a scene. The suspect's computer is running. You see encrypted chat software open on screen.*
>
> **Ask:** What do you do — pull the plug or capture first?
>
> **Discussion:** 
> - Pulling plug → lose RAM contents (encryption keys, active sessions, running processes).
> - Capturing live → risk of triggering anti-forensic scripts.
> - Right answer: depends on case, but live capture is usually preferred when encryption is active.
>
> **Key takeaway:** Volatility order determines evidence priority. RAM first.

---

## Section 8: Software & File Systems

### Key Points
- File extensions lie — trust file headers (magic bytes), not the extension.
- Windows Registry = goldmine for investigator evidence (settings, recently accessed files, USB history).
- Kali Linux = primary forensics/security distro; most tools are free and open-source.
- Journaling file systems log transactions — physical journaling logs every block; logical journals only metadata.
- Different OS = different file system = different forensic approach (NTFS vs. EXT4 vs. APFS).

### Activity 8 — "Trust the Header, Not the Extension" Demo
> **Time:** 5 min
>
> Conceptual demo (or show hex output if tools available):
>
> - Rename a `.jpg` to `.txt`. Open it. What happens?
> - Ask: "What does a forensic tool do when it sees `.txt` but detects JPEG magic bytes (`FF D8 FF`)?"
> - Introduce concept of file carving — recovering files by header/footer regardless of extension or file system metadata.
>
> **Key takeaway:** File carving bypasses the file system entirely — critical for deleted file recovery.

---

## Section 9: Networks

### Key Points
- Data **at rest** vs. **in motion** — different legal frameworks, different collection techniques.
- Need OSI model fluency — especially Layers 1 (physical), 2 (MAC), 3 (IP), 4 (TCP/UDP).
- MAC addresses can be spoofed — don't build a case on MAC alone.
- IP addresses are logical and easily changed — corroborate with logs from multiple sources.
- Know your common ports — they tell you what services were running and what data was likely transferred.
- `tracert`/`traceroute` useful for troubleshooting; NOT reliable for forensic attribution.

### Activity 9 — Port → Protocol Inference
> **Time:** 5 min
>
> Show students network log snippets with destination ports. Ask what likely happened:
>
> | Destination Port | What was the user doing? |
> |-----------------|--------------------------|
> | 443 | Encrypted web browsing |
> | 25 | Sending email |
> | 22 | SSH — remote access or file transfer |
> | 6881–6889 | BitTorrent (file sharing) |
> | 23 | Telnet — unencrypted, suspicious on modern network |
>
> **Debrief:** Port analysis is often the first step in network forensics — it narrows scope before deeper packet analysis.

---

## Section 10: Obscured Info & Anti-Forensics

### Key Points
- Encryption, steganography, compression, and proprietary formats all hinder investigation.
- **Anti-forensics is intentional** — criminals use forensic-like tools to destroy evidence.
- Log destruction, overwriting free space, hidden partitions, fake file extensions = active obstruction.
- Countermeasure: live acquisition when encryption is active; document everything before touching the system.

### Activity 10 — "Spot the Anti-Forensic Technique"
> **Time:** 5 min
>
> Read each investigator finding. Students identify which anti-forensic technique was used:
>
> - Logs stop abruptly 3 hours before the incident. → Log destruction
> - Image file opens normally but contains hidden ZIP inside. → Steganography
> - Drive appears empty, but sector analysis shows overwritten data. → Free space wiping
> - File labeled `report.docx` but header shows it's an executable. → Misleading file extension
> - Entire partition is missing from the partition table. → Hidden partition
>
> **Key takeaway:** Recognizing anti-forensic artifacts is itself forensic evidence of intent.

---

## Section 11: The Daubert Standard

### Key Points
- Judges — not juries — decide if expert testimony is admissible under Daubert.
- Five factors: testability, peer review, known error rates, established standards, general acceptance.
- "Junk science" = testimony that fails Daubert → excluded from trial.
- For digital forensics: use widely-accepted tools, document everything, maintain chain of custody.

### Activity 11 — "Daubert or Dumpster?" Judgment Calls
> **Time:** 5 min
>
> Students vote: would this testimony survive Daubert challenge?
>
> - "I used EnCase to image the drive, verified with MD5 hash, and the tool is industry standard." → Passes
> - "I can tell from the file timestamps that the defendant was at the computer at 9pm." → Questionable (timestamps easily manipulated — needs corroboration)
> - "My gut says these files were planted because they look too clean." → Fails
> - "Recovery rate for this carving method is published at 94% in peer-reviewed literature." → Passes
>
> **Key takeaway:** Every forensic opinion must survive the question: "Can you prove your method is scientifically valid?"

---

## Section 12: US Laws & Federal Guidelines

### Key Points
- Many laws intersect with digital forensics — ECPA, PATRIOT Act, CALEA, SOX, COPPA, DMCA.
- **4th Amendment** applies — warrants required unless: plain sight, consent, border crossing, imminent destruction.
- Consent must come from the *right person* and stay within *scope*.
- FBI: back up everything, work from copies only, activate auditing before touching the system.
- Secret Service golden rule: if computer is off, leave it off. If on, document screen state before shutdown.
- RCFL = regional labs funded by FBI — primary support network for state/local agencies.

### Activity 12 — Warrant Scenario Decisions
> **Time:** 8 min (small groups)
>
> Groups of 3–4. Each group gets one scenario — do they need a warrant?
>
> 1. Suspect's laptop left unlocked at a crime scene, screen visible to officers.
> 2. Company asks investigator to examine employee's work-issued computer.
> 3. Border agents want to search a traveler's phone at customs.
> 4. Investigator discovers CP while executing an identity theft warrant.
> 5. Investigator wants to access the suspect's personal Dropbox account.
>
> **Answers:**
> 1. Plain view doctrine may apply — depends on jurisdiction
> 2. No warrant needed — employer owns device (within policy scope)
> 3. No warrant — border search exception
> 4. Admissible — within scope of FTK use under existing warrant (US v. Schlingloff)
> 5. Warrant required — stored communications, 3rd party
>
> **Key takeaway:** Legal authority determines what evidence is usable. Get it wrong → case dismissed.

---

## General Discussion Prompts (Use Anytime)

- "What would you do differently if you knew every step would be scrutinized in court?"
- "Why do you think the Daubert standard was created? What problem was it solving?"
- "Name a technology from the last 5 years that created new forensic challenges."
- "Where do you think the biggest resource gap is — training, tools, or law?"

---

*Instructor note: Activities are modular — skip or compress based on time. Prioritize Activities 2 (process), 7 (volatility), and 12 (warrants) as highest-impact for student understanding.*
