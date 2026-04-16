# Intro to Red Teaming — Lab Report Grading Rubric

**Course:** IT 359: Tools and Techniques in Penetration Testing  
**Format:** Consolidated Penetration Test Report (Sections 1–3, PurpleSec template)  
**Total Points:** 100 (15 labs × 6 pts + 10 pts quality)

---

## Covered Labs

This rubric applies to each of the following 15 HTB machines in the Intro Red Teaming track. Students submit one consolidated report covering all labs.

| # | Machine | Points |
|---|---------|--------|
| 1 | Administrator | 6 |
| 2 | BoardLight | 6 |
| 3 | Cap | 6 |
| 4 | Certified | 6 |
| 5 | Cicada | 6 |
| 6 | DevvTorex | 6 |
| 7 | Driver | 6 |
| 8 | GoodGames | 6 |
| 9 | Jerry | 6 |
| 10 | Paper | 6 |
| 11 | Precious | 6 |
| 12 | Sau | 6 |
| 13 | SteamCloud | 6 |
| 14 | TwoMillion | 6 |
| 15 | Writeup | 6 |
| — | Report Quality & Professionalism | 10 |
| **Total** | | **100** |

---

## Per-Lab Grading (6 pts each)

Each lab section must cover Sections 1–3 of the PurpleSec report template. Section 1.3 requires a CVSS score and MITRE ATT&CK Navigator layer for each vulnerability found on that box.

| Score | Criteria |
|-------|----------|
| 6 | All three sections present and complete. **Section 1:** Overview, outcomes, risk rating (CVSS + ATT&CK Navigator), and prioritized recommendations all addressed. **Section 2:** Scope and methodology clearly defined (target IP/hostname, services, assessment type). **Section 3:** Recon activities documented with tool output; full exploitation chain covered (vuln → tool → access → post-exploit) with screenshots. CVSS metrics justified per vulnerability. ATT&CK Navigator layer accurately maps techniques to tactics. |
| 5 | All three sections present. Minor gaps: one subsection thin or one CVSS metric unjustified or ATT&CK layer missing 1–2 techniques. |
| 3 | Two of three sections substantially complete. OR all three present but CVSS and ATT&CK Navigator both notably incomplete/inaccurate. Exploitation chain missing post-exploitation detail. |
| 1 | Only one section present, or all three sections are superficial/placeholder with little technical substance. |
| 0 | Lab missing entirely from report. |

---

## Report Quality & Professionalism (10 pts)

Assessed once across the full consolidated report.

| Score | Criteria |
|-------|----------|
| 9–10 | Consistent formatting throughout. Professional language. Section structure followed for all 15 labs. Screenshots labeled and legible. No significant grammar/spelling errors. Report reads as a coherent professional document. |
| 7–8 | Generally professional. Minor inconsistencies in formatting or language across labs. Structure mostly followed. |
| 5–6 | Noticeable formatting inconsistencies or grammar issues. Structure not consistently followed across labs. |
| 1–4 | Report disorganized or unprofessional. Difficult to follow. |
| 0 | Not submitted in report format. |

---

## Notes for Graders

- **CVSS:** Use [NVD CVSS Calculator](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator) or [FIRST CVSS Calculator](https://www.first.org/cvss/calculator/3.1). Students must show individual metric selections (AV, AC, PR, UI, S, C, I, A) — not just a final score.
- **ATT&CK Navigator:** Students must export a `.json` layer file and include a link or screenshot of the navigator view. Evaluate against actual techniques used for each specific HTB box.
- **Screenshots:** Must be legible and directly relevant. Cropped and annotated preferred.
- **Deductions:** Up to 5 pts deducted for submission not in Markdown or PDF format, or for late submission per syllabus policy.
