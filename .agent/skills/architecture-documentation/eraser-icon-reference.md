# Eraser Icon Reference

Complete icon reference for use in Eraser architecture diagrams.

**Official Documentation:** https://docs.eraser.io/docs/icons

## How to Use Icons

Icons are specified using the `icon` property in node or group definitions:

```
NodeName [icon: icon-name]
```

Example:
```
WebServer [icon: aws-ec2]
Database [icon: postgres]
Cache [icon: redis]
```

## AWS Icons (700+)

### Compute
- `aws-ec2` - Elastic Compute Cloud
- `aws-lambda` - Lambda Functions
- `aws-fargate` - Fargate Containers
- `aws-elastic-beanstalk` - Elastic Beanstalk
- `aws-ecs` - Elastic Container Service
- `aws-eks` - Elastic Kubernetes Service
- `aws-batch` - Batch Computing
- `aws-lightsail` - Lightsail VPS
- `aws-outposts` - Outposts

### Storage
- `aws-s3` - Simple Storage Service
- `aws-ebs` - Elastic Block Store
- `aws-efs` - Elastic File System
- `aws-glacier` - Glacier Archive
- `aws-storage-gateway` - Storage Gateway
- `aws-fsx` - FSx File Systems
- `aws-backup` - Backup Service

### Database
- `aws-rds` - Relational Database Service
- `aws-dynamodb` - DynamoDB NoSQL
- `aws-aurora` - Aurora Database
- `aws-redshift` - Redshift Data Warehouse
- `aws-elasticache` - ElastiCache
- `aws-neptune` - Neptune Graph DB
- `aws-documentdb` - DocumentDB
- `aws-keyspaces` - Keyspaces (Cassandra)
- `aws-timestream` - Timestream Time-Series DB
- `aws-qldb` - QLDB Ledger Database

### Networking & Content Delivery
- `aws-vpc` - Virtual Private Cloud
- `aws-cloudfront` - CloudFront CDN
- `aws-route-53` - Route 53 DNS
- `aws-elb` - Elastic Load Balancing
- `aws-api-gateway` - API Gateway
- `aws-direct-connect` - Direct Connect
- `aws-app-mesh` - App Mesh
- `aws-cloud-map` - Cloud Map
- `aws-global-accelerator` - Global Accelerator
- `aws-private-subnet` - Private Subnet
- `aws-public-subnet` - Public Subnet
- `aws-nat-gateway` - NAT Gateway
- `aws-internet-gateway` - Internet Gateway
- `aws-transit-gateway` - Transit Gateway

### Analytics
- `aws-athena` - Athena Query Service
- `aws-kinesis` - Kinesis Data Streams
- `aws-glue` - Glue ETL
- `aws-emr` - EMR Hadoop/Spark
- `aws-quicksight` - QuickSight BI
- `aws-data-pipeline` - Data Pipeline
- `aws-lake-formation` - Lake Formation
- `aws-msk` - Managed Streaming for Kafka

### Machine Learning
- `aws-sagemaker` - SageMaker ML Platform
- `aws-rekognition` - Rekognition Image/Video
- `aws-comprehend` - Comprehend NLP
- `aws-polly` - Polly Text-to-Speech
- `aws-transcribe` - Transcribe Speech-to-Text
- `aws-translate` - Translate
- `aws-lex` - Lex Conversational AI
- `aws-forecast` - Forecast ML
- `aws-personalize` - Personalize Recommendations

### Security & Identity
- `aws-iam` - Identity & Access Management
- `aws-cognito` - Cognito User Auth
- `aws-secrets-manager` - Secrets Manager
- `aws-kms` - Key Management Service
- `aws-shield` - Shield DDoS Protection
- `aws-waf` - Web Application Firewall
- `aws-inspector` - Inspector Security Assessment
- `aws-guardduty` - GuardDuty Threat Detection
- `aws-macie` - Macie Data Security
- `aws-certificate-manager` - Certificate Manager

### Developer Tools
- `aws-codecommit` - CodeCommit Git
- `aws-codebuild` - CodeBuild CI
- `aws-codedeploy` - CodeDeploy
- `aws-codepipeline` - CodePipeline CI/CD
- `aws-cloud9` - Cloud9 IDE
- `aws-x-ray` - X-Ray Tracing

### Management & Monitoring
- `aws-cloudwatch` - CloudWatch Monitoring
- `aws-cloudtrail` - CloudTrail Audit Logs
- `aws-config` - Config Compliance
- `aws-systems-manager` - Systems Manager
- `aws-cloudformation` - CloudFormation IaC
- `aws-organizations` - Organizations
- `aws-control-tower` - Control Tower

### Messaging
- `aws-sqs` - Simple Queue Service
- `aws-sns` - Simple Notification Service
- `aws-eventbridge` - EventBridge Event Bus
- `aws-step-functions` - Step Functions Orchestration

### Infrastructure
- `aws-cloud` - AWS Cloud
- `aws-region` - AWS Region
- `aws-availability-zone` - Availability Zone
- `aws-account` - AWS Account

## Google Cloud Platform Icons (500+)

### Compute
- `gcp-compute-engine` - Compute Engine VMs
- `gcp-kubernetes-engine` - Kubernetes Engine (GKE)
- `gcp-app-engine` - App Engine PaaS
- `gcp-cloud-functions` - Cloud Functions
- `gcp-cloud-run` - Cloud Run Containers
- `gcp-cloud-build` - Cloud Build CI/CD

### Storage
- `gcp-cloud-storage` - Cloud Storage
- `gcp-persistent-disk` - Persistent Disk
- `gcp-filestore` - Filestore

### Database
- `gcp-cloud-sql` - Cloud SQL
- `gcp-cloud-spanner` - Cloud Spanner
- `gcp-firestore` - Firestore NoSQL
- `gcp-bigtable` - Bigtable
- `gcp-datastore` - Datastore

### Networking
- `gcp-cloud-vpc` - Virtual Private Cloud
- `gcp-cloud-load-balancing` - Cloud Load Balancing
- `gcp-cloud-cdn` - Cloud CDN
- `gcp-cloud-dns` - Cloud DNS
- `gcp-cloud-armor` - Cloud Armor Security

### Data Analytics
- `gcp-bigquery` - BigQuery Data Warehouse
- `gcp-dataflow` - Dataflow Stream/Batch Processing
- `gcp-dataproc` - Dataproc Hadoop/Spark
- `gcp-pub-sub` - Pub/Sub Messaging
- `gcp-data-fusion` - Data Fusion ETL
- `gcp-composer` - Cloud Composer (Airflow)

### AI/ML
- `gcp-vertexai` - Vertex AI Platform
- `gcp-ai-platform` - AI Platform
- `gcp-automl` - AutoML
- `gcp-vision-api` - Vision API
- `gcp-natural-language` - Natural Language API
- `gcp-translation-api` - Translation API
- `gcp-speech-to-text` - Speech-to-Text

### Infrastructure
- `gcp-cloud` - Google Cloud
- `gcp-project` - GCP Project

## Azure Icons (400+)

### Compute
- `azure-virtual-machine` - Virtual Machines
- `azure-kubernetes-service` - Azure Kubernetes Service (AKS)
- `azure-container-instances` - Container Instances
- `azure-app-service` - App Service
- `azure-function-apps` - Function Apps
- `azure-batch` - Azure Batch

### Storage
- `azure-storage-accounts` - Storage Accounts
- `azure-blob-storage` - Blob Storage
- `azure-files` - Azure Files
- `azure-disk-storage` - Disk Storage
- `azure-data-lake` - Data Lake Storage

### Database
- `azure-sql-database` - SQL Database
- `azure-cosmos-db` - Cosmos DB
- `azure-sql-server` - SQL Server
- `azure-database-mysql` - Database for MySQL
- `azure-database-postgresql` - Database for PostgreSQL
- `azure-cache-redis` - Azure Cache for Redis

### Networking
- `azure-virtual-network` - Virtual Network
- `azure-load-balancer` - Load Balancer
- `azure-application-gateway` - Application Gateway
- `azure-vpn-gateway` - VPN Gateway
- `azure-cdn` - Content Delivery Network
- `azure-dns` - Azure DNS
- `azure-firewall` - Azure Firewall

### Analytics
- `azure-synapse-analytics` - Synapse Analytics
- `azure-databricks` - Azure Databricks
- `azure-data-factory` - Data Factory
- `azure-stream-analytics` - Stream Analytics
- `azure-event-hubs` - Event Hubs
- `azure-hdinsight` - HDInsight

### AI/ML
- `azure-machine-learning` - Azure Machine Learning
- `azure-cognitive-services` - Cognitive Services
- `azure-bot-service` - Bot Service

### Identity & Security
- `azure-active-directory` - Active Directory
- `azure-key-vault` - Key Vault
- `azure-security-center` - Security Center

### DevOps
- `azure-devops` - Azure DevOps
- `azure-pipelines` - Azure Pipelines
- `azure-repos` - Azure Repos

### Management
- `azure-monitor` - Azure Monitor
- `azure-resource-groups` - Resource Groups

### Infrastructure
- `azure-cloud` - Azure Cloud
- `azure-subscription` - Azure Subscription

## Kubernetes Icons

- `kubernetes` - Kubernetes Logo
- `k8s-pod` - Pod
- `k8s-deployment` - Deployment
- `k8s-service` - Service
- `k8s-ingress` - Ingress
- `k8s-configmap` - ConfigMap
- `k8s-secret` - Secret
- `k8s-namespace` - Namespace
- `k8s-node` - Node
- `k8s-persistent-volume` - Persistent Volume
- `k8s-statefulset` - StatefulSet
- `k8s-daemonset` - DaemonSet
- `k8s-job` - Job
- `k8s-cronjob` - CronJob

## Popular Tech Logos & Tools

### Programming Languages
- `python` - Python
- `java` - Java
- `javascript` - JavaScript
- `typescript` - TypeScript
- `golang` - Go
- `rust` - Rust
- `ruby` - Ruby
- `php` - PHP
- `csharp` - C#
- `cpp` - C++
- `swift` - Swift
- `kotlin` - Kotlin

### Web Frameworks
- `nodejs` - Node.js
- `react` - React
- `vue` - Vue.js
- `angular` - Angular
- `nextjs` - Next.js
- `django` - Django
- `flask` - Flask
- `fastapi` - FastAPI
- `spring` - Spring Boot
- `express` - Express.js

### Databases
- `postgres` - PostgreSQL
- `mysql` - MySQL
- `mongodb` - MongoDB
- `redis` - Redis
- `elasticsearch` - Elasticsearch
- `cassandra` - Cassandra
- `mariadb` - MariaDB
- `oracle` - Oracle Database
- `sqlite` - SQLite
- `neo4j` - Neo4j Graph DB

### Message Queues
- `kafka` - Apache Kafka
- `rabbitmq` - RabbitMQ
- `activemq` - ActiveMQ
- `nats` - NATS

### Data Processing
- `spark` - Apache Spark
- `hadoop` - Apache Hadoop
- `airflow` - Apache Airflow
- `flink` - Apache Flink
- `databricks` - Databricks

### Monitoring & Observability
- `prometheus` - Prometheus
- `grafana` - Grafana
- `datadog` - Datadog
- `newrelic` - New Relic
- `splunk` - Splunk
- `elastic` - Elastic Stack

### CI/CD
- `jenkins` - Jenkins
- `github-actions` - GitHub Actions
- `gitlab` - GitLab CI
- `circleci` - CircleCI
- `travis` - Travis CI
- `terraform` - Terraform
- `ansible` - Ansible

### Containers & Orchestration
- `docker` - Docker
- `kubernetes` - Kubernetes
- `helm` - Helm
- `istio` - Istio

### Version Control
- `github` - GitHub
- `gitlab` - GitLab
- `bitbucket` - Bitbucket
- `git` - Git

### BI & Analytics Tools
- `tableau` - Tableau
- `powerbi` - Power BI
- `looker` - Looker
- `metabase` - Metabase
- `superset` - Apache Superset
- `snowflake` - Snowflake

### API & Integration
- `rest-api` - REST API
- `graphql` - GraphQL
- `grpc` - gRPC
- `postman` - Postman
- `swagger` - Swagger/OpenAPI

### Testing
- `jest` - Jest
- `pytest` - Pytest
- `selenium` - Selenium
- `cypress` - Cypress

## General Purpose Icons

### Users & Actors
- `users` - Multiple Users
- `user` - Single User
- `admin` - Administrator
- `developer` - Developer
- `customer` - Customer

### Infrastructure
- `server` - Generic Server
- `database` - Generic Database
- `storage` - Generic Storage
- `network` - Network
- `cloud` - Generic Cloud
- `load-balancer` - Load Balancer

### Shapes & Symbols
- `rectangle` - Rectangle (default)
- `circle` - Circle
- `cylinder` - Cylinder (for databases)
- `queue` - Queue shape
- `diamond` - Diamond (for decisions)

### Communication
- `api` - API
- `webhook` - Webhook
- `email` - Email
- `mobile` - Mobile Device
- `desktop` - Desktop Computer
- `laptop` - Laptop

### Files
- `file` - Generic File
- `csv` - CSV File
- `json` - JSON File
- `xml` - XML File
- `pdf` - PDF File

## Custom Icons

If you can't find a specific icon, you can upload custom icons through the Eraser UI:

1. Go to your diagram in Eraser
2. Click on the node
3. Select "Upload Custom Icon"
4. Use the uploaded icon name in your code

## Icon Name Patterns

Icon names follow these patterns:

- **AWS:** `aws-[service-name]` (e.g., `aws-ec2`, `aws-s3`)
- **GCP:** `gcp-[service-name]` (e.g., `gcp-compute-engine`)
- **Azure:** `azure-[service-name]` (e.g., `azure-virtual-machine`)
- **Kubernetes:** `k8s-[resource-type]` (e.g., `k8s-pod`)
- **Tech logos:** Usually just the lowercase name (e.g., `docker`, `kubernetes`, `python`)

## Finding Icons

**Official icon browser:** https://docs.eraser.io/docs/icons

The Eraser documentation includes a searchable icon browser where you can:
- Search by name or keyword
- Browse by category (AWS, GCP, Azure, etc.)
- See icon previews
- Copy icon names

## Tips for Choosing Icons

1. **Match actual technology:** Use `postgres` not `database` if you're using PostgreSQL
2. **Cloud provider specific:** Use provider-specific icons (`aws-ec2` vs generic `server`)
3. **Be consistent:** If you use AWS icons, use them throughout
4. **Generic fallbacks:** Use generic icons (`server`, `database`) when specific ones aren't available
5. **Shape matters:** Use `shape: cylinder` for databases/caches, `shape: queue` for queues

## References

- **Official Icon Reference:** https://docs.eraser.io/docs/icons
- **Icon Browser:** https://docs.eraser.io/docs/icons (interactive search)
- **Custom Icons:** Upload through Eraser UI
