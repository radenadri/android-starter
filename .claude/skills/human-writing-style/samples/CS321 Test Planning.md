1. ## **Test Planning**

   

   ### **I. Planning the Testing Process**

   The testing process was planned to ensure the system was thoroughly validated for functionality, performance, and user experience. The primary objectives were:  
1. Validate the correctness of individual backend and frontend components.  
2. Ensure seamless integration between components and external dependencies.  
3. Test the system’s performance under various conditions.  
4. Verify the user interface and overall user experience.  
   The backend was tested for API correctness, utility function behavior, database interactions, and WebSocket streaming.   
   The frontend was tested for proper component rendering, user interactions, and end-to-end workflows.

   ### **II. Incorporating Testing in Development**

   Testing was conducted after the development of core features, focusing on ensuring that the system worked as expected and identifying any major issues before deployment. Initially, manual tests were performed to identify major issues and understand system behavior before automating tests. Automated tests were implemented to validate the backend and frontend once manual tests were completed to ensure that testing is consistent and repeatable. For backend testing, mocks were used extensively to simulate dependencies such as MongoDB and OpenAI APIs.   
   Here is a detailed breakdown of different testing techniques that has applied:  
   **Backend Testing**  
1. **Unit Testing**:  
   * Focused on testing individual utility functions such as updating summaries and constructing prompts.  
2. **Integration Testing**:  
   * Validated interactions between backend components such as API endpoints and session management.  
3. **End-to-End Testing**:  
   * Tested real-world scenarios such as WebSocket-based Text-to-Speech (TTS) streaming.  
4. **Mocking**:  
   * External services like OpenAI and MongoDB were mocked to isolate functionality and simulate realistic behaviors.

**Frontend Testing**

1. **Unit Testing**:  
   * Tested React components to ensure they rendered correctly and responded to user actions.  
2. **Integration Testing**:  
   * Validated communication between frontend components and backend APIs.  
3. **End-to-End Testing**:  
   * Automated browser interactions, code execution and interview scenarios to test complete user flows.  
4. **Performance Testing**:  
   * Measured the time taken for core operations such as STT transcription, backend response, and TTS conversion.  
5. **UI Testing**:  
   * Verified UI consistency by comparing rendered outputs across versions.

   ---

2. ## **Technology used**		

     
1. **Backend Testing Tools**:  
   * **Pytest**: Framework for unit, integration, and end-to-end testing.  
   * **Unittest Mock**: Simulated external dependencies like OpenAI APIs and MongoDB.  
   * **Starlette TestClient**: Tested WebSocket and HTTP endpoints.  
   * **Asyncio**: Handled asynchronous functionality for WebSocket and database tests.  
2. **Frontend Testing Tools**:  
   * **Playwright**: Automated end-to-end browser testing.  
   * **Jest**: Framework for unit and integration testing.  
   * **React Testing Library**: Simulated user interactions with React components.

   ---

3. ##  **Descriptions of the files**

   

1. ### **Backend Test Files:**

   **1\. tests/test\_utils.py ( Triet H )**\- Unit tests for utility functions.  
* Verified correct updates to session summaries.  
* Validated prompt construction using summaries and latest updates.  
  **2\. tests/test\_endpoints.py ( Triet H )** \- Tests for API endpoints.  
* Checked that the root endpoint returned the correct welcome message.  
* Verified session initialization via /api/initialize-question.  
* Simulated OpenAI API to validate feedback generation.  
  3\. **tests/test\_db\_events.py ( Triet H )** \- Validated database-related operations.  
* Ensured MongoDB initialization during app startup.  
* Verified proper database client shutdown.  
  **4\. tests/test\_websocket.py ( Triet H )** \- End-to-end test for WebSocket-based TTS streaming.  
* Validated the WebSocket connection and receipt of audio chunks.

  ### **II. Frontend Test Files**

1. **performance.spec.ts** **( Triet H 60% Alex F 40% )** \- Tested the system's performance during the interview session.

* Measured STT transcription time and backend processing time.

* Validated the TTS conversion and audio delivery.

2. **codeExecution.spec.ts ( Triet H 70%, Alex F 30% )** \- Tested the complete code execution flow.

* Simulated code typing in the editor and running test cases.

* Verified the display of results in the console output.

3. **components/MainContent.test.tsx** **( Triet H 80%, Alex F 20% )** \- Tested the MainContent React component.

* Verified correct rendering of the code editor.

* Simulated running test cases and validated the output.

  ---

4. ## **User Testing**	

   The external user testing totaled 6 different users, 3 from Evan and 3 from Alex. The initial testing plan had 2 of Evan’s testers and 1 of Alex’s testers following a set test plan. The rest of the testers were allowed to freely explore and use the system as they pleased.  
     
   The testing process varied between each user, but maintained strict rules the testers adhered to. Each tester would test the system for 15 minutes, not knowing if the other testers were following the same testing plan as they were. After the 15 minutes, the facilitator (Evan or Alex) collected the testing feedback from the user.  
     
   The testers following a set script were given these instructions:  
1. Sign in on the landing page  
2. Select the Two-Sum problem  
3. Write up your solution code  
4. Run 2 different test cases using the built in tester  
5. Communicate with the Interviewer 3 different times  
6. Submit your feedback

	The testers would follow these steps again for a second leetcode problem.  
	  
The testers allowed to freely explore the system were given the instructions of completing 2 leetcode problems of their choice, and no other instructions.

The feedback acquired from each tester didn’t vary much due to the short span and lack of change to the system between each testing session. The general feedback common throughout the testers is as follows: 

“The system is unique and interesting to use. The idea of an AI interviewer to help communication skills seems helpful.”  
“The code editor feels very familiar (*for context: It is the same code editor as VSCode*) and is something that makes me comfortable as a user.”  
“The feedback provided at the end of the interview is useful at helping identify areas of improvement for me as a user while also highlighting my strengths.”

The feedback from all testers related to improvement of the system is as follows: 

“The built in tester is nice to have, however, the errors passed to the user through the console does not provide context to the user as to what is wrong in the code, as it always throws a JSON error.”  
“The user interface is nice aesthetically, however, the run button for the test cases should be always visible to the user, whether looking at output or test cases.”