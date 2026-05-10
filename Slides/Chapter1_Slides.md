---
marp: true
theme: default
paginate: true
style: |
  section {
    background-color: #f0f4f8;
    font-family: 'Segoe UI', sans-serif;
    color: #1a2e4a;
  }
  section.title {
    background-color: #0d2340;
    color: white;
    justify-content: flex-end;
    padding-bottom: 80px;
  }
  section.title h1 {
    font-size: 2.4em;
    color: white;
    border-bottom: 4px solid #3a7fc1;
    padding-bottom: 10px;
  }
  section.title p {
    color: #7ab0d4;
    font-style: italic;
    font-size: 1.1em;
  }
  section.section-divider {
    background-color: #3a7fc1;
    color: white;
    justify-content: flex-end;
    padding-bottom: 80px;
  }
  section.section-divider h1 {
    font-size: 2.2em;
    color: white;
  }
  h1 {
    color: #1a2e4a;
    border-bottom: 2px solid #3a7fc1;
    padding-bottom: 8px;
  }
  .card-grid {
    display: grid;
    gap: 12px;
  }
  .card {
    background: white;
    border-radius: 8px;
    padding: 14px 18px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  }
  .card h3 {
    color: #1a2e4a;
    margin: 0 0 6px 0;
    font-size: 1em;
  }
  .card p {
    margin: 0;
    font-size: 0.85em;
    color: #4a5568;
  }
  .callout {
    background: #e8f0fb;
    border-radius: 8px;
    padding: 12px 20px;
    text-align: center;
    font-weight: bold;
    color: #1a2e4a;
    margin-top: 12px;
    font-size: 0.9em;
  }
  .callout.warn {
    background: #fde8e8;
    color: #c0392b;
  }
  footer {
    font-size: 0.7em;
    color: #888;
  }
---

<!-- _class: title -->

# Chapter 1: Computer Forensics

Foundations of Digital Investigation

---

# Topics Covered

**01 — What is computer forensics?**
Defining the fundamental investigative and analytical techniques.

**02 — Field Knowledge & Analysis**
Required expertise for digital forensics and detailed forensic analysis.

**03 — Legal Standards: The Daubert Standard**
Understanding the criteria for admitting expert witness testimony.

**04 — US Laws & Federal Guidelines**
Relevant statutes and protocols from the FBI and Secret Service.

---

# Learning Goals

| # | Goal | Description |
|---|------|-------------|
| 01 | **Foundations** | Understand basic concepts of forensics. |
| 02 | **Custody** | Maintain the integrity and chain of custody for all digital evidence. |
| 03 | **Technical** | Understand basic hardware & networking knowledge needed for investigations. |
| 04 | **Legal** | Know basic laws and standards related to computer forensics. |

---

<!-- _class: section-divider -->

# What is Computer Forensics?

---

# Definitions

| Term | Definition |
|------|-----------|
| **Forensics** | Analytical & investigative techniques to identify, collect, examine, and preserve evidence for court. |
| **Computer Forensics** | Standard forensic techniques specifically applied to computer-based material. |
| **Digital Forensics** | Expanded scope across all digital media and devices: Smartphones & Watches, IoT Devices, All Digital Media. |

<br>

> **Goal:** Recover, analyze, and present evidence with integrity and security. Adhere to strict guidelines — no shortcuts.

---

# Seven Domains of IT Infrastructure

|||||
|--------|--------|--------|--------|
| User | Workstation | LAN | LAN-to-WAN |
| WAN | Remote Access | System/Application |

<br>

> **Digital forensics covers all 7 domains**

---

# Using Scientific Knowledge

**Scientific Method**
Computer forensics is a science and requires a rigorous scientific method for valid results.

**Core Disciplines** — Proficiency required in:

- Hardware Architecture
- Operating Systems
- Network Infrastructures

**DNA Parallel**
Similar to DNA forensics, digital evidence requires a strong scientific background to be defensible.

---

**Continuous Evolution**
Technology and criminal tactics evolve constantly. Professionals must keep learning to understand how information is used and stored.

> **Mastery of scientific principles is the foundation of digital evidence integrity.**

---

<!-- _class: section-divider -->

# Three-Stage Forensic Process

---

# 1. Collecting

**Procedural Integrity**
Evidence must be collected using specific, documented procedures to ensure validity.

**Court Admissibility**
The collection method directly impacts whether the evidence is admissible in a court of law.

**⚠ Critical Risk**
Improper collection leads to evidence being thrown out, jeopardizing the entire case.

<br>

> **Methodical collection is the first line of defense for forensic integrity.**

---

# 2. Analyzing

**Complexity & Rigor**
Most challenging and time-consuming stage, requiring deep scientific knowledge to interpret data correctly.

**Analytical Mindset**
Approach evidence like a complex puzzle. Channel a "Sherlock Holmes" perspective to find hidden patterns.

<br>

> **Critical Requirement: Consider alternative explanations before reaching conclusions.**

---

# 3. Presenting

**Final Stage**
Expert report + expert testimony comprise the culmination of the forensic process.

**Clarity for Court**
Translate technical info to plain English. Avoid jargon and use visuals to ensure understanding.

**Objective Testimony**
Based strictly on scientific/technical knowledge, not personal experience or opinion.

<br>

> **Presentation bridges the gap between digital evidence and legal understanding.**

---

# The Expert Report

**Scope & Inclusion**
Formal document including investigation details, specialist's CV, and ALL tests conducted.

**Testimony Bound**
Experts can ONLY testify on what is in the report. Exhaustive detail on methodology and tools is vital.

**Quality Standards:**

- **Plain English:** Detail qualifications clearly for the court.
- **Reproducibility:** Methodology must be verifiable by other competent analysts.
- **Evidence-Based:** Avoid "junk science" by citing Daubert-standard sources.

<br>

> **Proofread thoroughly to prevent opposing counsel from finding errors.**

---

# Expert Testimony

**The Expert's Role**
Forensic specialists serve as expert witnesses in depositions or trial. The primary goal is scientifically valid evidence.

**Absolute Integrity**
Always tell the truth. Perjury is a felony that kills credibility, even if the evidence hurts your side.

**U.S. Federal Rule of Evidence 702** — Evidence is admissible if it satisfies these requirements:

- Based on sufficient facts or data
- Is the product of reliable principles and methods
- Expert has reliably applied the methods to the facts of the case

<br>

> **Expert testimony must assist the trier of fact through specialized knowledge.**

---

# Federal Rules of Evidence

| Rule | Description |
|------|-------------|
| **Rule 401 — Relevant Evidence** | Makes a consequential fact more or less probable. |
| **Rule 702 — Expert Testimony** | Governs the admissibility of expert witness testimony. |
| **Rule 703 — Bases of Expert** | May use field-typical facts/data even if inadmissible. |

---

# Federal Rules of Evidence (contd)

| Rule | Description |
|------|-------------|
| **Rule 704 — Opinion on Ultimate Issue** | Experts can opine on the ultimate issue of a case. |
| **Rule 705 — Underlying Facts** | State opinion first, then disclose facts on cross-examination. |
| **Rule 706 — Court-Appointed Expert** | Courts have the authority to appoint neutral experts. |

<br>

> **Essential legal framework for digital forensic testimony**

---
<!-- _class: section-divider -->

# Understanding the Field

---

# Who Uses Digital Forensics?

| Sector | Use Case |
|--------|----------|
| **Military** | Intelligence from captured computers |
| **Gov. Agencies** | FBI, FTC, FDA, Secret Service, DOJ, NIST, OLES, DHS |
| **Academia / Research** | Research and degree programs; Data recovery |
| **Law Firms** | Civil cases (divorce, discrimination) |

---

# Who Uses Digital Forensics? (Contd)

| Sector | Use Case |
|--------|----------|
| **Criminal Prosecutors** | Evidence links to drug, embezzlement, fraud cases |
| **Individuals** | Wrongful termination, harassment claims |
| **Corporations** | Termination, IP theft, harassment, intrusions |
| **Insurance Companies** | Accidents, arson, workers' comp |
| **Private Firms** | Internal audits and data recovery services |

> **Broad applications across legal, corporate, and governmental sectors**

---

# Four Types of Evidence

**Real Evidence**
Physical objects like a laptop with fingerprints found at a scene.

**Documentary Evidence**
Stored information such as emails, logs, and databases; requires authentication.

**Testimonial Evidence**
Statements provided by expert witnesses during a trial or hearing.

**Demonstrative Evidence**
Charts, graphics, or models used to explain other forms of evidence.

<br>

> Admissibility hinges on an unbroken **CHAIN OF CUSTODY**.

---

<!-- _class: section-divider -->

# Scope-Related Challenges

---

# Large Volumes of Data

**Comprehensive Examination**
Examine ALL digital media including hidden data and metadata to ensure no evidence is missed.

**Volume Management**
Manage massive, ever-growing data volumes requiring duplicate storage, backups, and robust infrastructure.

---

# Large Volumes of Data (Contd)

**Integrity & Budget**
Budget constraints can compromise forensic integrity; prioritize resources to maintain high evidentiary standards.

**Strict Chain of Custody**
Required for admissibility; ensures continuous control of evidence from initial collection to the courtroom.

<br>

> Chain of custody = **CONTINUOUS CONTROL** of evidence.

---

# System Complexity

**Technical Foundations**
Systems are complex and data is diverse. Professionals require a range of tools and deep technical understanding to navigate these complexities.

**Legal Frameworks**
Forensic experts must master legal evidence rules, maintain a strict chain of custody, and adhere to the Daubert standard for admissibility.

---

# System Complexity (Contd)

**Accuracy & Corroboration**
To ensure forensic accuracy, data must be corroborated from multiple sources. This validation is critical for technical and legal integrity.

**Daubert Standard**
Only widely-accepted methods and tools are usable in court, ensuring that forensic findings meet rigorous standards of reliability.

<br>

> Daubert Standard = **WIDELY-ACCEPTED** methods and tools.

---

# Distributed Crime Scenes

**Global Networks**
Networks are global — evidence is often scattered across multiple jurisdictions.

**Jurisdictional Exploitation**
Criminals actively exploit jurisdictional differences to evade detection and prosecution.

**Evidence Diversity**
Evidence exists across multiple devices, in various languages, and in different countries.

**International Cooperation**
Cooperation is REQUIRED — without international collaboration, investigations will fail.

<br>

> Global Crime = **INTERNATIONAL COOPERATION** required.

---

# Caseload & Limited Resources

**Human Resource Gap**
Demand for specialists outstrips supply → backlogs grow.

**Technological Evasion**
Criminals use tech to commit AND hide crimes.

**Anti-Forensics**
Forensic-like tools used to destroy evidence.

**Sustainability Issue**
Caseloads keep rising; resources stay limited.

<br>

> Rising Caseloads + **STAGNANT RESOURCES** = Growing Backlogs

---

# Types of Digital Forensic Analysis

| Type | Description |
|------|-------------|
| **Disk Forensics** | Storage media, deleted data recovery. |
| **Email Forensics** | Trace origins and content. |
| **Network Forensics** | Monitor & analyze traffic. |
| **Internet Forensics** | Reconstruct online activity. |
| **Software/Malware** | Analyze malicious code. |
| **Live System Forensics** | Examine real-time memory. |

<br>

> **Cell-phone Forensics:** Mobile content (FISA, PATRIOT Act apply)

---

# General Forensic Guidelines

**1. Chain of Custody**
Documented control from seizure to court.

**2. Forensic Copy Only**
Don't touch the suspect drive; work on copies (FTK, EnCase).

**3. Document Trail**
Over-document: record who, what, when, and tools used.

**4. Secure Evidence**
Locked rooms, safes, and need-to-know access.

<br>

> ⚠ Failure on any of these → **EVIDENCE EXCLUDED AT TRIAL**

---

<!-- _class: section-divider -->

# Knowledge Needed: Hardware

---

# Hardware Knowledge

**Foundational Requirement**
Need CompTIA A+ level (or beyond) understanding of PCs.

**Core Competencies**
Comprehend: component function, data storage, computer usage.

**Memory & Volatility**

- **Volatile Memory:** Needs power to retain data.
  - RAM = highly volatile.
- **Nonvolatile Memory:** Retains data without power.
  - EEPROM = very nonvolatile.

---

# Types of RAM

| Type | Description |
|------|-------------|
| **EDO DRAM** | Full transaction in one cycle. |
| **BEDO DRAM** | 4 addresses per burst. |
| **ADRAM** | Asynchronous DRAM; NOT synchronized to the CPU clock. |
| **SDRAM** | Synchronized to CPU clock; the successor that replaced EDO. |
| **DDR SDRAM** | Double Data Rate Synchronous Dynamic RAM. |
| **DDR2/3/4** | Successive generations. |
| **DDR5** | Launched Oct 2020. |

---

# Memory by Volatility

| Type | Description |
|------|-------------|
| **RAM** | Highly volatile; lost when power off; read/write capabilities. |
| **ROM** | Nonvolatile; permanent storage for embedded instructions. |
| **PROM & EPROM** | Programmed once or erasable/reprogrammable; both retain data without power. |
| **EEPROM** | Electrically erasable; primarily used to store the BIOS. |

**BIOS (Basic Input/Output System)**
Essential chip instructions required to boot the computer system.

---

# Hard Drive Interfaces

| Interface | Description |
|-----------|-------------|
| **SCSI (1986)** | High-end servers, up to 16 chained, needs termination. |
| **IDE / EIDE / PATA** | Older PC interfaces (40 or 80-pin). |
| **SATA** | Most common today; workstations + servers; no jumpers. |
| **Serial SCSI** | Up to 65,537 devices; no termination needed. |
| **SSDs** | NAND flash, no moving parts, non-volatile, limited write cycles. |

---

# HDD Structure

**Sectors** — Basic storage units (512 B; newer = 4096 B).
**Clusters** — 1 to 128 sectors; unused space is wasted.
**Tracks** — Physical circular paths where sectors are arranged.
**Drive Geometry** — Includes heads, cylinders, and sectors-per-track.
**Slack Space** — Unused space at cluster end; used to hide data.
**Low-Level vs. High-Level Format** — Low-level creates structure; high-level sets the file system.

---

# SSDs vs HDDs

**Physical Characteristics**
SSDs use NAND flash; non-volatile; no moving parts.

**Wear Leveling**
Spreads writes to extend life; makes slack-space data hiding less relevant.

**Power Efficiency**
1/2 to 1/3 the power of HDDs; significantly lower idle power.

**Maintenance & Longevity**
No benefit from defrag; limited write cycles compared to HDDs.

<br>

> **Summary: SSDs offer superior speed and power efficiency but have finite life spans.**

---

<!-- _class: section-divider -->

# Knowledge Needed: Software

---

# Operating Systems

**Windows**
Registry stores settings, software params, and device info.

- Key Evidence: `index.dat`, Browser cookies, History

**Linux**
Open source with abundant free forensic tools. Shell-centric UNIX clone.

- Forensics Focus: Kali Linux (formerly BackTrack); Primary security/forensics distro

**Mac OS**
Modern macOS is based on FreeBSD (UNIX-like).

- Techniques: Many Linux shell techniques apply directly to macOS forensics.

---

# Files & File Headers

**Identification Basics**

- **File Extensions:** Easily changed — don't trust them.
- **File Headers:** The first byte; key for file carving.

**Specific Headers**

- **Graphics:** Contain size, resolution, color count.
- **ELF:** UNIX executables/object code.
- **PE:** Windows executables/DLLs.

**Advanced Forensics**

- **Area Density:** Data per area of disk.
- **Office Files:** Use a GUID for identification.

---

# Journaling File Systems

**What is Journaling?**
A log of all file transactions making the system fault tolerant and enabling recovery after a crash.

**Physical Journaling**
Logs a copy of **every block** plus a checksum.

**Logical Journaling**
Records **only metadata changes**.

---

# File Systems

**Microsoft Ecosystem**

- **FAT (16/32):** Older MS; bit count differs by version.
- **NTFS:** 1993; supports 2^64-1 clusters.
- **ReFS:** Resilient; checksums; Server 2019.

**Linux / Open Source**

- **EXT4:** Up to 1 EB volumes, 16 TB files.
- **ReiserFS:** Linux journaling FS; from kernel 2.4.1.

**Apple & UNIX**

- **APFS:** Default Apple since macOS 10.13; SSD-optimized.
- **Berkeley FFS:** UNIX; bitmap for free clusters.

> Different operating systems utilize specific file system architectures to manage data storage, metadata, and recovery.

---

<!-- _class: section-divider -->

# Knowledge Needed: Networks

---

# Networks: At Rest vs In Motion

**Definitions**

- Data **"at rest"** = stored.
- Data **"in motion"** = transmitted.
- Information in motion is critical — strong network skills required.

**Core Concepts**

- Need OSI + IETF model knowledge.
- Addresses form a hierarchy within information transfer.

---

# Addressing Concepts

**Physical & Link Layers**

- **Physical Ports:** USB, Ethernet, antennas; OSI Layer 1.
- **MAC Addresses:** 6-byte (48-bit); first 3 bytes = vendor.
- ⚠ *Note: MACs CAN be duplicated — don't be fooled.*

**Network & Transport Layers**

- **IP Addresses:** Logical, easily changed; IPv4 (32-bit), IPv6 available.
- **Logical Port Numbers:** Channels for data transfer (used with IP).

---

# Common Ports — Remote & Web

**Remote Access & Management**

- **22 (SSH/SFTP):** Secure login & file transfer.
- **23 (Telnet):** Unencrypted (insecure) login.
- **161/162 (SNMP):** Network device monitoring.

**Web & Infrastructure**

- **80/443 (HTTP/S):** Web traffic (Unencrypted/Secure).
- **53 (DNS):** Domain name resolution to IPs.
- **43 (WhoIS):** Domain user database queries.
- **389 (LDAP):** Directory information services.

---

# Common Ports — File Sharing & Email

**File Sharing & Network**

- **20/21 (FTP/TFTP):** Standard & simplified file transfer protocols.
- **137-139 (NetBIOS):** Legacy Windows file/printer sharing.
- **445 (SMB/AD):** Modern Windows sharing & Active Directory.

**Email Protocols**

- **25 (SMTP):** Sending mail between servers.
- **109/110 (POP):** Post Office Protocol for receiving/downloading mail.
- **220 (IMAP):** Accessing & syncing mail across devices.

---

# Common Ports — Auth & Routing

**Authentication & Security**

- **88 (Kerberos):** Network authentication protocol (tickets).
- **464 (Kerberos Pwd):** Specifically for changing/setting Kerberos passwords.

**Routing & Messaging**

- **179 (BGP):** Routing protocol used to exchange info between ISPs.
- **194 (IRC):** Real-time text messaging (Internet Relay Chat).

---

# URLs and DNS

**Internet Growth & DNS**

- **Purpose:** Growth led to DNS to use names instead of IP addresses.
- **Communication Format:** Format per protocol TCP w/ port + IP Ethernet envelope reverse at destination.

---

# Distributed Crime Scenes

**Global Networks**
Networks are global — evidence is often scattered across multiple jurisdictions.

**Jurisdictional Exploitation**
Criminals actively exploit jurisdictional differences to evade detection and prosecution.

**Evidence Diversity**
Evidence exists across multiple devices, in various languages, and in different countries.

**International Cooperation**
Cooperation is REQUIRED — without international collaboration, investigations will fail.

<br>

> Global Crime = **INTERNATIONAL COOPERATION** required.

---

# Caseload & Limited Resources

**Human Resource Gap**
Demand for specialists outstrips supply → backlogs grow.

**Technological Evasion**
Criminals use tech to commit AND hide crimes.

**Anti-Forensics**
Forensic-like tools used to destroy evidence.

**Sustainability Issue**
Caseloads keep rising; resources stay limited.

<br>

> Rising Caseloads + **STAGNANT RESOURCES** = Growing Backlogs

---

# Types of Digital Forensic Analysis

| Type | Description |
|------|-------------|
| **Disk Forensics** | Storage media, deleted data recovery. |
| **Email Forensics** | Trace origins and content. |
| **Network Forensics** | Monitor & analyze traffic. |
| **Internet Forensics** | Reconstruct online activity. |
| **Software/Malware** | Analyze malicious code. |
| **Live System Forensics** | Examine real-time memory. |

<br>

> **Cell-phone Forensics:** Mobile content (FISA, PATRIOT Act apply)

---

# General Forensic Guidelines

**1. Chain of Custody**
Documented control from seizure to court.

**2. Forensic Copy Only**
Don't touch the suspect drive; work on copies (FTK, EnCase).

**3. Document Trail**
Over-document: record who, what, when, and tools used.

**4. Secure Evidence**
Locked rooms, safes, and need-to-know access.

<br>

> ⚠ Failure on any of these → **EVIDENCE EXCLUDED AT TRIAL**

---

<!-- _class: section-divider -->

# Knowledge Needed: Hardware

---

# Hardware Knowledge

**Foundational Requirement**
Need CompTIA A+ level (or beyond) understanding of PCs.

**Core Competencies**
Comprehend: component function, data storage, computer usage.

**Memory & Volatility**

- **Volatile Memory:** Needs power to retain data.
  - RAM = highly volatile.
- **Nonvolatile Memory:** Retains data without power.
  - EEPROM = very nonvolatile.

---

# Types of RAM

| Type | Description |
|------|-------------|
| **EDO DRAM** | Full transaction in one cycle. |
| **BEDO DRAM** | 4 addresses per burst. |
| **ADRAM** | Asynchronous DRAM; NOT synchronized to the CPU clock. |
| **SDRAM** | Synchronized to CPU clock; the successor that replaced EDO. |
| **DDR SDRAM** | Double Data Rate Synchronous Dynamic RAM. |
| **DDR2/3/4** | Successive generations. |
| **DDR5** | Launched Oct 2020. |

---

# Memory by Volatility

| Type | Description |
|------|-------------|
| **RAM** | Highly volatile; lost when power off; read/write capabilities. |
| **ROM** | Nonvolatile; permanent storage for embedded instructions. |
| **PROM & EPROM** | Programmed once or erasable/reprogrammable; both retain data without power. |
| **EEPROM** | Electrically erasable; primarily used to store the BIOS. |

**BIOS (Basic Input/Output System)**
Essential chip instructions required to boot the computer system.

---

# Hard Drive Interfaces

| Interface | Description |
|-----------|-------------|
| **SCSI (1986)** | High-end servers, up to 16 chained, needs termination. |
| **IDE / EIDE / PATA** | Older PC interfaces (40 or 80-pin). |
| **SATA** | Most common today; workstations + servers; no jumpers. |
| **Serial SCSI** | Up to 65,537 devices; no termination needed. |
| **SSDs** | NAND flash, no moving parts, non-volatile, limited write cycles. |

---

# HDD Structure

**Sectors** — Basic storage units (512 B; newer = 4096 B).
**Clusters** — 1 to 128 sectors; unused space is wasted.
**Tracks** — Physical circular paths where sectors are arranged.
**Drive Geometry** — Includes heads, cylinders, and sectors-per-track.
**Slack Space** — Unused space at cluster end; used to hide data.
**Low-Level vs. High-Level Format** — Low-level creates structure; high-level sets the file system.

---

# SSDs vs HDDs

**Physical Characteristics**
SSDs use NAND flash; non-volatile; no moving parts.

**Wear Leveling**
Spreads writes to extend life; makes slack-space data hiding less relevant.

**Power Efficiency**
1/2 to 1/3 the power of HDDs; significantly lower idle power.

**Maintenance & Longevity**
No benefit from defrag; limited write cycles compared to HDDs.

<br>

> **Summary: SSDs offer superior speed and power efficiency but have finite life spans.**

---

<!-- _class: section-divider -->

# Knowledge Needed: Software

---

# Operating Systems

**Windows**
Registry stores settings, software params, and device info.

- Key Evidence: `index.dat`, Browser cookies, History

**Linux**
Open source with abundant free forensic tools. Shell-centric UNIX clone.

- Forensics Focus: Kali Linux (formerly BackTrack); Primary security/forensics distro

**Mac OS**
Modern macOS is based on FreeBSD (UNIX-like).

- Techniques: Many Linux shell techniques apply directly to macOS forensics.

---

# Files & File Headers

**Identification Basics**

- **File Extensions:** Easily changed — don't trust them.
- **File Headers:** The first byte; key for file carving.

**Specific Headers**

- **Graphics:** Contain size, resolution, color count.
- **ELF:** UNIX executables/object code.
- **PE:** Windows executables/DLLs.

**Advanced Forensics**

- **Area Density:** Data per area of disk.
- **Office Files:** Use a GUID for identification.

---

# Journaling File Systems

**What is Journaling?**
A log of all file transactions making the system fault tolerant and enabling recovery after a crash.

**Physical Journaling**
Logs a copy of **every block** plus a checksum.

**Logical Journaling**
Records **only metadata changes**.

---

# File Systems

**Microsoft Ecosystem**

- **FAT (16/32):** Older MS; bit count differs by version.
- **NTFS:** 1993; supports 2^64-1 clusters.
- **ReFS:** Resilient; checksums; Server 2019.

**Linux / Open Source**

- **EXT4:** Up to 1 EB volumes, 16 TB files.
- **ReiserFS:** Linux journaling FS; from kernel 2.4.1.

---

# File Systems (Contd)

**Apple & UNIX**

- **APFS:** Default Apple since macOS 10.13; SSD-optimized.
- **Berkeley FFS:** UNIX; bitmap for free clusters.

> Different operating systems utilize specific file system architectures to manage data storage, metadata, and recovery.

---
<!-- _class: section-divider -->

# Knowledge Needed: Networks

---

# Networks: At Rest vs In Motion

**Definitions**

- Data **"at rest"** = stored.
- Data **"in motion"** = transmitted.
- Information in motion is critical — strong network skills required.

**Core Concepts**

- Need OSI + IETF model knowledge.
- Addresses form a hierarchy within information transfer.

---

# Addressing Concepts

**Physical & Link Layers**

- **Physical Ports:** USB, Ethernet, antennas; OSI Layer 1.
- **MAC Addresses:** 6-byte (48-bit); first 3 bytes = vendor.
- ⚠ *Note: MACs CAN be duplicated — don't be fooled.*

**Network & Transport Layers**

- **IP Addresses:** Logical, easily changed; IPv4 (32-bit), IPv6 available.
- **Logical Port Numbers:** Channels for data transfer (used with IP).

---

# Common Ports — Remote & Web

**Remote Access & Management**

- **22 (SSH/SFTP):** Secure login & file transfer.
- **23 (Telnet):** Unencrypted (insecure) login.
- **161/162 (SNMP):** Network device monitoring.

**Web & Infrastructure**

- **80/443 (HTTP/S):** Web traffic (Unencrypted/Secure).
- **53 (DNS):** Domain name resolution to IPs.
- **43 (WhoIS):** Domain user database queries.
- **389 (LDAP):** Directory information services.

---

# Common Ports — File Sharing & Email

**File Sharing & Network**

- **20/21 (FTP/TFTP):** Standard & simplified file transfer protocols.
- **137-139 (NetBIOS):** Legacy Windows file/printer sharing.
- **445 (SMB/AD):** Modern Windows sharing & Active Directory.

**Email Protocols**

- **25 (SMTP):** Sending mail between servers.
- **109/110 (POP):** Post Office Protocol for receiving/downloading mail.
- **220 (IMAP):** Accessing & syncing mail across devices.

---

# Common Ports — Auth & Routing

**Authentication & Security**

- **88 (Kerberos):** Network authentication protocol (tickets).
- **464 (Kerberos Pwd):** Specifically for changing/setting Kerberos passwords.

**Routing & Messaging**

- **179 (BGP):** Routing protocol used to exchange info between ISPs.
- **194 (IRC):** Real-time text messaging (Internet Relay Chat).

---

# URLs and DNS

**Internet Growth & DNS**

- **Purpose:** Growth led to DNS to use names instead of IP addresses.
- **Communication Format:** Format per protocol TCP w/ port + IP Ethernet envelope reverse at destination.

**Forensic Challenges**

- **Mapping Changes:** Permanent or temp changes in name-to-IP mapping.
- **Redirection:** Can redirect browsers which hinders investigations.

---

# Basic Network Utilities

**Configuration**

- `ipconfig` / `ifconfig` — Displays IP and gateway information for Windows or UNIX/Linux.
- `ipconfig /all` — Shows hostname and when the IP was obtained.

**Connectivity**

- `ping` — Echo packets to test reachability, round-trip time, and TTL.
- `ping -?` — Use this flag to explore additional command options.

**Tracing**

- `tracert` / `traceroute` — Identifies the path and hops taken to a destination.
- ⚠ *Forensic Note: Useful for troubleshooting; NOT reliable for forensics.*

---

<!-- _class: section-divider -->

# Obscured Info & Anti-Forensics

---

# Obscured Information

**Methods of Hiding Data**

- Encryption
- Steganography
- Compression
- Proprietary formats

⚠ **Forensic Note:** May need to extract evidence **LIVE** if encryption is active.

**Primary Usage**
Used by **criminals** AND **legit companies** (to protect intellectual property).

---

# Anti-Forensics Techniques

> **Goal: Perpetrators actively hinder investigations through various technical means.**

**Identity & Logs**
Hiding via public networks (libraries, cafes) or destroying system logs to mask activity.

**Data Destruction**
Wiping buffers, overwriting free space, or physically damaging devices.

---

# Anti-Forensics Techniques (Contd)

**Data Hiding**
Using reserved sectors, hidden partitions, or misleading file extensions.

**Transformation**
Encryption and steganography to make data unreadable or invisible.

**File System Alteration**
Corrupting NTFS structures or metadata to derail forensic tools.

---
<!-- _class: section-divider -->

# The Daubert Standard

---

# Daubert Standard

**Legal rule for admitting expert scientific testimony.**
Judges assess if reasoning and methodology are scientifically valid.

**Key Factors for Admissibility**

- Testability
- Peer review
- Known error rates
- Established standards
- General acceptance in scientific community

---

# Daubert Standard (Contd)

**For Computer Forensics — Mandatory Practices:**

- Use widely-accepted methods
- Document everything
- Maintain strict chain of custody

---
<!-- _class: section-divider -->

# US Laws Affecting Digital Forensics

---

# Key US Laws (1/3)

**Federal Privacy Act 1974** — Covers federal agency record systems.

| Law | Description |
|-----|-------------|
| **Privacy Protection Act 1980 (PPA)** | Protects journalists' work product. |
| **FISA 1978** | Foreign intel collection; requires FISA court warrant. |
| **ECPA 1986** | Electronic communications privacy, disclosure, and interception. |

---

# Key US Laws (1/3) Contd

**Federal Privacy Act 1974** — Covers federal agency record systems.

| Law | Description |
|-----|-------------|
| **Computer Security Act 1987** | Establishes federal computer security minimums. |
| **CALEA 1994** | Wiretap law; expanded in 2004 to wireless and packet data. |
| **18 U.S.C. § 2701** | Unauthorized access to stored comms; penalties up to 5 years. |

---

# Key US Laws (2/3)

| Law | Description |
|-----|-------------|
| **Communications Decency Act 1996** | Covers minors and indecent material. |
| **Telecommunications Act 1996** | Privacy and disclosure of in-motion data. |
| **Child Protection Act 1998** | Child Protection & Sexual Predator Punishment. |
| **COPPA 1998** | Online privacy of children under 13. |

---

# Key US Laws (2/3) Contd

| Law | Description |
|-----|-------------|
| **DMCA 1998** | Anti-circumvention of copyright protection. |
| **Wireless & Public Safety Act 1999** | GPS and emergency communication services. |
| **USA PATRIOT Act** | Main law for collecting internet content/metadata. |
| **Sarbanes-Oxley 2002** | Records retention and destruction (public co.). |

---

# Key US Laws (3/3)

**18 USC 1030 — Fraud + Related Activity w/ Computers (hacking)**

| Law | Description |
|-----|-------------|
| **18 USC 1020** | Fraud w/ Access Devices (routers, etc.) |
| **18 USC § 1028A** | Identity Theft + Aggravated Identity Theft |

**18 USC § 2251 — Sexual Exploitation of Children**

- § 2260 — prohibits explicit minor depictions for US import
- § 2252 — possession/distribution/receipt of CP
- § 2252A — activities related to CP material

---

# Warrants & 4th Amendment

**4th Amendment**
Protects against unreasonable searches and seizures.

**Definition of Search**
Seizing property or violating a reasonable expectation of privacy. No privacy in public info.

**Warrants & Consent**
Required unless plain sight. Consent must be from the proper party and within scope.

---

# Warrants & 4th Amendment (Contd)

**Warrantless Exceptions**
Border crossings or imminent destruction of evidence (e.g., US v. David).

**Scope of Warrant (US v. Schlingloff)**
Search must not exceed warrant limits. In US v. Schlingloff, an ID theft warrant led to FTK use, making CP discovery admissible.

---
<!-- _class: section-divider -->

# Federal Guidelines

---

# FBI Guidelines

**Preparation**
Consult FBI + Secret Service guidelines first. Activate auditing software.

**Initial Response**
First responders: preserve system state. Back up ALL data — logs, altered files included.

**Evidence Handling**
Secure diverse evidence: drives, logs, emails, phone data. Always work with COPIES.

**Resources:** Reference FBI cybercrimes page.

---

# Secret Service — Golden Rules

**Scene Safety & Evidence Preservation**
Ensure scene safety. Preserve computer evidence immediately if crime suspected.

**Legal & Privacy Basis**
Confirm legal basis (plain view, warrant, or consent). Assess special legal/privacy considerations (doctors, attorneys).

---

# Secret Service — Golden Rules (Contd)

**System Handling**

- Don't access files — if computer off, leave off.
- If on — properly shut down, prepare for transport.
- If destruction suspected — unplug immediately.

**Documentation**
Photograph screens (if on), location, and all attached media.

---

# RCFL Program

**National Network**
Regional Computer Forensics Laboratory (RCFL) — a nationwide network for digital evidence examination.

**Support & Staffing**
Funded and supported by the FBI; staffed by state, local, and federal personnel.

**Key Impact**
Trained nearly 5,000 personnel in 2008. Focuses on criminal and national security cases.

**Case Types**
Terrorism, fraud, and homicide.

**Resources:** <www.rcfl.gov>
