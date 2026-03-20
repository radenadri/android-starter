# Cloud Icon Reference for PlantUML (via Kroki)

Complete icon reference for AWS, Azure, GCP, Kubernetes, and general-purpose icons in PlantUML architecture diagrams.

**AWS Symbols:** https://github.com/awslabs/aws-icons-for-plantuml/blob/main/AWSSymbols.md
**Azure Symbols:** https://github.com/plantuml-stdlib/Azure-PlantUML/blob/master/AzureSymbols.md
**GCP Icons (stdlib):** https://github.com/Crashedmind/PlantUML-icons-GCP

## How to Use Icons

### AWS (stdlib — built into PlantUML)

```plantuml
!include <awslib/AWSCommon>
!include <awslib/Compute/Lambda>          ' Individual service
!include <awslib/Database/all>            ' Entire category

Lambda(myFunc, "Handler", "Node.js 20")   ' Macro usage
```

### Azure (stdlib — built into PlantUML)

```plantuml
!include <azure/AzureCommon>
!include <azure/Compute/AzureFunction>

AzureFunction(func, "API", "C#")
```

### GCP (stdlib — built into PlantUML)

```plantuml
!include <gcp/GCPCommon>
!include <gcp/Compute/Cloud_Run>
!include <gcp/Compute/all>              ' Entire category

Cloud_Run(svc, "API", "Go")
```

### Kubernetes (stdlib — built into PlantUML)

```plantuml
!include <k8s/Common>
!include <k8s/OSS/KubernetesPod>
!include <k8s/OSS/all>                  ' All K8s resources

KubernetesPod(pod, "app-pod", "")
```

### Macro Pattern

All icon macros follow the same signature:

```
ServiceName(alias, "Label", "Technology/Description")
```

- **alias**: Internal identifier for connections (e.g., `myFunc`)
- **Label**: Display text shown in the diagram
- **Technology/Description**: Smaller text below the label

---

## AWS Icons (awslib — 900+ services)

Include: `!include <awslib/AWSCommon>`

### Compute (`!include <awslib/Compute/all>`)

| Macro | Service |
|-------|---------|
| `EC2(alias, "Label", "Desc")` | EC2 Instances |
| `Lambda(alias, "Label", "Desc")` | Lambda Functions |
| `Fargate(alias, "Label", "Desc")` | Fargate Containers |
| `ECS(alias, "Label", "Desc")` | Elastic Container Service |
| `EKS(alias, "Label", "Desc")` | Elastic Kubernetes Service |
| `Batch(alias, "Label", "Desc")` | AWS Batch |
| `Lightsail(alias, "Label", "Desc")` | Lightsail VPS |
| `ElasticBeanstalk(alias, "Label", "Desc")` | Elastic Beanstalk |
| `AppRunner(alias, "Label", "Desc")` | App Runner |

### Storage (`!include <awslib/Storage/all>`)

| Macro | Service |
|-------|---------|
| `SimpleStorageService(alias, "Label", "Desc")` | S3 |
| `EBS(alias, "Label", "Desc")` | Elastic Block Store |
| `EFS(alias, "Label", "Desc")` | Elastic File System |
| `FSx(alias, "Label", "Desc")` | FSx File Systems |
| `Backup(alias, "Label", "Desc")` | AWS Backup |
| `StorageGateway(alias, "Label", "Desc")` | Storage Gateway |
| `Glacier(alias, "Label", "Desc")` | S3 Glacier Archive |

### Database (`!include <awslib/Database/all>`)

| Macro | Service |
|-------|---------|
| `DynamoDB(alias, "Label", "Desc")` | DynamoDB NoSQL |
| `RDS(alias, "Label", "Desc")` | Relational Database Service |
| `Aurora(alias, "Label", "Desc")` | Aurora Database |
| `ElastiCache(alias, "Label", "Desc")` | ElastiCache (Redis/Memcached) |
| `Redshift(alias, "Label", "Desc")` | Redshift Data Warehouse |
| `Neptune(alias, "Label", "Desc")` | Neptune Graph DB |
| `DocumentDB(alias, "Label", "Desc")` | DocumentDB (MongoDB-compatible) |
| `Keyspaces(alias, "Label", "Desc")` | Keyspaces (Cassandra) |
| `Timestream(alias, "Label", "Desc")` | Timestream Time-Series DB |
| `MemoryDB(alias, "Label", "Desc")` | MemoryDB for Redis |

### Networking & Content Delivery (`!include <awslib/NetworkingContentDelivery/all>`)

| Macro | Service |
|-------|---------|
| `VPC(alias, "Label", "Desc")` | Virtual Private Cloud |
| `CloudFront(alias, "Label", "Desc")` | CloudFront CDN |
| `Route53(alias, "Label", "Desc")` | Route 53 DNS |
| `ElasticLoadBalancing(alias, "Label", "Desc")` | Elastic Load Balancing |
| `APIGateway(alias, "Label", "Desc")` | API Gateway |
| `DirectConnect(alias, "Label", "Desc")` | Direct Connect |
| `TransitGateway(alias, "Label", "Desc")` | Transit Gateway |
| `GlobalAccelerator(alias, "Label", "Desc")` | Global Accelerator |
| `AppMesh(alias, "Label", "Desc")` | App Mesh |
| `CloudMap(alias, "Label", "Desc")` | Cloud Map |
| `PrivateLink(alias, "Label", "Desc")` | PrivateLink |

### Application Integration (`!include <awslib/ApplicationIntegration/all>`)

| Macro | Service |
|-------|---------|
| `SimpleQueueService(alias, "Label", "Desc")` | SQS |
| `SimpleNotificationService(alias, "Label", "Desc")` | SNS |
| `EventBridge(alias, "Label", "Desc")` | EventBridge Event Bus |
| `StepFunctions(alias, "Label", "Desc")` | Step Functions |
| `AppSync(alias, "Label", "Desc")` | AppSync GraphQL |
| `AppFlow(alias, "Label", "Desc")` | AppFlow Integration |
| `MQ(alias, "Label", "Desc")` | Amazon MQ |
| `ManagedWorkflowsforApacheAirflow(alias, "Label", "Desc")` | MWAA (Airflow) |

### Analytics (`!include <awslib/Analytics/all>`)

| Macro | Service |
|-------|---------|
| `Athena(alias, "Label", "Desc")` | Athena Query Service |
| `Kinesis(alias, "Label", "Desc")` | Kinesis Data Streams |
| `KinesisDataStreams(alias, "Label", "Desc")` | Kinesis Data Streams |
| `DataFirehose(alias, "Label", "Desc")` | Data Firehose (Kinesis) |
| `Glue(alias, "Label", "Desc")` | Glue ETL |
| `EMR(alias, "Label", "Desc")` | EMR Hadoop/Spark |
| `QuickSight(alias, "Label", "Desc")` | QuickSight BI |
| `LakeFormation(alias, "Label", "Desc")` | Lake Formation |
| `ManagedStreamingforApacheKafka(alias, "Label", "Desc")` | MSK (Kafka) |
| `OpenSearchService(alias, "Label", "Desc")` | OpenSearch |

### Machine Learning (`!include <awslib/MachineLearning/all>`)

| Macro | Service |
|-------|---------|
| `SageMaker(alias, "Label", "Desc")` | SageMaker ML Platform |
| `Bedrock(alias, "Label", "Desc")` | Bedrock Generative AI |
| `Rekognition(alias, "Label", "Desc")` | Rekognition Image/Video |
| `Comprehend(alias, "Label", "Desc")` | Comprehend NLP |
| `Polly(alias, "Label", "Desc")` | Polly Text-to-Speech |
| `Transcribe(alias, "Label", "Desc")` | Transcribe Speech-to-Text |
| `Translate(alias, "Label", "Desc")` | Translate |
| `Lex(alias, "Label", "Desc")` | Lex Conversational AI |
| `Textract(alias, "Label", "Desc")` | Textract Document AI |

### Security, Identity & Compliance (`!include <awslib/SecurityIdentityCompliance/all>`)

| Macro | Service |
|-------|---------|
| `IAM(alias, "Label", "Desc")` | IAM |
| `Cognito(alias, "Label", "Desc")` | Cognito User Auth |
| `SecretsManager(alias, "Label", "Desc")` | Secrets Manager |
| `KMS(alias, "Label", "Desc")` | Key Management Service |
| `Shield(alias, "Label", "Desc")` | Shield DDoS Protection |
| `WAF(alias, "Label", "Desc")` | Web Application Firewall |
| `GuardDuty(alias, "Label", "Desc")` | GuardDuty Threat Detection |
| `SecurityHub(alias, "Label", "Desc")` | Security Hub |
| `CertificateManager(alias, "Label", "Desc")` | Certificate Manager |
| `Inspector(alias, "Label", "Desc")` | Inspector |

### Management & Governance (`!include <awslib/ManagementGovernance/all>`)

| Macro | Service |
|-------|---------|
| `CloudWatch(alias, "Label", "Desc")` | CloudWatch Monitoring |
| `CloudFormation(alias, "Label", "Desc")` | CloudFormation IaC |
| `CloudTrail(alias, "Label", "Desc")` | CloudTrail Audit Logs |
| `Config(alias, "Label", "Desc")` | AWS Config |
| `SystemsManager(alias, "Label", "Desc")` | Systems Manager |
| `Organizations(alias, "Label", "Desc")` | AWS Organizations |
| `ControlTower(alias, "Label", "Desc")` | Control Tower |

### Developer Tools (`!include <awslib/DeveloperTools/all>`)

| Macro | Service |
|-------|---------|
| `CodeBuild(alias, "Label", "Desc")` | CodeBuild CI |
| `CodeDeploy(alias, "Label", "Desc")` | CodeDeploy |
| `CodePipeline(alias, "Label", "Desc")` | CodePipeline CI/CD |
| `CodeCommit(alias, "Label", "Desc")` | CodeCommit Git |
| `Cloud9(alias, "Label", "Desc")` | Cloud9 IDE |
| `XRay(alias, "Label", "Desc")` | X-Ray Tracing |

### Containers (`!include <awslib/Containers/all>`)

| Macro | Service |
|-------|---------|
| `ECS(alias, "Label", "Desc")` | Elastic Container Service |
| `EKS(alias, "Label", "Desc")` | Elastic Kubernetes Service |
| `Fargate(alias, "Label", "Desc")` | Fargate |
| `ECR(alias, "Label", "Desc")` | Elastic Container Registry |

### General (`!include <awslib/General/all>`)

| Macro | Service |
|-------|---------|
| `Users(alias, "Label", "Desc")` | Users (person icons) |
| `Client(alias, "Label", "Desc")` | Client |
| `Internet(alias, "Label", "Desc")` | Internet |
| `General(alias, "Label", "Desc")` | Generic service |

### AWS Group Macros (`!include <awslib/GroupIcons/all>`)

| Macro | Purpose |
|-------|---------|
| `AWSCloudGroup(alias, "Label") { }` | AWS Cloud boundary |
| `VPCGroup(alias, "Label") { }` | VPC boundary |
| `AvailabilityZoneGroup(alias, "Label") { }` | AZ boundary |
| `PublicSubnetGroup(alias, "Label") { }` | Public subnet |
| `PrivateSubnetGroup(alias, "Label") { }` | Private subnet |
| `RegionGroup(alias, "Label") { }` | AWS Region |
| `AccountGroup(alias, "Label") { }` | AWS Account |
| `SecurityGroupGroup(alias, "Label") { }` | Security Group |

### AWS Category Colors

| Category | Color |
|----------|-------|
| Analytics | Purple `#8C4FFF` |
| Application Integration | Pink `#E7157B` |
| Artificial Intelligence | Turquoise `#01A88D` |
| Compute | Orange |
| Database | Blue `#2E73B8` |
| Networking | Purple `#8C4FFF` |
| Security | Red |
| Storage | Green `#3F8624` |

---

## Azure Icons (400+ services)

Include: `!include <azure/AzureCommon>`

### Compute (`!include <azure/Compute/all>`)

| Macro | Service |
|-------|---------|
| `AzureFunction(alias, "Label", "Tech", "Desc")` | Function Apps |
| `AzureVirtualMachine(alias, "Label", "Tech", "Desc")` | Virtual Machines |
| `AzureKubernetesService(alias, "Label", "Tech", "Desc")` | AKS |
| `AzureContainerInstances(alias, "Label", "Tech", "Desc")` | Container Instances |
| `AzureAppService(alias, "Label", "Tech", "Desc")` | App Service |
| `AzureBatch(alias, "Label", "Tech", "Desc")` | Azure Batch |
| `AzureServiceFabric(alias, "Label", "Tech", "Desc")` | Service Fabric |
| `AzureSpringCloud(alias, "Label", "Tech", "Desc")` | Spring Cloud |

### Databases (`!include <azure/Databases/all>`)

| Macro | Service |
|-------|---------|
| `AzureCosmosDb(alias, "Label", "Tech", "Desc")` | Cosmos DB |
| `AzureSqlDatabase(alias, "Label", "Tech", "Desc")` | SQL Database |
| `AzureCacheForRedis(alias, "Label", "Tech", "Desc")` | Cache for Redis |
| `AzureDatabaseForMySQL(alias, "Label", "Tech", "Desc")` | Database for MySQL |
| `AzureDatabaseForPostgreSQL(alias, "Label", "Tech", "Desc")` | Database for PostgreSQL |
| `AzureSqlManagedInstance(alias, "Label", "Tech", "Desc")` | SQL Managed Instance |

### Networking (`!include <azure/Networking/all>`)

| Macro | Service |
|-------|---------|
| `AzureVirtualNetwork(alias, "Label", "Tech", "Desc")` | Virtual Network |
| `AzureLoadBalancer(alias, "Label", "Tech", "Desc")` | Load Balancer |
| `AzureApplicationGateway(alias, "Label", "Tech", "Desc")` | Application Gateway |
| `AzureFrontDoor(alias, "Label", "Tech", "Desc")` | Front Door |
| `AzureCDN(alias, "Label", "Tech", "Desc")` | CDN |
| `AzureDNS(alias, "Label", "Tech", "Desc")` | Azure DNS |
| `AzureFirewall(alias, "Label", "Tech", "Desc")` | Azure Firewall |
| `AzureVPNGateway(alias, "Label", "Tech", "Desc")` | VPN Gateway |
| `AzureExpressRoute(alias, "Label", "Tech", "Desc")` | ExpressRoute |
| `AzureTrafficManager(alias, "Label", "Tech", "Desc")` | Traffic Manager |

### Storage (`!include <azure/Storage/all>`)

| Macro | Service |
|-------|---------|
| `AzureBlobStorage(alias, "Label", "Tech", "Desc")` | Blob Storage |
| `AzureDataLakeStorage(alias, "Label", "Tech", "Desc")` | Data Lake Storage |
| `AzureFileStorage(alias, "Label", "Tech", "Desc")` | File Storage |
| `AzureManagedDisks(alias, "Label", "Tech", "Desc")` | Managed Disks |
| `AzureStorageAccounts(alias, "Label", "Tech", "Desc")` | Storage Accounts |

### Analytics (`!include <azure/Analytics/all>`)

| Macro | Service |
|-------|---------|
| `AzureEventHub(alias, "Label", "Tech", "Desc")` | Event Hubs |
| `AzureSynapseAnalytics(alias, "Label", "Tech", "Desc")` | Synapse Analytics |
| `AzureDatabricks(alias, "Label", "Tech", "Desc")` | Azure Databricks |
| `AzureDataFactory(alias, "Label", "Tech", "Desc")` | Data Factory |
| `AzureStreamAnalyticsJob(alias, "Label", "Tech", "Desc")` | Stream Analytics |
| `AzureHDInsight(alias, "Label", "Tech", "Desc")` | HDInsight |

### Identity (`!include <azure/Identity/all>`)

| Macro | Service |
|-------|---------|
| `AzureActiveDirectory(alias, "Label", "Tech", "Desc")` | Active Directory |
| `AzureActiveDirectoryB2C(alias, "Label", "Tech", "Desc")` | AD B2C |

### Security (`!include <azure/Security/all>`)

| Macro | Service |
|-------|---------|
| `AzureKeyVault(alias, "Label", "Tech", "Desc")` | Key Vault |
| `AzureSecurityCenter(alias, "Label", "Tech", "Desc")` | Security Center |
| `AzureSentinel(alias, "Label", "Tech", "Desc")` | Sentinel |

### Integration (`!include <azure/Integration/all>`)

| Macro | Service |
|-------|---------|
| `AzureAPIManagement(alias, "Label", "Tech", "Desc")` | API Management |
| `AzureServiceBus(alias, "Label", "Tech", "Desc")` | Service Bus |
| `AzureLogicApps(alias, "Label", "Tech", "Desc")` | Logic Apps |
| `AzureEventGrid(alias, "Label", "Tech", "Desc")` | Event Grid |

### DevOps (`!include <azure/DevOps/all>`)

| Macro | Service |
|-------|---------|
| `AzureApplicationInsights(alias, "Label", "Tech", "Desc")` | Application Insights |
| `AzureDevTestLabs(alias, "Label", "Tech", "Desc")` | DevTest Labs |

### Management (`!include <azure/Management/all>`)

| Macro | Service |
|-------|---------|
| `AzureMonitor(alias, "Label", "Tech", "Desc")` | Azure Monitor |
| `AzureAutomation(alias, "Label", "Tech", "Desc")` | Automation |

**Note:** Azure macros take 4 parameters: `(alias, "Label", "Technology", "Description")`

---

## GCP Icons (stdlib `gcp`)

Include: `!include <gcp/GCPCommon>`

### Compute (`!include <gcp/Compute/all>`)

| Macro | Service |
|-------|---------|
| `Compute_Engine(alias, "Label", "Desc")` | Compute Engine VMs |
| `Cloud_Functions(alias, "Label", "Desc")` | Cloud Functions |
| `CloudRun(alias, "Label", "Desc")` | Cloud Run |
| `AppEngine(alias, "Label", "Desc")` | App Engine |
| `KubernetesEngine(alias, "Label", "Desc")` | GKE |
| `GPU(alias, "Label", "Desc")` | GPU Instances |

### Databases (`!include <gcp/Databases/all>`)

| Macro | Service |
|-------|---------|
| `CloudSQL(alias, "Label", "Desc")` | Cloud SQL |
| `CloudSpanner(alias, "Label", "Desc")` | Cloud Spanner |
| `CloudFirestore(alias, "Label", "Desc")` | Firestore |
| `CloudBigtable(alias, "Label", "Desc")` | Bigtable |
| `CloudMemorystore(alias, "Label", "Desc")` | Memorystore (Redis) |
| `CloudDatastore(alias, "Label", "Desc")` | Datastore |

### Storage (`!include <gcp/Storage/all>`)

| Macro | Service |
|-------|---------|
| `Cloud_Storage(alias, "Label", "Desc")` | Cloud Storage |
| `CloudFilestore(alias, "Label", "Desc")` | Filestore |
| `PersistentDisk(alias, "Label", "Desc")` | Persistent Disk |

### Networking (`!include <gcp/Networking/all>`)

| Macro | Service |
|-------|---------|
| `CloudLoadBalancing(alias, "Label", "Desc")` | Cloud Load Balancing |
| `CloudCDN(alias, "Label", "Desc")` | Cloud CDN |
| `CloudDNS(alias, "Label", "Desc")` | Cloud DNS |
| `CloudArmor(alias, "Label", "Desc")` | Cloud Armor |
| `CloudVPN(alias, "Label", "Desc")` | Cloud VPN |
| `VirtualPrivateCloud(alias, "Label", "Desc")` | VPC |
| `CloudRouter(alias, "Label", "Desc")` | Cloud Router |
| `CloudNAT(alias, "Label", "Desc")` | Cloud NAT |
| `CloudFirewallRules(alias, "Label", "Desc")` | Firewall Rules |

### Data Analytics (`!include <gcp/Data_Analytics/all>`)

| Macro | Service |
|-------|---------|
| `BigQuery(alias, "Label", "Desc")` | BigQuery |
| `CloudDataflow(alias, "Label", "Desc")` | Dataflow |
| `CloudDataproc(alias, "Label", "Desc")` | Dataproc |
| `CloudPubSub(alias, "Label", "Desc")` | Pub/Sub |
| `CloudComposer(alias, "Label", "Desc")` | Cloud Composer (Airflow) |
| `CloudDataFusion(alias, "Label", "Desc")` | Data Fusion |

### AI & Machine Learning (`!include <gcp/AI_and_Machine_Learning/all>`)

| Macro | Service |
|-------|---------|
| `AIPlatform(alias, "Label", "Desc")` | AI Platform (Vertex) |
| `CloudAutoML(alias, "Label", "Desc")` | AutoML |
| `CloudVisionAPI(alias, "Label", "Desc")` | Vision API |
| `CloudNaturalLanguageAPI(alias, "Label", "Desc")` | NLP API |
| `CloudSpeechtoText(alias, "Label", "Desc")` | Speech-to-Text |
| `CloudTranslationAPI(alias, "Label", "Desc")` | Translation API |

### Security (`!include <gcp/Security/all>`)

| Macro | Service |
|-------|---------|
| `CloudIAM(alias, "Label", "Desc")` | Cloud IAM |
| `KeyManagementService(alias, "Label", "Desc")` | KMS |
| `CloudSecurityCommandCenter(alias, "Label", "Desc")` | Security Command Center |

### Management Tools (`!include <gcp/Management_Tools/all>`)

| Macro | Service |
|-------|---------|
| `Monitoring(alias, "Label", "Desc")` | Cloud Monitoring |
| `Logging(alias, "Label", "Desc")` | Cloud Logging |
| `Trace(alias, "Label", "Desc")` | Cloud Trace |
| `CloudDeploymentManager(alias, "Label", "Desc")` | Deployment Manager |

---

## Kubernetes Icons (stdlib `k8s`)

Include:
```plantuml
!include <k8s/Common>
!include <k8s/OSS/KubernetesPod>
!include <k8s/OSS/all>                  ' All K8s resources
```

### Workloads (`!include <k8s/OSS/Kubernetes{Name}>`)

| Macro | Resource |
|-------|----------|
| `KubernetesPod(alias, "Label", "")` | Pod |
| `KubernetesDeploy(alias, "Label", "")` | Deployment |
| `KubernetesSts(alias, "Label", "")` | StatefulSet |
| `KubernetesDs(alias, "Label", "")` | DaemonSet |
| `KubernetesRs(alias, "Label", "")` | ReplicaSet |
| `KubernetesJob(alias, "Label", "")` | Job |
| `KubernetesCronjob(alias, "Label", "")` | CronJob |

### Networking

| Macro | Resource |
|-------|----------|
| `KubernetesSvc(alias, "Label", "")` | Service |
| `KubernetesIng(alias, "Label", "")` | Ingress |
| `KubernetesEp(alias, "Label", "")` | Endpoint |
| `KubernetesNetpol(alias, "Label", "")` | NetworkPolicy |

### Configuration & Storage

| Macro | Resource |
|-------|----------|
| `KubernetesCm(alias, "Label", "")` | ConfigMap |
| `KubernetesSecret(alias, "Label", "")` | Secret |
| `KubernetesPv(alias, "Label", "")` | PersistentVolume |
| `KubernetesPvc(alias, "Label", "")` | PersistentVolumeClaim |
| `KubernetesSc(alias, "Label", "")` | StorageClass |

### Scaling & RBAC

| Macro | Resource |
|-------|----------|
| `KubernetesHpa(alias, "Label", "")` | HorizontalPodAutoscaler |
| `KubernetesRole(alias, "Label", "")` | Role |
| `KubernetesRb(alias, "Label", "")` | RoleBinding |
| `KubernetesCrole(alias, "Label", "")` | ClusterRole |
| `KubernetesCrb(alias, "Label", "")` | ClusterRoleBinding |
| `KubernetesSa(alias, "Label", "")` | ServiceAccount |

### Control Plane

| Macro | Resource |
|-------|----------|
| `KubernetesApi(alias, "Label", "")` | API Server |
| `KubernetesEtcd(alias, "Label", "")` | Etcd |
| `KubernetesSched(alias, "Label", "")` | Scheduler |
| `KubernetesKproxy(alias, "Label", "")` | KubeProxy |
| `KubernetesCcm(alias, "Label", "")` | Cloud Controller Manager |

### Boundary Macros

```plantuml
Cluster_Boundary(cluster, "Kubernetes Cluster") {
  Namespace_Boundary(ns, "production") {
    ...
  }
}
```

---

## General-Purpose Icons (tupadr3 — stdlib)

Include: `!include <tupadr3/common>`

### Font Awesome (`!include <tupadr3/font-awesome/...>`)

```plantuml
!include <tupadr3/font-awesome/users>
!include <tupadr3/font-awesome/server>
!include <tupadr3/font-awesome/database>
!include <tupadr3/font-awesome/cloud>
!include <tupadr3/font-awesome/lock>
!include <tupadr3/font-awesome/globe>
```

Usage with rectangle: `rectangle "<$users> Users" as u`

### DevIcons (`!include <tupadr3/devicons/...>`)

```plantuml
!include <tupadr3/devicons/react>
!include <tupadr3/devicons/python>
!include <tupadr3/devicons/docker>
!include <tupadr3/devicons/postgresql>
!include <tupadr3/devicons/redis>
!include <tupadr3/devicons/nginx>
```

### Material Design (`!include <material/...>`)

```plantuml
!include <material/common>
!include <material/timer>
!include <material/security>
!include <material/email>
```

---

## Simplified Views

All cloud libraries support a simplified mode for executive presentations:

```plantuml
' AWS
!include <awslib/AWSSimplified>

' Azure
!include <azure/AzureSimplified>

' GCP
!include <gcp/GCPSimplified>
```

---

## Tips for Choosing Icons

1. **Match actual technology** — use `Aurora` not generic `database` if you're using Aurora
2. **Cloud provider specific** — use `Lambda` (not generic `server`) for AWS Lambda
3. **Be consistent** — if the system runs on AWS, use AWS icons throughout
4. **Generic fallbacks** — use PlantUML built-in shapes (`database`, `cloud`, `node`) when specific icons aren't available
5. **Include only what you need** — `all.puml` for an entire category is convenient but slows rendering for large categories
6. **Check AWSSymbols.md** for the authoritative, complete list of all 900+ AWS service macros

## References

- **AWS Symbols (complete list):** https://github.com/awslabs/aws-icons-for-plantuml/blob/main/AWSSymbols.md
- **Azure Symbols (complete list):** https://github.com/plantuml-stdlib/Azure-PlantUML/blob/master/AzureSymbols.md
- **GCP Icons (stdlib `gcp`):** https://github.com/Crashedmind/PlantUML-icons-GCP
- **Kubernetes Icons (stdlib `k8s`):** https://github.com/dcasati/kubernetes-PlantUML
- **PlantUML Stdlib:** https://plantuml.com/stdlib
- **tupadr3 Sprites:** https://github.com/tupadr3/plantuml-icon-font-sprites
