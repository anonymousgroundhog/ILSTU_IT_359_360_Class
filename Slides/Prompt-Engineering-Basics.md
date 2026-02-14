Prompting is the art of communicating with an AI to get the most accurate, relevant, and creative output possible. Think of it like giving instructions to a highly capable, yet sometimes overly literal, intern.

Here is a breakdown of the foundational elements of a strong prompt.

---

## **The Core Components (C.R.E.D.O.)**

A "perfect" prompt usually contains these five elements:

* **Context:** Provide background info. Who are you? Who is the audience? Why do you need this?
* **Role:** Assign the AI a persona (e.g., "Act as a senior forensic accountant" or "Act as a Python tutor").
* **Exclusion:** Tell the AI what *not* to do (e.g., "Do not use jargon" or "Avoid mentioning specific competitors").
* **Details:** Be specific about the topic, length, and tone.
* **Output:** Define the format (e.g., a table, a list of bullet points, or a piece of code).

---

## **Foundational Techniques**

### **1. Zero-Shot vs. Few-Shot Prompting**

* **Zero-Shot:** You give a direct command without examples.
* *Example:* "Translate this sentence to French."


* **Few-Shot:** You provide a few examples of the input-output relationship to "prime" the model.
* *Example:* "Input: Apple -> Output: Fruit. Input: Carrot -> Output: Vegetable. Input: Salmon -> Output: [Model fills in 'Fish']"



### **2. Chain of Thought (CoT)**

Encourage the AI to "think out loud" or "work step-by-step." This is particularly effective for logic, math, or complex coding tasks.

* *Prompt Phrase:* "Let's think through this step-by-step to ensure the logic is sound."

### **3. Iterative Refinement**

Prompting is rarely a one-and-done process. If the first result is off:

* **Ask for critiques:** "What information are you missing to make this better?"
* **Narrow the scope:** "That was too broad. Focus only on the 'implementation' section."

---

## **Common Formatting Tips**

To keep your prompts clean and readable for the model, use structural markers:

| Marker | Purpose |
| --- | --- |
| **###** | Use triple hashtags to separate sections of your prompt. |
| **""** | Use quotes to indicate text you want the AI to analyze or rewrite. |
| **[ ]** | Use brackets for placeholders or specific constraints. |

---

## **The "Prompting Golden Rule"**

**Specific inputs lead to specific outputs.** If you ask a vague question like "Tell me about accounting," you will get a generic textbook summary. If you ask, "Explain the impact of IFRS 16 on airline balance sheets for an undergraduate student," you will get a tailored, useful response.

