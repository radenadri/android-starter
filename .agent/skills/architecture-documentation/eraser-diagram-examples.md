# Eraser Diagram Examples

Real-world architecture diagram examples using Eraser's diagram-as-code syntax, drawn from a production Azure AI RAG system.

**Official Examples:** https://docs.eraser.io/docs/examples

**Diagram type:** Cloud Architecture Diagram (all figures)

---

## Figure 1 -- Master Diagram

*High-level architecture overview of the AI Support Agents system, Azure components, and data flows.*

**Type:** Cloud Architecture Diagram

```eraser
// Figure 1 - Master Diagram: LCS AI RAG System Architecture
// Type: Cloud Architecture Diagram

direction right
colorMode bold

// External Actors
Actors [color: blue, label: "External Actors"] {
  Frontend [icon: react, label: "Frontend Client"]
  Content Admin [icon: user, label: "Content Admin"]
}

// Azure Virtual Network
Azure VNet [icon: azure-virtual-network, color: green, label: "Azure Virtual Network"] {
  Container Apps [icon: docker, label: "Container Apps Environment"] {
    Backend [icon: fastapi, label: "FastAPI Backend"]
    Chunker [icon: fastapi, label: "Chunker Container App"]
    CSVStore [icon: database, label: "CSVStore Service"]
  }

  Functions [icon: azure-function-apps, label: "Azure Function App"] {
    load_csv [icon: python, label: "load_csv.py"]
    process_others [icon: python, label: "process_others.py"]
    monitor_deletions [icon: python, label: "monitor_deletions.py"]
  }

  Private Endpoints [icon: network, label: "Private Endpoint Subnet"] {
    PE OpenAI [icon: azure-cognitive-services, label: "PE: OpenAI"]
    PE Search [icon: azure-search-services, label: "PE: AI Search"]
    PE Cosmos [icon: azure-cosmos-db, label: "PE: CosmosDB"]
    PE KeyVault [icon: azure-key-vault, label: "PE: Key Vault"]
  }
}

// Azure PaaS Services
Azure PaaS [color: orange, label: "Azure PaaS Services"] {
  OpenAI [icon: azure-cognitive-services, label: "Azure OpenAI\ngpt-5-mini"]
  AI Search [icon: azure-search-services, label: "Azure AI Search\nBM25 + HNSW"]
  CosmosDB [icon: azure-cosmos-db, label: "Azure CosmosDB\nServerless"]
  Key Vault [icon: azure-key-vault, label: "Azure Key Vault"]
  Doc Intelligence [icon: azure-cognitive-services, label: "Document Intelligence"]
  Blob Storage [icon: azure-blob-storage, label: "Azure Blob Storage"]
}

// Observability
Observability [color: purple, label: "Observability"] {
  App Insights [icon: azure-application-insights, label: "Application Insights"]
  Log Analytics [icon: azure-log-analytics-workspaces, label: "Log Analytics"]
}

// External
External [color: red, label: "External Services"] {
  Snowflake [icon: snowflake, label: "Snowflake\nFile metadata"]
}

// User-facing
Frontend > Backend: HTTPS + Bearer JWT [textSize: large]
Content Admin > Blob Storage: Upload PDF/DOCX/XLSX/CSV [textSize: large]

// Query flow (via private endpoints)
Backend > PE OpenAI > OpenAI: Route + generate [textSize: large]
Backend > PE Search > AI Search: Hybrid search [textSize: large]
Backend > PE Cosmos > CosmosDB: Persist conversations [textSize: large]
Backend > PE KeyVault > Key Vault: Retrieve secrets [textSize: large]
Backend > CSVStore: CSV queries [textSize: large]

// Document processing
Blob Storage > load_csv: Blob trigger (csv/) [textSize: large]
Blob Storage > process_others: Blob trigger (others/) [textSize: large]
process_others > Chunker: HTTP POST /process [textSize: large]
Chunker > Doc Intelligence: DOCX extraction [textSize: large]
Chunker > AI Search: Upload chunks + vectors [textSize: large]
load_csv > Snowflake: CSV metadata [textSize: large]
process_others > Snowflake: Dedup + track [textSize: large]
monitor_deletions > Snowflake: Reconcile deletions [textSize: large]
CSVStore > Blob Storage: Load CSVs at startup [textSize: large]

// Telemetry
Backend --> App Insights: Traces [textSize: large]
App Insights --> Log Analytics: Backing store [textSize: large]
OpenAI --> Log Analytics: Diagnostics [textSize: large]
AI Search --> Log Analytics: Diagnostics [textSize: large]
CosmosDB --> Log Analytics: Diagnostics [textSize: large]
```

---

## Figure 2 -- End-to-End Query Flow Sequence Diagram

*Traces a single user query from submission through JWT validation, routing, search, streaming, and persistence.*

**Type:** Cloud Architecture Diagram

```eraser
// Figure 2 - End-to-End Query Flow
// Type: Cloud Architecture Diagram

direction right
colorMode bold

// Client
Frontend [icon: react, color: blue, label: "Frontend Client"] {
  EventSource [icon: monitor, label: "POST /api/chat"]
}

// Backend
FastAPI Backend [icon: fastapi, color: green, label: "FastAPI Backend (stream.py)"] {
  JWT Auth [icon: python, label: "JWT Validation\nEmail + expiry check"]
  Router [icon: python, label: "Query Router\ngpt-5-mini"]
  Stream Handler [icon: python, label: "Stream Handler"]
}

// AI Services
AI Services [icon: azure-cognitive-services, color: orange, label: "Azure AI Services"] {
  Router LLM [icon: azure-cognitive-services, label: "Router LLM\ngpt-5-mini"]
  AI Search [icon: azure-search-services, label: "Azure AI Search"]
  Answer LLM [icon: azure-cognitive-services, label: "Answer LLM\ngpt-5-mini"]
}

// Persistence
Persistence [icon: azure-cosmos-db, color: purple, label: "Persistence"] {
  CosmosDB [icon: azure-cosmos-db, label: "Azure CosmosDB\nAwaited before [DONE]"]
}

// Request flow
EventSource > JWT Auth: HTTPS + Bearer JWT [textSize: large]
JWT Auth > Router: Validated request [textSize: large]
Router > Router LLM: Chat completion (tool definitions) [textSize: large]
Router LLM > AI Search: function_general_company [textSize: large]
AI Search > Stream Handler: Ranked chunks (top 20) [textSize: large]
Stream Handler > Answer LLM: Context + query (stream=True) [textSize: large]
Answer LLM > EventSource: SSE: text-delta tokens [textSize: large]
Stream Handler > CosmosDB: Persist after stream [textSize: large]
```

---

## Figure 3 -- Query Router Internal Flow

*Shows how incoming queries are analyzed for language, classified by intent, and routed to the correct agent.*

**Type:** Cloud Architecture Diagram

```eraser
// Figure 3 - Query Router
// Type: Cloud Architecture Diagram

direction right
colorMode bold

// Input
User Query [icon: user, label: "User Query"]

// Router
Router [icon: azure-cognitive-services, color: green, label: "Query Router (gpt-5-mini)"] {
  Language Check [icon: python, label: "Language Detection"]
  Intent Classification [icon: python, label: "Intent Classification\nFunction calling"]
}

// Agent Selection
Agents [color: blue, label: "Agent Selection"] {
  RAG Agent [icon: azure-search-services, label: "RAG Agent\nfunction_general_company"]
  CSV Agent [icon: database, label: "CSV Data Agent\ncompany_data_analysis"]
  Direct Fallback [icon: azure-cognitive-services, label: "Direct LLM Fallback"]
}

// Output
Output [color: orange, label: "Response Pipeline"] {
  SSE Stream [icon: python, label: "SSE Streaming"]
  CosmosDB [icon: azure-cosmos-db, label: "CosmosDB\nAsync persistence"]
}

// Connections
User Query > Language Check: Incoming query [textSize: large]
Language Check > Intent Classification: English [textSize: large]
Intent Classification > RAG Agent: Document queries [textSize: large]
Intent Classification > CSV Agent: Structured data queries [textSize: large]
Intent Classification > Direct Fallback: No tool match [textSize: large]
RAG Agent > SSE Stream [textSize: large]
CSV Agent > SSE Stream [textSize: large]
Direct Fallback > SSE Stream [textSize: large]
SSE Stream > CosmosDB: Persist after stream [textSize: large]
```

---

## Figure 4 -- RAG Agent Internal Flow

*Details the retrieval-augmented generation pipeline: query validation, hybrid search, context assembly, and grounded response generation.*

**Type:** Cloud Architecture Diagram

```eraser
// Figure 4 - RAG Agent Pipeline
// Type: Cloud Architecture Diagram

direction right
colorMode bold

// Input
User Query [icon: user, label: "User Query"]

// Retrieval
Retrieval [icon: azure-search-services, color: blue, label: "Azure AI Search (Hybrid)"] {
  BM25 [icon: azure-search-services, label: "BM25 Search"]
  HNSW [icon: azure-search-services, label: "HNSW Vector Search"]
  RRF [icon: python, label: "Reciprocal Rank Fusion\nk=60, top_k=20"]
}

// Context
Context [icon: python, color: green, label: "Context Assembly"] {
  Chunk Builder [icon: python, label: "Chunk Builder\nTitle + Content per chunk"]
}

// Generation
Generation [icon: azure-cognitive-services, color: orange, label: "Azure OpenAI (gpt-5-mini)"] {
  Answer LLM [icon: azure-cognitive-services, label: "Answer LLM\nstream=True"]
}

// Output
Response [icon: python, color: purple, label: "Response"] {
  SSE Stream [icon: python, label: "Async Stream\nYield tokens via SSE"]
}

// Connections
User Query > BM25: Query text [textSize: large]
User Query > HNSW: Query embedding [textSize: large]
BM25 > RRF: Keyword results [textSize: large]
HNSW > RRF: Vector results [textSize: large]
RRF > Chunk Builder: Top 20 ranked chunks [textSize: large]
Chunk Builder > Answer LLM: System prompt + context [textSize: large]
Answer LLM > SSE Stream: Token-by-token [textSize: large]
```

---

## Figure 5 -- Document Processing Pipeline

*Event-driven pipeline: document upload, format detection, extraction, chunking, summarization, indexing, and lifecycle management.*

**Type:** Cloud Architecture Diagram

```eraser
// Figure 5 - Document Processing Pipeline
// Type: Cloud Architecture Diagram

direction right
colorMode bold

// Entry
Content Admin [icon: user, label: "Content Admin"]

// Storage Layer
Blob Storage [color: blue, label: "Azure Blob Storage"] {
  others [icon: azure-blob-storage, label: "others/"]
  csv [icon: azure-blob-storage, label: "csv/"]
  archive [icon: azure-blob-storage, label: "archive/"]
  error [icon: azure-blob-storage, label: "error/"]
}

// Event Triggers
Azure Functions [icon: azure-function-apps, color: green, label: "Azure Functions"] {
  load_csv [icon: python, label: "load_csv.py\nBlob trigger"]
  process_others [icon: python, label: "process_others.py\nBlob trigger"]
  monitor_deletions [icon: python, label: "monitor_deletions.py\nTimer trigger"]
}

// Processing
Chunker [icon: docker, color: purple, label: "Chunker Container App"] {
  Queue [icon: queue, label: "Thread Queue"]
  Extraction [icon: python, label: "Format Extraction"]
  Chunking [icon: python, label: "Markdown Chunker"]
}

// AI Services
AI Services [icon: azure-cognitive-services, color: orange, label: "Azure AI Services"] {
  Doc Intelligence [icon: azure-cognitive-services, label: "Document Intelligence"]
  OpenAI [icon: azure-cognitive-services, label: "Azure OpenAI\ngpt-5-mini"]
}

// Data Layer
Data Layer [color: red, label: "Data & Index Layer"] {
  Snowflake [icon: snowflake, label: "Snowflake\nFile metadata"]
  AI Search [icon: azure-search-services, label: "Azure AI Search\nBM25 + HNSW"]
}

// Connections
Content Admin > others: Upload documents [textSize: large]
Content Admin > csv: Upload CSVs [textSize: large]
others > process_others: Blob trigger [textSize: large]
csv > load_csv: Blob trigger [textSize: large]
process_others > Snowflake: Dedup + upsert metadata [textSize: large]
process_others > Queue: HTTP POST /process [textSize: large]
load_csv > Snowflake: Store CSV metadata [textSize: large]
Queue > Extraction: Dequeue file [textSize: large]
Extraction > Doc Intelligence: DOCX files [textSize: large]
Extraction > Chunking: Markdown output [textSize: large]
Chunking > OpenAI: Summarize chunks [textSize: large]
Chunking > AI Search: Upload chunks + vectors [textSize: large]
AI Search > Snowflake: Update status [textSize: large]
Chunking > archive: On success [textSize: large]
Chunking > error: On failure [textSize: large]
monitor_deletions > Snowflake: Reconcile expired [textSize: large]
monitor_deletions > AI Search: Delete orphaned docs [textSize: large]
```

---

## Figure 6 -- Pandas Agent Internal Flow

*CSV Data Agent: natural language query to pandas code generation, iterative self-correction, and result streaming.*

**Type:** Cloud Architecture Diagram

```eraser
// Figure 6 - Pandas Agent (CSV Data Agent)
// Type: Cloud Architecture Diagram

direction right
colorMode bold

// Input
User Query [icon: user, label: "Natural Language Query"]

// Agent Cache
Agent Layer [icon: python, color: green, label: "Pandas Agent (cached)"] {
  Agent Cache [icon: python, label: "Agent Cache\nKeyed by endpoint + DFs"]
  DataFrames [icon: database, label: "In-Memory DataFrames"]
}

// Code Generation
Code Gen [icon: azure-cognitive-services, color: orange, label: "LLM Code Generation (gpt-5-mini)"] {
  Generator [icon: azure-cognitive-services, label: "Pandas Code Generator\nMax 10 iterations"]
}

// Execution
Execution [icon: python, color: blue, label: "Code Execution"] {
  Executor [icon: python, label: "Execute on DataFrames"]
}

// Output
Response [icon: python, color: purple, label: "Response"] {
  SSE Stream [icon: python, label: "astream_events(v2)"]
}

// Connections
User Query > Agent Cache: Get or create agent [textSize: large]
Agent Cache > DataFrames: Load CSVs [textSize: large]
User Query > Generator: NL query [textSize: large]
Generator > Executor: Generated pandas code [textSize: large]
Executor > Generator: Exception feedback (self-correction) [textSize: large]
Executor > SSE Stream: Formatted result [textSize: large]
```

---

## Figure 7 -- CosmosDB Storage Architecture

*Conversation persistence: post-stream write, feedback upserts, and document schema.*

**Type:** Architecture Diagram

```eraser
// Figure 7 - CosmosDB Storage Architecture
// Type: Cloud Architecture Diagram

direction right
colorMode bold

// Application Layer
FastAPI Backend [icon: fastapi, color: green, label: "FastAPI Backend"] {
  Stream Handler [icon: python, label: "Stream Handler\nstream.py"]
  Feedback API [icon: python, label: "Feedback API\nmain.py"]
}

// Client Layer
Client Layer [icon: python, color: blue, label: "Client Layer"] {
  CosmosDB Client [icon: azure-cosmos-db, label: "CosmosDB Client\nazure-cosmos SDK"]
}

// Azure CosmosDB
Azure CosmosDB [icon: azure-cosmos-db, color: blue, label: "Azure CosmosDB (Serverless)"] {
  lcs_chatbot [icon: database, label: "lcs_chatbot Database"]
  chats [icon: database, label: "chats Container"]
}

// Document Schema
Document Schema [icon: json, color: orange, label: "Document Schema"] {
  Chat Document [icon: json, label: "Chat Document\nmessageId (partition)"]
}

// Connections
Stream Handler > CosmosDB Client: insert_chat_message() [textSize: large]
Feedback API > CosmosDB Client: update_feedback() [textSize: large]
CosmosDB Client > chats: create_item() [textSize: large]
CosmosDB Client > chats: upsert_item() [textSize: large]
chats - Chat Document
```

---

## Figure 8 -- SSE Streaming Protocol

*Token-by-token streaming: tool call fragment assembly, response streaming, and SSE event lifecycle.*

**Type:** Cloud Architecture Diagram

```eraser
// Figure 8 - SSE Streaming Protocol
// Type: Cloud Architecture Diagram

direction right
colorMode bold

// LLM Source
LLM Source [icon: azure-cognitive-services, color: orange, label: "Azure OpenAI (Async Stream)"] {
  Tool Chunks [icon: azure-cognitive-services, label: "Tool Call Fragments"]
  Content Chunks [icon: azure-cognitive-services, label: "Content Tokens"]
}

// Stream Handler
Stream Handler [icon: fastapi, color: green, label: "Streaming Handler (stream.py)"] {
  Tool Assembler [icon: python, label: "Tool Call Assembler"]
  Token Relay [icon: python, label: "Token Relay\nSSE event formatting"]
}

// SSE Events
SSE Protocol [color: blue, label: "SSE Event Types"] {
  Tool Events [icon: python, label: "tool-input-start\ntool-output-available"]
  Text Events [icon: python, label: "text-start\ntext-delta\ntext-end"]
  Control Events [icon: python, label: "start, finish, [DONE]"]
}

// Client
Frontend [icon: react, color: purple, label: "Frontend Client"] {
  EventSource [icon: monitor, label: "EventSource API"]
}

// Connections
Tool Chunks > Tool Assembler: Fragment accumulation [textSize: large]
Content Chunks > Token Relay: Token passthrough [textSize: large]
Tool Assembler > Tool Events: After execution [textSize: large]
Token Relay > Text Events: Per token [textSize: large]
Token Relay > Control Events: Lifecycle [textSize: large]
Tool Events > EventSource: SSE stream [textSize: large]
Text Events > EventSource: SSE stream [textSize: large]
Control Events > EventSource: SSE stream [textSize: large]
```

---

## Figure 9 -- Dependency Graph

*Shared state and dependencies: startup caching, per-request client creation, and cross-component relationships.*

**Type:** Architecture Diagram

```eraser
// Figure 9 - Dependency Graph
// Type: Cloud Architecture Diagram

direction down
colorMode bold

// Startup (one-time initialization)
Startup Cache [icon: python, color: green, label: "Startup Layer (one-time)"] {
  Settings [icon: python, label: "Settings\n@lru_cache"]
  JWKS [icon: python, label: "PyJWKClient"]
  CSVStore [icon: database, label: "CSVStore\npandas DataFrames"]
  Agent Cache [icon: python, label: "Pandas Agent Cache"]
}

// Backend API (per-request)
Backend API [icon: fastapi, color: blue, label: "Backend API (per-request)"] {
  Routing [icon: python, label: "main.py + stream.py"]
  General Agent [icon: python, label: "general/agent.py\nRAG Agent"]
  CSV Agent [icon: python, label: "csv/agent.py\nPandas Agent"]
  Clients [icon: azure-cognitive-services, label: "Azure SDK Clients"]
}

// Function App
Function App [icon: azure-function-apps, color: orange, label: "Azure Functions"] {
  load_csv [icon: python, label: "load_csv.py"]
  process_others [icon: python, label: "process_others.py"]
  monitor_deletions [icon: python, label: "monitor_deletions.py"]
}

// Chunker
Chunker [icon: docker, color: purple, label: "Chunker Container App"] {
  Worker [icon: queue, label: "Worker Thread"]
  Chunker Clients [icon: azure-cognitive-services, label: "Azure SDK Clients"]
}

// External
External [color: red, label: "External Services"] {
  Blob [icon: azure-blob-storage, label: "Azure Blob Storage"]
  Snowflake [icon: snowflake, label: "Snowflake"]
}

// Startup flow
Settings > JWKS [textSize: large]
Settings > CSVStore [textSize: large]
CSVStore > Agent Cache [textSize: large]

// Runtime dependencies
Routing > General Agent: RAG queries [textSize: large]
Routing > CSV Agent: CSV queries [textSize: large]
Routing > Clients: Creates per-request [textSize: large]
CSV Agent > Agent Cache: Reuses cached agent [textSize: large]

// Cross-system
process_others > Worker: HTTP POST /process [textSize: large]
load_csv > Snowflake: Track metadata [textSize: large]
process_others > Snowflake: Dedup + track [textSize: large]
monitor_deletions > Snowflake: Reconcile deletions [textSize: large]
Worker > Snowflake: Update status [textSize: large]
load_csv --> Blob: Blob trigger [textSize: large]
process_others --> Blob: Blob trigger [textSize: large]
```

---

## Figure 10 -- Security Architecture

*Defense-in-depth: 6 layers from network perimeter through private endpoints, managed identity, RBAC, to JWT validation.*

**Type:** Architecture Diagram

```eraser
// Figure 10 - Security Architecture
// Type: Cloud Architecture Diagram

direction down
colorMode bold

// Entry
User [icon: user, label: "Authenticated User"]

// Layer 1: Perimeter
Perimeter [icon: azure-firewall, color: red, label: "Perimeter"] {
  NSG [icon: azure-firewall, label: "NSG\nHTTPS only"]
}

// Layer 2: Network
Network [icon: azure-virtual-network, color: orange, label: "Network Isolation"] {
  VNet [icon: azure-virtual-network, label: "Azure VNet\n5 subnets"]
  App Subnet [icon: docker, label: "Container Apps"]
  PE Subnet [icon: network, label: "Private Endpoints"]
  Func Subnet [icon: azure-function-apps, label: "Functions"]
  Agent Subnet [icon: azure-devops, label: "DevOps Agent"]
}

// Layer 3: Private Endpoints
Private Connectivity [color: blue, label: "Private Endpoints (6)"] {
  PE OpenAI [icon: azure-cognitive-services, label: "PE: OpenAI"]
  PE Search [icon: azure-search-services, label: "PE: AI Search"]
  PE Cosmos [icon: azure-cosmos-db, label: "PE: CosmosDB"]
  PE KeyVault [icon: azure-key-vault, label: "PE: Key Vault"]
  PE Blob [icon: azure-blob-storage, label: "PE: Blob"]
  PE DocIntel [icon: azure-cognitive-services, label: "PE: Doc Intel"]
}

// Layer 4: Identity
Identity [icon: azure-active-directory, color: purple, label: "Identity"] {
  Managed Identities [icon: azure-active-directory, label: "Managed Identities\n5 total"]
}

// Layer 5: RBAC
Authorization [color: green, label: "RBAC"] {
  RBAC Roles [icon: azure-active-directory, label: "6 Azure RBAC Roles"]
}

// Layer 6: Application
Application [color: green, label: "Application"] {
  JWT [icon: python, label: "JWT Validation\nEdDSA via JWKS"]
}

// Traffic flow
User > NSG: HTTPS [textSize: large]
NSG > VNet: Allowed traffic [textSize: large]
VNet > App Subnet [textSize: large]
App Subnet > PE Subnet: Private traffic only [textSize: large]
PE Subnet > PE OpenAI, PE Search, PE Cosmos, PE KeyVault [textSize: large]
Managed Identities > RBAC Roles: Assigned roles [textSize: large]
JWT > App Subnet: Validates requests [textSize: large]
```

---

## Figure 11 -- CI/CD Architecture

*Two-stage deployment: Microsoft-hosted bootstrap, then self-hosted VNet agent for Terraform + container deployment.*

**Type:** Architecture Diagram

```eraser
// Figure 11 - Azure DevOps Deployment Pipeline
// Type: Cloud Architecture Diagram

direction right
colorMode bold

// Trigger
Trigger [icon: azure-devops, color: blue, label: "Trigger"] {
  Git Push [icon: azure-devops, label: "Git Push\nmain branch"]
  Git Tag [icon: azure-devops, label: "Git Tag\nv* / release-*"]
}

// Stage 1
Stage 1 [icon: azure-devops, color: green, label: "Stage 1: Bootstrap (MS-Hosted)"] {
  TF Target [icon: terraform, label: "Terraform Apply\n-target 12 resources"]
  Wait [icon: python, label: "Sleep 120s\nAgent registration"]
}

// Bootstrapped
Bootstrapped [icon: azure-container-instances, color: orange, label: "Bootstrapped Resources"] {
  VNet Subnet [icon: azure-virtual-network, label: "VNet Subnet + NSG"]
  ACI Agent [icon: azure-container-instances, label: "ACI Self-Hosted Agent"]
}

// Stage 2
Stage 2 [icon: docker, color: purple, label: "Stage 2: Deploy (VNet Agent)"] {
  TF Full [icon: terraform, label: "Terraform Apply\nFull state"]
  ACR Build [icon: docker, label: "ACR Build\nDocker image"]
  CA Update [icon: docker, label: "Container App Update"]
  Health Check [icon: monitor, label: "GET /health"]
}

// Pipeline flow
Git Push > TF Target: Triggers pipeline [textSize: large]
Git Tag > TF Target: Triggers pipeline [textSize: large]
TF Target > Wait [textSize: large]
Wait > VNet Subnet: Provisions [textSize: large]
Wait > ACI Agent: Provisions [textSize: large]
ACI Agent > TF Full: Agent online [textSize: large]
TF Full > ACR Build: Infra ready [textSize: large]
ACR Build > CA Update: Image pushed [textSize: large]
CA Update > Health Check: Revision deployed [textSize: large]
```

---

## Figure 12 -- Deployment Pipeline Sequence

*Handoff between Microsoft-hosted and self-hosted agents, two-phase Terraform, and push-to-production verification.*

**Type:** Cloud Architecture Diagram

```eraser
// Figure 12 - Deployment Pipeline (Detailed)
// Type: Cloud Architecture Diagram

direction right
colorMode bold

// Trigger
Trigger [icon: user, color: blue, label: "Trigger"] {
  Developer [icon: user, label: "Developer\nGit push / tag"]
}

// Stage 1
Stage 1 [icon: azure-devops, color: green, label: "Stage 1: Bootstrap (MS-Hosted)"] {
  ADO Pipeline [icon: azure-devops, label: "ADO Pipeline"]
  TF Bootstrap [icon: terraform, label: "Terraform -target\n12 resources"]
  Agent Startup [icon: azure-container-instances, label: "ACI Agent\n120s cold start"]
}

// Stage 2
Stage 2 [icon: docker, color: purple, label: "Stage 2: Deploy (VNet Agent)"] {
  TF Full [icon: terraform, label: "Terraform Apply\nFull state"]
  ACR Build [icon: docker, label: "ACR Build"]
  CA Update [icon: docker, label: "Container App Update"]
  Health Check [icon: monitor, label: "GET /health"]
}

// Connections
Developer > ADO Pipeline: Git push / tag [textSize: large]
ADO Pipeline > TF Bootstrap: Stage 1 [textSize: large]
TF Bootstrap > Agent Startup: Resources provisioned [textSize: large]
Agent Startup > TF Full: Agent online [textSize: large]
TF Full > ACR Build: Infra ready [textSize: large]
ACR Build > CA Update: Image pushed [textSize: large]
CA Update > Health Check: Revision deployed [textSize: large]
```

---

## Figure 13 -- Observability Architecture

*Telemetry flow: application traces, Azure diagnostic settings, Log Analytics aggregation, and operational outputs.*

**Type:** Architecture Diagram

```eraser
// Figure 13 - Observability Architecture
// Type: Cloud Architecture Diagram

direction down
colorMode bold

// Application
Application [icon: fastapi, color: green, label: "Application Layer"] {
  Backend [icon: fastapi, label: "FastAPI Backend\nNo APM SDK"]
}

// Azure PaaS
Azure PaaS [color: orange, label: "Azure PaaS (Diagnostic Settings)"] {
  OpenAI Svc [icon: azure-cognitive-services, label: "Azure OpenAI"]
  AISearch Svc [icon: azure-search-services, label: "AI Search"]
  CosmosDB Svc [icon: azure-cosmos-db, label: "CosmosDB"]
  KeyVault Svc [icon: azure-key-vault, label: "Key Vault"]
  DocIntel Svc [icon: azure-cognitive-services, label: "Doc Intelligence"]
}

// Monitoring
Monitoring [color: purple, label: "Centralized Monitoring"] {
  AppInsights [icon: azure-application-insights, label: "Application Insights"]
  LogAnalytics [icon: azure-log-analytics-workspaces, label: "Log Analytics\n30-day retention"]
}

// Outputs
Outputs [color: blue, label: "Operational Outputs"] {
  Dashboards [icon: monitor, label: "Dashboards\nP50/P95/P99"]
  Alerts [icon: monitor, label: "Alerts"]
  KQL [icon: monitor, label: "KQL Queries"]
  E2E Tracing [icon: monitor, label: "E2E Tracing"]
}

// Application telemetry
Backend > AppInsights: Traces + exceptions [textSize: large]
AppInsights > LogAnalytics: Backing store [textSize: large]

// Azure diagnostics
OpenAI Svc > LogAnalytics: Diagnostics [textSize: large]
AISearch Svc > LogAnalytics: Diagnostics [textSize: large]
CosmosDB Svc > LogAnalytics: Diagnostics [textSize: large]
KeyVault Svc > LogAnalytics: Diagnostics [textSize: large]
DocIntel Svc > LogAnalytics: Diagnostics [textSize: large]

// Outputs
LogAnalytics > Dashboards [textSize: large]
LogAnalytics > Alerts [textSize: large]
LogAnalytics > KQL [textSize: large]
AppInsights > E2E Tracing [textSize: large]
```
