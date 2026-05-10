#!/usr/bin/env python3
"""Generate Chapter 1 slide deck (Computer Forensics Intro)."""
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

OUT = "/home/sean/Documents/Areas/Classes/ILSTU_IT_359_360_Class/Handouts/Chapter1_Slides.pptx"

NAVY = RGBColor(0x0B, 0x2A, 0x4A)
ACCENT = RGBColor(0x1E, 0x6F, 0xB8)
LIGHT = RGBColor(0xF2, 0xF6, 0xFA)
DARK = RGBColor(0x22, 0x22, 0x22)

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

BLANK = prs.slide_layouts[6]


def add_bg(slide, color=LIGHT):
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
    bg.fill.solid()
    bg.fill.fore_color.rgb = color
    bg.line.fill.background()
    bg.shadow.inherit = False
    return bg


def add_title_bar(slide, title):
    bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, Inches(1.0))
    bar.fill.solid()
    bar.fill.fore_color.rgb = NAVY
    bar.line.fill.background()
    tb = slide.shapes.add_textbox(Inches(0.5), Inches(0.2), Inches(12.3), Inches(0.7))
    tf = tb.text_frame
    tf.margin_left = tf.margin_right = 0
    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(32)
    p.font.bold = True
    p.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)


def add_footer(slide, page_num, total):
    fb = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(7.15), prs.slide_width, Inches(0.35))
    fb.fill.solid()
    fb.fill.fore_color.rgb = NAVY
    fb.line.fill.background()
    tb = slide.shapes.add_textbox(Inches(0.3), Inches(7.18), Inches(12.7), Inches(0.3))
    p = tb.text_frame.paragraphs[0]
    p.text = f"IT 359/360  •  Chapter 1: Computer Forensics  •  {page_num}/{total}"
    p.font.size = Pt(10)
    p.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)


def bullets(slide, items, left=0.6, top=1.3, width=12.1, height=5.6, size=18, indent_levels=None):
    tb = slide.shapes.add_textbox(Inches(left), Inches(top), Inches(width), Inches(height))
    tf = tb.text_frame
    tf.word_wrap = True
    for i, item in enumerate(items):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        if isinstance(item, tuple):
            text, lvl = item
        else:
            text, lvl = item, 0
        p.text = text
        p.level = lvl
        p.font.size = Pt(size - lvl * 2)
        p.font.color.rgb = DARK
        p.space_after = Pt(6)
    return tb


def title_slide(title, subtitle):
    s = prs.slides.add_slide(BLANK)
    add_bg(s, NAVY)
    tb = s.shapes.add_textbox(Inches(0.8), Inches(2.5), Inches(11.7), Inches(1.5))
    p = tb.text_frame.paragraphs[0]
    p.text = title
    p.font.size = Pt(54)
    p.font.bold = True
    p.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    sb = s.shapes.add_textbox(Inches(0.8), Inches(4.0), Inches(11.7), Inches(1.0))
    sp = sb.text_frame.paragraphs[0]
    sp.text = subtitle
    sp.font.size = Pt(28)
    sp.font.color.rgb = RGBColor(0xBE, 0xD9, 0xF2)
    line = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(3.95), Inches(2.5), Inches(0.05))
    line.fill.solid()
    line.fill.fore_color.rgb = ACCENT
    line.line.fill.background()
    return s


def content_slide(title, items, page_num, total, size=18):
    s = prs.slides.add_slide(BLANK)
    add_bg(s)
    add_title_bar(s, title)
    bullets(s, items, size=size)
    add_footer(s, page_num, total)
    return s


def section_slide(title, page_num, total):
    s = prs.slides.add_slide(BLANK)
    add_bg(s, ACCENT)
    tb = s.shapes.add_textbox(Inches(0.8), Inches(3.0), Inches(11.7), Inches(1.5))
    p = tb.text_frame.paragraphs[0]
    p.text = title
    p.font.size = Pt(48)
    p.font.bold = True
    p.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    add_footer(s, page_num, total)
    return s


# ---------- BUILD DECK ----------
slides_data = []

# 1 Title
slides_data.append(("title", "Chapter 1: Computer Forensics", "Foundations of Digital Investigation"))

# 2 Topics
slides_data.append(("content", "Topics Covered", [
    "What is computer forensics?",
    "Knowledge needed for the field of digital forensics",
    "Knowledge needed for forensic analysis",
    "The Daubert standard",
    "Relevant US laws",
    "Federal guidelines (FBI, Secret Service)",
]))

# 3 Goals
slides_data.append(("content", "Learning Goals", [
    "Understand basic concepts of forensics",
    "Maintain the chain of custody",
    "Understand basic hardware & networking knowledge needed",
    "Know basic laws related to computer forensics",
]))

# 4 Section: What is forensics
slides_data.append(("section", "What is Computer Forensics?"))

# 5 Definitions
slides_data.append(("content", "Definitions", [
    "Forensics: analytical & investigative techniques to identify, collect, examine, and preserve evidence for court.",
    "Computer forensics: same techniques applied to computer-based material.",
    "Digital forensics: expanded scope — smartphones, smart watches, IoT, all digital media/devices.",
    ("Goal: recover, analyze, present evidence with integrity and security.", 1),
    ("Adhere to strict guidelines — no shortcuts.", 1),
]))

# 6 Seven domains
slides_data.append(("content", "Seven Domains of IT Infrastructure", [
    "Digital forensics covers all 7 domains:",
    ("User domain", 1),
    ("Workstation domain", 1),
    ("LAN domain", 1),
    ("LAN-to-WAN domain", 1),
    ("WAN domain", 1),
    ("Remote access domain", 1),
    ("System/application domain", 1),
]))

# 7 Scientific knowledge
slides_data.append(("content", "Using Scientific Knowledge", [
    "Computer forensics is a science — needs scientific method.",
    "Required disciplines: hardware, OS, networks.",
    "Parallel: DNA forensics needs strong scientific background.",
    "Tech & criminal tactics evolve — keep learning.",
    "Understand how info is used and stored.",
]))

# 8 Section: 3-stage process
slides_data.append(("section", "Three-Stage Forensic Process"))

# 9 Collecting
slides_data.append(("content", "1. Collecting", [
    "Evidence collected using specific procedures.",
    "Method directly impacts court admissibility.",
    "Improper collection → evidence thrown out.",
]))

# 10 Analyzing
slides_data.append(("content", "2. Analyzing", [
    "Most challenging & time-consuming stage.",
    "Needs strong scientific knowledge to interpret data.",
    "Approach like a complex puzzle — think Sherlock Holmes.",
    "Consider alternative explanations before conclusions.",
]))

# 11 Presenting
slides_data.append(("content", "3. Presenting", [
    "Final stage: expert report + expert testimony.",
    "Translate technical info to plain English for court.",
    "Avoid jargon. Use visuals when helpful.",
    "Expert testimony: based on scientific/technical knowledge, not personal experience.",
]))

# 12 Expert Report
slides_data.append(("content", "The Expert Report", [
    "Formal document of the investigation + specialist's CV.",
    "Must include all tests conducted.",
    "Experts can ONLY testify on what is in the report — be exhaustive.",
    "Plain English. Detail qualifications, methodology, tools.",
    "Methodology must be reproducible by other competent analysts.",
    "Avoid \"junk science\" — cite verifiable sources (Daubert).",
    "Proofread to prevent opposing counsel from finding errors.",
]))

# 13 Expert Testimony
slides_data.append(("content", "Expert Testimony", [
    "Forensic specialists serve as expert witnesses (depositions or trial).",
    "Always tell truth — perjury is a felony, kills credibility.",
    "Goal: present scientifically valid evidence even if it hurts your side.",
    "U.S. Federal Rule of Evidence 702: admissible if",
    ("based on sufficient facts,", 1),
    ("uses reliable methods,", 1),
    ("applied reliably, and assists the court.", 1),
]))

# 14 FRE rules
slides_data.append(("content", "Federal Rules of Evidence", [
    "Rule 401 — Relevant Evidence: makes a consequential fact more/less probable.",
    "Rule 702 — Expert Testimony admissibility (above).",
    "Rule 703 — Bases of Expert: may use field-typical facts/data even if inadmissible.",
    "Rule 704 — Opinion on Ultimate Issue: experts can opine on ultimate issue.",
    "Rule 705 — Disclosing Underlying Facts: state opinion first, disclose on cross.",
    "Rule 706 — Court-appointed Expert: courts may appoint neutral experts.",
]))

# 15 Section: Field
slides_data.append(("section", "Understanding the Field"))

# 16 Who uses
slides_data.append(("content", "Who Uses Digital Forensics?", [
    "Military — intelligence from captured computers",
    "Government agencies — FBI, FTC, FDA, Secret Service, DOJ, NIST, OLES, DHS",
    "Law firms — civil cases (divorce, discrimination)",
    "Criminal prosecutors — link evidence to drug, embezzlement, fraud cases",
    "Academia — research and degree programs",
    "Data recovery firms",
    "Corporations — termination, IP theft, harassment, intrusions",
    "Insurance companies — accidents, arson, workers' comp",
    "Individuals — wrongful termination, harassment claims",
], 16))

# 17 Digital evidence types
slides_data.append(("content", "Four Types of Evidence", [
    "Real evidence — physical objects (laptop with prints).",
    "Documentary evidence — stored info (emails, logs, DBs). Must authenticate.",
    "Testimonial evidence — expert testimony.",
    "Demonstrative evidence — charts/graphics that explain other evidence.",
    "Admissibility hinges on unbroken CHAIN OF CUSTODY.",
]))

# 18 Section: Challenges
slides_data.append(("section", "Scope-Related Challenges"))

# 19 Large data
slides_data.append(("content", "Large Volumes of Data", [
    "Examine ALL digital media including hidden data + metadata.",
    "Strict chain of custody required.",
    "Manage massive, ever-growing data volume.",
    "Need duplicate storage + backups.",
    "Budget constraints can compromise integrity.",
    "Chain of custody = continuous control of evidence from collection to court.",
]))

# 20 System complexity
slides_data.append(("content", "System Complexity", [
    "Systems are complex; data is diverse.",
    "Need range of tools + deep tech understanding.",
    "Must know: legal evidence rules, chain of custody, Daubert standard.",
    "Corroborate from multiple sources for accuracy.",
    "Daubert standard: only widely-accepted methods/tools usable in court.",
]))

# 21 Distributed crime
slides_data.append(("content", "Distributed Crime Scenes", [
    "Networks are global — evidence scattered across jurisdictions.",
    "Criminals exploit jurisdictional differences.",
    "Evidence in multiple devices, languages, countries.",
    "International cooperation REQUIRED — without it, investigations fail.",
]))

# 22 Caseload
slides_data.append(("content", "Caseload & Limited Resources", [
    "Demand for specialists outstrips supply → backlogs grow.",
    "Criminals use tech to commit AND hide crimes.",
    "Forensic-like tools used to destroy evidence.",
    "Caseloads keep rising; resources stay limited.",
]))

# 23 Types of analysis
slides_data.append(("content", "Types of Digital Forensic Analysis", [
    "Disk forensics — storage media, deleted data recovery.",
    "Email forensics — trace origins and content.",
    "Network forensics — monitor & analyze traffic.",
    "Internet forensics — reconstruct online activity.",
    "Software/malware forensics — analyze malicious code.",
    "Live system forensics — examine real-time memory.",
    "Cell-phone forensics — mobile content (FISA, PATRIOT Act apply).",
]))

# 24 General guidelines
slides_data.append(("content", "General Forensic Guidelines", [
    "1. Chain of custody — documented control from seizure to court.",
    "2. Don't touch the suspect drive — work on a forensic copy (FTK, EnCase).",
    "3. Document trail — over-document; record who, what, when, tools used.",
    "4. Secure the evidence — locked rooms, safes, need-to-know access.",
    "Failure on any of these → evidence excluded at trial.",
]))

# 25 Section: Hardware
slides_data.append(("section", "Knowledge Needed: Hardware"))

# 26 Hardware intro
slides_data.append(("content", "Hardware Knowledge", [
    "Need CompTIA A+ level (or beyond) understanding of PCs.",
    "Comprehend: component function, data storage, computer usage.",
    "Volatile memory: needs power to retain data.",
    ("RAM = highly volatile.", 1),
    ("EEPROM = very nonvolatile.", 1),
]))

# 27 RAM types
slides_data.append(("content", "Types of RAM", [
    "EDO DRAM — full memory transaction in one clock cycle.",
    "BEDO DRAM — 4 addresses per burst.",
    "ADRAM — NOT synchronized to CPU clock.",
    "SDRAM — synchronized to CPU clock; replaced EDO.",
    "DDR SDRAM — DDR2, DDR3, DDR4, DDR5 (DDR5 launched Oct 2020).",
]))

# 28 Memory by volatility
slides_data.append(("content", "Memory by Volatility", [
    "RAM — highly volatile; lost when power off; read/write.",
    "ROM — nonvolatile; permanent; embedded instructions.",
    "PROM — programmed once; retained without power.",
    "EPROM — erasable + reprogrammable; retains without power.",
    "EEPROM — electrically erasable; stores BIOS.",
    "BIOS = basic input/output system; chip instructions to boot.",
]))

# 29 Hard drives intro
slides_data.append(("content", "Hard Drive Interfaces", [
    "SCSI (1986) — high-end servers, up to 16 chained, needs termination.",
    "IDE / EIDE / PATA — older PC interfaces (40 or 80-pin).",
    "SATA — most common today; workstations + servers; no jumpers.",
    "Serial SCSI — up to 65,537 devices; no termination needed.",
    "SSDs — NAND flash, no moving parts, non-volatile, limited write cycles.",
]))

# 30 HDD structure
slides_data.append(("content", "HDD Structure", [
    "Sectors — basic storage units (512 B; newer = 4096 B).",
    "Clusters — 1 to 128 sectors (512 B to 64 KB); unused space wasted.",
    "Tracks — where sectors are arranged.",
    "Drive geometry — heads, cylinders, sectors-per-track.",
    "Slack space — unused space at end of cluster; can hide data.",
    "Low-level format — creates physical structure.",
    "High-level format — file system + boot sector (quick format).",
]))

# 31 SSDs
slides_data.append(("content", "SSDs vs HDDs", [
    "SSDs use NAND flash; non-volatile; no moving parts.",
    "Wear leveling — spreads writes across drive to extend life.",
    "Wear leveling makes slack-space data hiding less relevant on SSDs.",
    "1/2 to 1/3 the power of HDDs; lower idle power too.",
    "Don't benefit from defragmentation. Limited write cycles.",
]))

# 32 Section: Software
slides_data.append(("section", "Knowledge Needed: Software"))

# 33 Operating systems
slides_data.append(("content", "Operating Systems", [
    "Windows — Registry stores settings, software params, device info.",
    ("Key evidence: index.dat, browser cookies, history.", 1),
    "Linux — open source, abundant free forensic tools.",
    ("Kali Linux (formerly BackTrack) — security/forensics distro.", 1),
    ("Shell-centric; UNIX clone.", 1),
    "Mac OS — modern macOS based on FreeBSD (UNIX-like).",
    ("Many Linux shell techniques apply to macOS.", 1),
]))

# 34 Files
slides_data.append(("content", "Files & File Headers", [
    "File extensions easily changed — don't trust them.",
    "File header = first byte; key for file carving.",
    "Graphic headers contain size, resolution, color count.",
    "ELF — executables/object code on UNIX systems.",
    "PE — Windows executables/DLLs (from COFF).",
    "Area density — data per area of disk.",
    "Windows Office files use a GUID for identification.",
]))

# 35 Journaling
slides_data.append(("content", "Journaling File Systems", [
    "Journaling = log of all file transactions → fault tolerant.",
    "Enables recovery after crash.",
    "Physical journaling — logs copy of every block + checksum.",
    "Logical journaling — records only metadata changes.",
]))

# 36 File systems
slides_data.append(("content", "File Systems", [
    "FAT (FAT16/FAT32) — older Microsoft; bit count differs by version.",
    "NTFS — 1993 Microsoft; supports 2^64−1 clusters.",
    "ReFS — resilient; checksums; Server 2019, some Win10/8.1.",
    "APFS — default Apple since macOS 10.13 (2017); SSD-optimized.",
    "EXT (EXT4) — Linux; up to 1 EB volumes, 16 TB files.",
    "ReiserFS — Linux journaling FS; from kernel 2.4.1.",
    "Berkeley Fast File System — UNIX; bitmap for free clusters.",
], 16))

# 37 Section: Networks
slides_data.append(("section", "Knowledge Needed: Networks"))

# 38 Networks intro
slides_data.append(("content", "Networks: At Rest vs In Motion", [
    "Data \"at rest\" = stored. Data \"in motion\" = transmitted.",
    "Need OSI + IETF model knowledge.",
    "Information in motion is critical — strong network skills required.",
    "Addresses form a hierarchy within information transfer.",
]))

# 39 Addressing
slides_data.append(("content", "Addressing Concepts", [
    "Physical ports — USB, Ethernet, antennas; OSI Layer 1.",
    "MAC addresses — 6-byte (48-bit); first 3 bytes = vendor.",
    ("MACs CAN be duplicated — don't be fooled.", 1),
    "IP addresses — logical, easily changed; IPv4 (32-bit), IPv6 available.",
    "Logical port numbers — channels for data transfer (used with IP).",
]))

# 40 Common ports
slides_data.append(("content", "Common Ports (Selected)", [
    "20/21 FTP  •  22 SSH/SFTP  •  23 Telnet  •  25 SMTP",
    "43 WhoIS  •  53 DNS  •  69 TFTP  •  80 HTTP",
    "88 Kerberos  •  109 POP2  •  110 POP3  •  137-139 NetBIOS",
    "161/162 SNMP  •  179 BGP  •  194 IRC  •  220 IMAP",
    "389 LDAP  •  443 HTTPS  •  445 AD/SMB  •  464 Kerberos pwd",
    "465 SMTP/SSL  •  636 LDAPS",
]))

# 41 URLs/DNS
slides_data.append(("content", "URLs and DNS", [
    "Internet growth → DNS to use names instead of IPs.",
    "DNS introduces forensic challenges:",
    ("Permanent or temp changes in name-to-IP mapping.", 1),
    ("Can redirect browsers → hinder investigations.", 1),
    "End-to-end communication: format per protocol → TCP w/ port + IP → Ethernet envelope → reverse at destination.",
]))

# 42 Network utilities
slides_data.append(("content", "Basic Network Utilities", [
    "ipconfig (Windows) / ifconfig (UNIX/Linux) — IP, gateway info.",
    ("ipconfig /all — hostname, when IP obtained.", 1),
    "ping — echo packet; tests reachability + round-trip; shows TTL.",
    ("ping -? — explore options.", 1),
    "tracert / traceroute — path/hops to destination.",
    ("Useful for troubleshooting; NOT reliable for forensics.", 1),
]))

# 43 Section: Anti-forensics
slides_data.append(("section", "Obscured Info & Anti-Forensics"))

# 44 Obscured
slides_data.append(("content", "Obscured Information", [
    "Data hidden or unreadable via:",
    ("Encryption", 1),
    ("Steganography", 1),
    ("Compression", 1),
    ("Proprietary formats", 1),
    "Used by criminals AND legit companies (protect IP).",
    "May need to extract evidence LIVE if encryption is active.",
]))

# 45 Anti-forensics
slides_data.append(("content", "Anti-Forensics Techniques", [
    "Perpetrators actively hinder investigations.",
    "Hide identity via public networks (libraries, cafes) or destroy logs.",
    "Data destruction — wipe buffers, overwrite, damage devices.",
    "Data hiding — reserved sectors, hidden partitions, fake extensions.",
    "Data transformation — encryption, steganography.",
    "File system alteration — corrupt NTFS structures.",
]))

# 46 Section: Daubert
slides_data.append(("section", "The Daubert Standard"))

# 47 Daubert
slides_data.append(("content", "Daubert Standard", [
    "Legal rule for admitting expert scientific testimony.",
    "Judges assess if reasoning + methodology are scientifically valid.",
    "Factors:",
    ("Testability", 1),
    ("Peer review", 1),
    ("Known error rates", 1),
    ("Established standards", 1),
    ("General acceptance in scientific community", 1),
    "For computer forensics: use widely-accepted methods, document everything, strict chain of custody.",
]))

# 48 Section: Laws
slides_data.append(("section", "US Laws Affecting Digital Forensics"))

# 49 Laws part 1
slides_data.append(("content", "Key US Laws (1/3)", [
    "Federal Privacy Act 1974 — federal agency record systems.",
    "Privacy Protection Act 1980 (PPA) — protects journalists' work product.",
    "FISA 1978 — foreign intel collection; FISA court warrant.",
    "ECPA 1986 — electronic comm privacy/disclosure/interception.",
    "Computer Security Act 1987 — federal computer security minimums.",
    "CALEA 1994 — wiretap law; expanded 2004 to wireless + packet.",
    "18 U.S.C. § 2701 — unauthorized access to stored comms; up to 5 yr.",
], 16))

# 50 Laws part 2
slides_data.append(("content", "Key US Laws (2/3)", [
    "Communications Decency Act 1996 — minors + indecent material.",
    "Telecommunications Act 1996 — privacy/disclosure of in-motion data.",
    "Child Protection & Sexual Predator Punishment Act 1998.",
    "COPPA 1998 — online privacy of children under 13.",
    "DMCA 1998 — anti-circumvention of copyright protection.",
    "Wireless Communications & Public Safety Act 1999 — GPS, etc.",
    "USA PATRIOT Act — main law for collecting internet content/metadata.",
    "Sarbanes-Oxley 2002 — records retention/destruction (public co.).",
], 15))

# 51 Laws part 3
slides_data.append(("content", "Key US Laws (3/3)", [
    "18 USC 1030 — Fraud + Related Activity w/ Computers (hacking).",
    "18 USC 1020 — Fraud w/ Access Devices (routers, etc.).",
    "18 USC § 1028A — Identity Theft + Aggravated Identity Theft.",
    "18 USC § 2251 — Sexual Exploitation of Children.",
    ("§ 2260 — prohibits explicit minor depictions for US import.", 1),
    ("§ 2252 — possession/distribution/receipt of CP.", 1),
    ("§ 2252A — activities related to CP material.", 1),
]))

# 52 Warrants
slides_data.append(("content", "Warrants & 4th Amendment", [
    "4th Amendment — protects against unreasonable searches/seizures.",
    "Seizing property OR violating reasonable expectation of privacy = search.",
    "No expectation of privacy in publicly posted info.",
    "Warrants required UNLESS plain sight or proper consent.",
    "Consent issues: scope of consent? proper party to consent?",
    "Warrantless exceptions: border crossings, imminent destruction (US v. David).",
    "Scope: do not exceed warrant (US v. Schlingloff — ID theft warrant + FTK → CP discovery admissible).",
], 16))

# 53 Section: Federal Guidelines
slides_data.append(("section", "Federal Guidelines"))

# 54 FBI
slides_data.append(("content", "FBI Guidelines", [
    "Consult FBI + Secret Service guidelines first.",
    "First responders: preserve system state.",
    "Back up ALL data — logs, altered files included.",
    "Activate auditing software.",
    "Secure diverse evidence: drives, logs, emails, phone data.",
    "Always work with COPIES, not originals.",
    "Reference: FBI cybercrimes page.",
]))

# 55 Secret Service golden rules
slides_data.append(("content", "Secret Service — Golden Rules", [
    "Ensure scene safety.",
    "Preserve computer evidence immediately if crime suspected.",
    "Confirm legal basis: plain view, warrant, or consent.",
    "Don't access files — if computer off, leave off.",
    "If on — properly shut down, prepare for transport.",
    "If destruction suspected — unplug immediately.",
    "Photograph screens (if on), location, attached media.",
    "Assess special legal/privacy considerations (doctors, attorneys).",
], 15))

# 56 RCFL
slides_data.append(("content", "RCFL Program", [
    "Regional Computer Forensics Laboratory — national network.",
    "Funded + supported by FBI; staffed by state/local/federal.",
    "16 RCFLs examine digital evidence for criminal + national security.",
    "Cases: terrorism, child pornography, fraud, homicide.",
    "Trained nearly 5,000 personnel in 2008.",
    "More info: www.rcfl.gov",
]))

# 57 Summary
slides_data.append(("content", "Chapter Summary", [
    "Computer/digital forensics = investigative techniques on digital evidence for legal use.",
    "3-stage process: Collect → Analyze → Present.",
    "Challenges: data volume, system complexity, distributed crime scenes.",
    "Required knowledge: hardware, software (OS + file systems), networking.",
    "Anti-forensics + obscured info complicate cases.",
    "Daubert standard governs expert testimony admissibility.",
    "Key laws: ECPA, PATRIOT Act, FRE 702, 4th Amendment warrants.",
    "FBI + Secret Service guidelines + RCFL support law enforcement.",
], 15))

# 58 Q&A
slides_data.append(("title", "Questions?", "Chapter 1 — Discussion"))

# Render
total = len(slides_data)
for i, item in enumerate(slides_data, 1):
    kind = item[0]
    if kind == "title":
        title_slide(item[1], item[2])
    elif kind == "section":
        section_slide(item[1], i, total)
    elif kind == "content":
        size = item[3] if len(item) > 3 else 18
        content_slide(item[1], item[2], i, total, size=size)

prs.save(OUT)
print(f"Saved: {OUT}")
print(f"Slides: {total}")
