**What is Software Quality? What are the factors that impact the quality of the product?**  

Software Quality is basically about making sure a product meets its specifications. However, this seemingly simple concept gets pretty complex when it comes to software systems. There are several challenges that make this tricky: conflicts exist between what customers want (like efficiency and reliability) and what developers need (like maintainability and reusability). Plus, many quality requirements are hard to specify clearly, and software specifications themselves are often incomplete and inconsistent. Because of all these challenges, the focus often shifts toward whether the software is 'fit for purpose' rather than just checking if it follows exact specifications.

Several key factors impact software quality. First, there's the quality of the development process itself. A good process is typically necessary to produce good software. This becomes particularly important because many quality attributes are hard to measure directly. The quality of the people involved in development is another crucial factor. The skills and experience of the development team play a huge role in determining how good the final product will be.

The technology used in development represents another significant factor. The choice of tools, frameworks, and tech infrastructure can either boost or limit the quality of the final product. Additionally, practical constraints like cost, time, and schedule affect product quality since these influence decisions throughout development.

Software quality includes various attributes that can be grouped into three main categories. First, there are safety-related attributes like safety, security, reliability, resilience, and robustness. Then come development-related attributes including understandability, testability, adaptability, modularity, and complexity. Finally, usage-related attributes consist of portability, usability, reusability, efficiency, and learnability. However, it's important to note that optimizing all these attributes simultaneously in a single system isn't possible. Trade-offs are inevitable, for instance, making something more robust might require sacrificing some performance. These various factors and attributes create complex considerations that need careful management throughout development.

**Read the Netflix Simian article and discuss Netflix’s strategy for improving availability and reliability.**

Based on the article, Netflix takes a very interesting approach to improving their system's reliability and availability. Their main strategy focuses on building a fault-tolerant system that won't break down even when some parts fail. What makes their approach unique is their "Simian Army", essentially automated tools that intentionally break different parts of their production system to test how well it handles failures.The Simian Army consists of several key tools such as:

Chaos Monkey randomly shuts down production instances to see if the system can handle it. They run these tests during business hours when engineers are around to fix any problems, which helps them create automatic recovery systems for when real failures happen.

Latency Monkey adds artificial delays between services talking to each other. This helps test how well services cope with slow responses or complete failures without actually breaking anything.

Doctor Monkey keeps an eye on instance health through various checks like CPU load. If it finds unhealthy instances, it takes them out of service and eventually shuts them down completely.

Conformity Monkey looks for instances that aren't following best practices and shuts them down. For example, if it finds instances not in an auto-scaling group, it terminates them so they can be set up properly.

Security Monkey focuses on finding security problems like wrong security group settings and makes sure all their certificates are valid and up to date.  
Chaos Gorilla takes things even further by simulating an entire availability zone outage to make sure services can automatically shift to working zones without anyone noticing.

The Simian Army tools significantly improve Netflix's system availability and reliability in several ways. First, by constantly testing different failure scenarios, the system becomes more resilient to real failures since recovery mechanisms are already in place and tested. Second, automated monitoring and enforcement of best practices through tools like Conformity Monkey and Security Monkey helps prevent potential issues before they impact the system. Lastly, simulating large-scale failures with Chaos Gorilla ensures the system can handle even major outages without disrupting service. This combination of proactive testing, monitoring, and automated recovery mechanisms allows Netflix to maintain high availability despite the complexities of cloud infrastructure.

**What is Process Improvement? Why do we need it? Briefly discuss the various stages of process improvement.** 

Process Improvement essentially focuses on understanding and modifying existing processes to enhance software quality, reduce costs, and speed up development time. Software companies implement this approach to improve their overall development process through Process Maturity Approach, concentrating on improving process and project management while implementing good software engineering practices. In addition with Agile Approach, which emphasizes iterative development and reducing software process overheads.

Process Improvement becomes necessary because of several factors. First, it helps enhance software quality by introducing new activities that change how software is developed and tested. Second, it improves specific process attributes like development time. Importantly,  there isn't a one-size-fits-all solution, which means that each company needs to develop its own process based on factors like company size, staff skills, software type, market requirements, and company culture.

The Process Improvement lifecycle consists of three main stages. The first stage, Process Measurement, establishes baselines by measuring current process attributes. This stage focuses on measuring key aspects like activity completion time, required resources, and how often specific events occur. Process Measurement requires collecting quantitative data whenever possible.

The second stage, Process Analysis, examines existing processes to understand how different components relate to each other. This stage works closely with Process Measurement since they complement each other. Initial analysis helps determine what points need to be measured, and as measurements are taken, the team develops a deeper understanding of the process being examined.

The final stage, Process Change, involves implementing modifications to existing processes based on the results from the analysis. These changes can take various forms, such as introducing new practices or methods, reordering activities, adjusting deliverables, or creating new roles within the process. 

The Ariane 5 rocket experienced a critical failure during its first test launch in June 1996\. The failure occurred about 37 seconds after takeoff due to a software issue in the inertial reference system, which handled navigation and trajectory maintenance. While the immediate cause was a software error, the deeper investigation reveals that there were other systemic issues in the development process.

The main technical failure stemmed from a numeric overflow error in the system. The software tried to convert a floating-point number representing horizontal velocity into a 16-bit integer. However, since the horizontal velocity exceeded the maximum value of 32,768 that could be stored in 16 bits, it caused a numeric overflow. The system lacked an exception handler for this overflow, which led to the default Ada programming language runtime exception handler shutting down the system.

Several key factors contributed to this failure. First, the development team reused the inertial reference system from Ariane 4 without proper modifications. Ironically, this functionality wasn't even needed for Ariane 5 since ground-based systems handled these computations. The developers kept the unchanged software to avoid introducing new problems, but this decision proved problematic.

Second, significant testing and validation issues existed. No tests were developed for this aspect since Ariane 5 didn't require this functionality. Additionally, testing relied on a simulator rather than the actual inertial reference system, and this simulator didn't include the problematic functionality since it wasn't considered necessary for Ariane 5's operation.

Third, the system design had fundamental flaws. Both the main and backup computers ran identical software, causing them to fail simultaneously. The default exception handling mechanism that shut down the system proved inappropriate for a critical system. Furthermore, the design failed to account for the different operating conditions between Ariane 4 and 5, particularly the higher horizontal velocities in Ariane 5\.

