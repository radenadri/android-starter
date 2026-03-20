---

# **1\. System Overview**

**Introducing AI Interview Wizard \- Personal Coding Interview Coach**

Are you a software developer looking to ace your next coding interview? Look no further\! AI Interview Wizard is your companion in mastering technical interviews.

Imagine having a patient, adaptive AI interviewer available 24/7, ready to challenge you with real-world coding problems and provide instant, personalized feedback. That's exactly what the AI Interview Wizard offers\!

**Key Features:**

* Live AI-Powered Interviews: Engage in realistic coding interviews with our advanced AI, simulating various interviewer personalities.  
* Real-Time Feedback: Receive instant analysis of your code quality, problem-solving approach, and communication skills.  
* Interactive Code Editor: Write, test, and debug your code in our sleek, in-browser editor with syntax highlighting.  
* Speech Recognition: Practice explaining your thought process out loud, just like in a real interview.  
* Personalized Learning Path: Track your progress, earn experience points, and unlock achievements as you improve.  
* Comprehensive Performance Insights: Get detailed post-interview summaries to identify your strengths and areas for improvement.

Whether you're a beginner or a cracked developer, AI Interview Wizard adapts to your skill level, providing an experience to boost your confidence and sharpen your skills. With our approach, you'll find yourself addicted to improving, climbing leaderboards, and unlocking new challenges.

Don't just prepare for your next coding interview \- master it with an AI Interview Wizard. Your dream tech job is just a few practice sessions away

---

# **2\. Rationale for building the system**

As computer science students, we have become accustomed to completing technical interviews before landing a certain job or internship we applied for. It’s become a meme that computer science students ‘grind leetcode’ to practice for these interviews. 

While practicing leetcode is good for getting better at technical skills, we were unable to find a tool that helps people communicate their thought process while leetcoding, which is the expectation during interviews.

Our solution is a leetcoding platform that allows you to practice technical skills, as well as hone your communication skills using an advanced AI model that can analyze your code and allow you to talk out your thought process, and receive feedback.

**Existing Solutions and their Shortcomings:**

1. **LeetCode, HackerRank, CodeSignal, etc.**  
   These platforms focus primarily on coding practice and technical skill improvement. However, they lack features that help candidates develop their interview communication skills, especially the ability to articulate their thought process effectively, which is often a make-or-break factor in interviews.  
2. **Pramp**  
   Pramp offers peer-to-peer mock interviews, allowing users to practice technical and communication skills simultaneously. However, it relies on real human interviewers, which diminishes flexibility. Users need to match with other participants and schedule sessions, which limits the ability to practice on-demand. This means users can't access the platform whenever they want and must adhere to set schedules, reducing the convenience and control over their preparation.  
3. **AlgoExpert**  
   AlgoExpert provides a curated set of coding challenges with video explanations, but it lacks a live, interactive component.   
4. **HeadStarter AI Fellowship**  
   The only other known tool with a similar feature set is part of the HeadStarter AI Fellowship, which provides advanced AI-driven interview coaching. However, this tool is restricted to fellowship participants and inaccessible to the general public.

---

# **3\. Methodology used** 

To develop the requirements for AI Interview Wizard, we approached it by analyzing the market, team expertise, and feasibility assessment. Our goal was to create a system that offers a unique and valuable experience for users preparing for coding interviews. Below is a detailed breakdown of our process:

1. **Competitive Analysis:**  
* To begin with, we researched existing tools in the market, such as LeetCode, Pramp, and AlgoExpert, to understand their strengths and limitations. This analysis helped us identify the gap in real-time feedback on communication skills and flexibility for on-demand practice.  
* From this analysis, we confirmed the need for features like instant AI-driven feedback, a variety of coding problems, and an interactive coding environment, which existing solutions lacked or did not fully address.  
2. **User Value Validation:**  
* To ensure these features would provide real value to users, we further assessed each requirement against the following criteria:  
  * **Relevance:** Does the feature directly address user needs, such as improving coding skills and interview communication?  
  * **Engagement:** Does it make the experience engaging and motivating? (e.g., reward systems and progress tracking)  
  * **Accessibility:** Is the feature accessible anytime, without barriers like scheduling constraints?  
3. **Brainstorming User Experience:**  
* We began by putting ourselves in the shoes of a typical user (software developer) practicing for technical interviews. We asked ourselves key questions:   
  * How would we want to interact with an AI that helps us practice coding?  
  *  What type of feedback would be most valuable?   
  * How could the experience be both engaging and educational?  
* We outlined key interactions, such as the ability to communicate with the AI through voice or text, allowing users to articulate their thought processes naturally, similar to real interview scenarios.  
4. **Team Expertise:**  
* Considering the technical components of the system, like AI models for feedback, speech recognition, and the interactive coding environment, would perform adequately in real-world scenarios. Given the team's prior experience with voice technologies, we were confident in the system’s capability to handle speech inputs accurately.

---

# **4\. Functional Requirements**

### **Priority Scale:**

* ### **High (1):** Critical features that are essential to the product's core functionality and user value. These features must be implemented to deliver the minimum viable product (MVP).

* ### **Medium (2):** Important features that enhance the user experience and engagement but are not immediately critical for the core functionality.

* ### **Low (3):** Nice-to-have features that provide additional value but can be deferred for future iterations.

### **Estimation Scale:**

* ### **Small (S):** 1-3 days

* ### **Medium (M):** 4-7 days

* ### **Large (L):** 8-14 days

* ### **Extra Large (XL):** 15+ days

### **Functional Requirements:**

1. ### **User Onboarding & Profile Setup (Priority: 1, Estimate: L)**

   1. ### **Description:** An onboarding process where users can create accounts, set up their profiles, select coding language preferences, and set difficulty levels.

   2. ### **Priority Justification:** High priority as this is the first interaction users will have, essential for personalizing the experience and it sets the tone for their experience. It should be quick, engaging, and informative.

   3. ### **Estimation Justification**: Large due to the need for integration with authentication systems, user preference setup, and initial UI design.

2. ### **AI-Powered Live Interview Simulation (Priority: 1, Estimate: XL)**

   1. ### **Description:** Conduct real-time coding interviews with AI asking questions and providing feedback. Users interact with an AI interviewer, solving coding problems and explaining their thought processes aloud.

   2. ### **Priority Justification:** High priority as this is the core feature of the application, simulating real interview conditions. This is what differentiates it from other ‘leetcode’ platforms. 

   3. ### **Estimation Justification:** Extra Large due to the complexity of real-time AI interaction, question generation, and adaptive feedback mechanisms.

3. ### **Real-time Speech-to-Text Transcription (Priority: 1, Estimate: L)**

   1. ### **Description:** Convert the user's verbal explanations to text during the interview.

   2. ### **Priority Justification:** High priority as it directly enables the AI's ability to provide feedback on communication skills, direct users, and provide feedback in real time.

   3. ### **Estimation Justification:** Large due to the need for integrating reliable speech recognition APIs and ensuring low-latency performance.

4. ### **Code Editor with Syntax Highlighting (Priority: 1, Estimate: M)**

   1. ### **Description:** Provide an in-browser code editor for users to write and test code.

   2. ### **Priority Justification:** High priority as users need to solve coding problems during the interview.

   3. ### **Estimation Rationale:** Medium due to existing libraries that can be adapted for syntax highlighting and code execution.

5. ### **Real-Time AI Feedback System (Priority: 1, Estimate: XL)**

   1. ### **Description:** Analyze user's code and verbal explanations to provide real-time feedback, including code analysis, time complexity, and verbal communication clarity.

   2. ### **Priority Justification:** High priority as it is crucial for improving user's performance and simulating interviewer responses. Immediate feedback helps users learn and improve, simulating real coding interviews more accurately. 

   3. ### **Estimation Rationale:** Extra Large due to the integration of multiple AI models and the need for real-time processing of code and speech data.

6. ### **Gamification Features: XP System, Badges, and Leaderboards (Priority: 2, Estimate: L)**

   1. ### **Description:** Users earn experience points for completing interviews, unlock badges for achievements, and can compare their performance on leaderboards.

   2. ### **Priority Justification:** Medium priority as it enhances engagement but is not critical for core functionality.

   3. ### **Estimation Rationale:** Large due to the need for database tracking, UI components, and leaderboard logic.

7. ### **Post-Interview Summary and Performance Insights (Priority: 2, Estimate: L)**

   1. ### **Description:** Provide a detailed performance breakdown after each interview session, including strengths, areas for improvement, and specific feedback on communication and code quality.

   2. ### **Priority Justification:** Medium priority as it significantly enhances the learning aspect of the product by offering valuable insights for user improvement and encourages users to keep improving based on specific feedback. 

   3. ### **Estimation Rationale:** Large due to data aggregation from various components and generating comprehensive insights.

8. ### **Multiple AI Interviewer Profiles (Priority: 2, Estimate: M)**

   1. ### **Description:** Implement different AI personalities (strict, supportive, neutral).

   2. ### **Priority Justification:** Medium priority, adding valuable variety to the interview experience to simulate various real-world interview scenarios, helping users adapt to different interviewer styles.

   3. ### **Estimation Rationale:** Medium due to the design and implementation of various AI behavioral models.

### **Dependencies:**

* ### User Onboarding & Profile Setup (1) is required for all other features.

* ### AI-Powered Live Interview Simulation (2) depends on Real-time Speech-to-Text Transcription (3) and Code Editor (4).

* ### Real-Time AI Feedback System (5) depends on Live Interview Simulation (2) and Speech-to-Text Transcription (3).

* ### Gamification Features (6) depend on data from Interview Sessions (2) and Feedback System (5).

* ### Post-Interview Summary (7) depends on data from Interview Sessions (2) and Feedback System (5).

		

---

# **5\. Non-Functional Requirements**

1. **Performance**

* **Description**: The system must ensure rapid response times, particularly for real-time features.

* **Measurement**: The system should support real-time speech-to-text conversion with a latency of less than 500ms.

* **Constraint**: This may require optimization of speech processing algorithms and server infrastructure.

2. **Usability**

* **Description**: The platform should offer an intuitive and responsive user interface, ensuring a smooth user experience from registration to interview completion.

* **Measurement**: New users should be able to start their first interview within 5 minutes of registration, with a task completion rate of 90%.

* **Constraint**: Necessitates an intuitive UI design and streamlined onboarding process.

---

# **6\. Contributions**

**Project Management** by Triet

**Individual Contributions:**

1. **Mansoor \-** Section 1: System Overview  
2. **Evan \-** Section 2: Rationale for Building the System  
3. **Alex \-** Section 3: Methodology Used  
4. **Triet \-** Sections 4 & 5: Functional and Non-Functional Requirements