# Mermaid Diagram Examples

Real-world cloud architecture diagrams using Mermaid's architecture, C4, and flowchart diagram types.

---

## Example 1: AWS Three-Tier Web Application (Built-in Icons)

Works on GitHub, GitLab, Kroki — no icon registration needed.

````mermaid
architecture-beta
    group vpc(cloud)[AWS Cloud]
    group public(cloud)[Public Subnet] in vpc
    group private(cloud)[Private Subnet] in vpc
    group data(cloud)[Data Tier] in vpc

    service users(internet)[Users]
    service cdn(server)[CloudFront CDN] in public
    service alb(server)[Load Balancer] in public
    service app1(server)[App Server 1] in private
    service app2(server)[App Server 2] in private
    service cache(database)[Redis Cache] in data
    service db(database)[Aurora DB] in data
    service storage(disk)[S3 Storage] in vpc

    users:R --> L:cdn
    cdn:R --> L:alb
    alb:B --> T:app1
    alb:B --> T:app2
    app1:R --> L:cache
    app1:B --> T:db
    app2:R --> L:cache
    app2:B --> T:db
    app1:L --> R:storage
````

---

## Example 2: AWS Cloud Architecture (Logos Icon Pack)

Requires `logos` icon pack registration.

````mermaid
architecture-beta
    group vpc(logos:aws)[AWS Cloud]
    group public_subnet(cloud)[Public Subnet] in vpc
    group private_subnet(cloud)[Private Subnet] in vpc

    service users(internet)[Users]
    service cdn(logos:aws-cloudfront)[CloudFront] in public_subnet
    service apigw(logos:aws-api-gateway)[API Gateway] in public_subnet
    service lambda(logos:aws-lambda)[Lambda Functions] in private_subnet
    service ecs(logos:aws-ecs)[ECS Service] in private_subnet
    service rds(logos:aws-aurora)[Aurora DB] in private_subnet
    service cache(logos:aws-elasticache)[ElastiCache] in private_subnet
    service s3(logos:aws-s3)[S3 Bucket] in vpc
    service sqs(logos:aws-sqs)[SQS Queue] in vpc

    users:R --> L:cdn
    cdn:R --> L:apigw
    apigw:B --> T:lambda
    apigw:B --> T:ecs
    lambda:R --> L:rds
    ecs:R --> L:cache
    ecs:B --> T:rds
    lambda:L --> R:sqs
    sqs:B --> T:ecs
    ecs:L --> R:s3
````

---

## Example 3: Microservices Event-Driven Architecture (Built-in Icons)

````mermaid
architecture-beta
    group gateway(cloud)[API Layer]
    group services(cloud)[Microservices]
    group messaging(cloud)[Event Bus]
    group storage(cloud)[Data Stores]

    service client(internet)[Mobile/Web Client]
    service apigw(server)[API Gateway] in gateway
    service auth(server)[Auth Service] in gateway

    service orders(server)[Order Service] in services
    service payments(server)[Payment Service] in services
    service inventory(server)[Inventory Service] in services
    service notify(server)[Notification Service] in services

    service queue(server)[Message Queue] in messaging
    service events(server)[Event Store] in messaging

    service orderdb(database)[Orders DB] in storage
    service paydb(database)[Payments DB] in storage
    service invdb(database)[Inventory DB] in storage

    client:R --> L:apigw
    apigw:R --> L:auth
    apigw:B --> T:orders
    apigw:B --> T:payments

    orders:B --> T:orderdb
    orders:R --> L:queue
    payments:B --> T:paydb
    payments:R --> L:queue

    queue:R --> L:events
    queue:B --> T:inventory
    queue:B --> T:notify

    inventory:B --> T:invdb
````

---

## Example 4: Azure AI RAG System (Logos Icon Pack)

````mermaid
architecture-beta
    group azure(logos:microsoft-azure)[Azure Cloud]
    group vnet(cloud)[Virtual Network] in azure
    group compute(cloud)[Compute] in vnet
    group ai(cloud)[AI Services] in azure
    group data(cloud)[Data Layer] in azure

    service users(internet)[Users]
    service apim(server)[API Management] in vnet

    service webapp(logos:azure-app-service)[Web App] in compute
    service funcapp(logos:azure-functions)[Function App] in compute

    service openai(server)[Azure OpenAI] in ai
    service search(server)[AI Search] in ai
    service docint(server)[Doc Intelligence] in ai

    service cosmos(logos:azure-cosmos-db)[Cosmos DB] in data
    service blob(logos:azure-blob-storage)[Blob Storage] in data
    service redis(database)[Redis Cache] in data

    users:R --> L:apim
    apim:B --> T:webapp
    webapp:R --> L:funcapp
    webapp:B --> T:openai
    funcapp:B --> T:docint
    funcapp:R --> L:search
    openai:B --> T:search
    search:B --> T:cosmos
    webapp:L --> R:redis
    funcapp:L --> R:blob
````

---

## Example 5: GCP Data Pipeline (Logos Icon Pack)

````mermaid
architecture-beta
    group gcp(logos:google-cloud)[Google Cloud]
    group ingest(cloud)[Ingestion] in gcp
    group process(cloud)[Processing] in gcp
    group store(cloud)[Storage & Analytics] in gcp

    service sources(internet)[Data Sources]

    service pubsub(logos:google-cloud-pub-sub)[Pub/Sub] in ingest
    service gcs_raw(logos:google-cloud-storage)[Raw Data (GCS)] in ingest

    service dataflow(server)[Dataflow] in process
    service functions(logos:google-cloud-functions)[Cloud Functions] in process

    service bigquery(logos:google-bigquery)[BigQuery] in store
    service gcs_proc(logos:google-cloud-storage)[Processed (GCS)] in store
    service firestore(server)[Firestore] in store

    sources:R --> L:pubsub
    sources:B --> T:gcs_raw
    pubsub:R --> L:dataflow
    gcs_raw:R --> L:functions
    dataflow:R --> L:bigquery
    dataflow:B --> T:gcs_proc
    functions:B --> T:firestore
````

---

## Example 6: Kubernetes Deployment (Built-in Icons with Junctions)

````mermaid
architecture-beta
    group cluster(cloud)[Kubernetes Cluster]
    group ingress_ns(cloud)[Ingress Namespace] in cluster
    group app_ns(cloud)[App Namespace] in cluster
    group data_ns(cloud)[Data Namespace] in cluster

    service users(internet)[External Traffic]
    service ingress(server)[Ingress Controller] in ingress_ns
    service svc_web(server)[Web Service] in app_ns
    service svc_api(server)[API Service] in app_ns
    service svc_worker(server)[Worker Service] in app_ns

    junction junc_app in app_ns

    service pg(database)[PostgreSQL] in data_ns
    service redis(database)[Redis] in data_ns
    service mq(server)[RabbitMQ] in data_ns

    users:R --> L:ingress
    ingress:B --> T:svc_web
    ingress:B --> T:svc_api

    svc_api:B --> T:junc_app
    junc_app:L --> R:pg
    junc_app:B --> T:redis
    junc_app:R --> L:mq

    mq:B --> T:svc_worker
    svc_worker:L --> R:pg
````

---

## Example 7: CI/CD Pipeline (Logos Icon Pack)

````mermaid
architecture-beta
    group dev(cloud)[Development]
    group ci(cloud)[CI/CD]
    group deploy(cloud)[Deployment]
    group prod(cloud)[Production]

    service git(logos:git-icon)[Git Repo] in dev
    service github(logos:github-icon)[GitHub] in dev

    service actions(logos:github-actions)[GitHub Actions] in ci
    service registry(logos:docker-icon)[Container Registry] in ci
    service scan(server)[Security Scan] in ci

    service argocd(logos:argo-icon)[ArgoCD] in deploy
    service terraform(logos:terraform-icon)[Terraform] in deploy

    service k8s(server)[Kubernetes] in prod
    service monitor(logos:grafana)[Grafana] in prod
    service prom(logos:prometheus)[Prometheus] in prod

    git:R --> L:github
    github:R --> L:actions
    actions:B --> T:scan
    actions:R --> L:registry
    registry:R --> L:argocd
    scan:R --> L:argocd
    argocd:B --> T:terraform
    terraform:R --> L:k8s
    k8s:B --> T:prom
    prom:R --> L:monitor
````

---

## Example 8: C4 System Context Diagram

````mermaid
C4Context
    title System Context - E-Commerce Platform

    Person(customer, "Customer", "Browses products and places orders")
    Person(admin, "Admin", "Manages products and orders")

    System(ecommerce, "E-Commerce Platform", "Handles product catalog, orders, and payments")

    System_Ext(payment, "Payment Gateway", "Processes credit card payments")
    System_Ext(shipping, "Shipping Provider", "Handles order fulfillment and delivery")
    System_Ext(email, "Email Service", "Sends transactional emails")

    Rel(customer, ecommerce, "Browses, orders", "HTTPS")
    Rel(admin, ecommerce, "Manages", "HTTPS")
    Rel(ecommerce, payment, "Processes payments", "REST API")
    Rel(ecommerce, shipping, "Creates shipments", "REST API")
    Rel(ecommerce, email, "Sends notifications", "SMTP")
````

---

## Example 9: C4 Container Diagram

````mermaid
C4Container
    title Container Diagram - E-Commerce Platform

    Person(customer, "Customer", "Places orders via browser or mobile")

    System_Boundary(ecommerce, "E-Commerce Platform") {
        Container(spa, "Web App", "React", "Product browsing and checkout UI")
        Container(api, "API Gateway", "Node.js/Express", "REST API, authentication, rate limiting")
        Container(catalog, "Catalog Service", "Python/FastAPI", "Product search and recommendations")
        Container(orders, "Order Service", "Go", "Order processing and state machine")
        Container(events, "Event Bus", "Kafka", "Async event distribution")
        ContainerDb(catalogdb, "Catalog DB", "PostgreSQL", "Product data, categories, pricing")
        ContainerDb(orderdb, "Order DB", "PostgreSQL", "Order state, history")
        ContainerDb(cache, "Cache", "Redis", "Session data, product cache")
    }

    System_Ext(payment, "Stripe", "Payment processing")
    System_Ext(cdn, "CloudFront", "Static asset delivery")

    Rel(customer, cdn, "Loads assets", "HTTPS")
    Rel(customer, spa, "Uses", "HTTPS")
    Rel(spa, api, "API calls", "JSON/HTTPS")
    Rel(api, catalog, "Queries products", "gRPC")
    Rel(api, orders, "Creates orders", "gRPC")
    Rel(api, cache, "Reads/Writes", "Redis Protocol")
    Rel(catalog, catalogdb, "Reads", "SQL")
    Rel(orders, orderdb, "Reads/Writes", "SQL")
    Rel(orders, events, "Publishes events", "Kafka Protocol")
    Rel(orders, payment, "Charges", "REST API")
    Rel(catalog, events, "Consumes events", "Kafka Protocol")
````

---

## Example 10: C4 Deployment Diagram

````mermaid
C4Deployment
    title Deployment Diagram - Production Environment

    Deployment_Node(aws, "AWS", "us-east-1") {
        Deployment_Node(vpc, "VPC", "10.0.0.0/16") {
            Deployment_Node(pub_sub, "Public Subnet") {
                Deployment_Node(alb, "ALB", "Application Load Balancer") {
                    Container(lb, "Load Balancer", "AWS ALB", "Routes traffic to ECS tasks")
                }
            }
            Deployment_Node(priv_sub, "Private Subnet") {
                Deployment_Node(ecs, "ECS Cluster", "Fargate") {
                    Container(api, "API Service", "Node.js", "3 tasks, 512MB each")
                    Container(worker, "Worker Service", "Python", "2 tasks, 1GB each")
                }
                Deployment_Node(rds, "RDS", "Multi-AZ") {
                    ContainerDb(db, "PostgreSQL", "15.x", "db.r6g.large, 100GB gp3")
                }
                Deployment_Node(elasticache, "ElastiCache") {
                    ContainerDb(redis, "Redis", "7.x", "cache.r6g.large, 2 replicas")
                }
            }
        }
    }

    Rel(lb, api, "Routes requests", "HTTP/8080")
    Rel(api, db, "Queries", "PostgreSQL/5432")
    Rel(api, redis, "Caches", "Redis/6379")
    Rel(worker, db, "Reads/Writes", "PostgreSQL/5432")
````

---

## Example 11: Flowchart with Cloud Icon Shapes (Logos Pack)

````mermaid
flowchart TD
    users@{ icon: "fas:users", form: "circle", label: "Users", pos: "b", h: 60 }
    cdn@{ icon: "logos:aws-cloudfront", form: "rounded", label: "CloudFront", h: 48 }
    apigw@{ icon: "logos:aws-api-gateway", form: "rounded", label: "API Gateway", h: 48 }
    lambda@{ icon: "logos:aws-lambda", form: "rounded", label: "Lambda", h: 48 }
    dynamo@{ icon: "logos:aws-dynamodb", form: "rounded", label: "DynamoDB", h: 48 }
    s3@{ icon: "logos:aws-s3", form: "rounded", label: "S3", h: 48 }
    sqs@{ icon: "logos:aws-sqs", form: "rounded", label: "SQS", h: 48 }

    users --> cdn
    cdn --> apigw
    apigw --> lambda
    lambda --> dynamo
    lambda --> s3
    lambda --> sqs

    classDef awsNode fill:#FF9900,stroke:#232F3E,color:#fff
    class cdn,apigw,lambda,dynamo,s3,sqs awsNode
````

---

## Example 12: Multi-Region High Availability (Built-in Icons)

````mermaid
architecture-beta
    group global(cloud)[Global]
    group region1(cloud)[US-East-1] in global
    group region2(cloud)[EU-West-1] in global

    service dns(internet)[Route 53 DNS] in global
    service cdn(server)[CloudFront CDN] in global

    service alb1(server)[ALB] in region1
    service app1(server)[App Cluster] in region1
    service db1(database)[Primary DB] in region1
    service cache1(database)[Redis] in region1

    service alb2(server)[ALB] in region2
    service app2(server)[App Cluster] in region2
    service db2(database)[Replica DB] in region2
    service cache2(database)[Redis] in region2

    dns:B --> T:cdn
    cdn:B --> T:alb1
    cdn:B --> T:alb2

    alb1:B --> T:app1
    app1:R --> L:cache1
    app1:B --> T:db1

    alb2:B --> T:app2
    app2:R --> L:cache2
    app2:B --> T:db2

    db1:R --> L:db2
````

---

## Example 13: Serverless Event-Driven Architecture (Logos Pack)

````mermaid
architecture-beta
    group aws(logos:aws)[AWS Cloud]
    group ingest(cloud)[Ingestion Layer] in aws
    group process(cloud)[Processing Layer] in aws
    group store(cloud)[Storage Layer] in aws
    group notify(cloud)[Notification Layer] in aws

    service client(internet)[Client Apps]

    service apigw(logos:aws-api-gateway)[API Gateway] in ingest
    service kinesis(logos:aws-kinesis)[Kinesis Stream] in ingest

    service lambda1(logos:aws-lambda)[Validator Lambda] in process
    service lambda2(logos:aws-lambda)[Enrichment Lambda] in process
    service step(logos:aws-step-functions)[Step Functions] in process

    service dynamo(logos:aws-dynamodb)[DynamoDB] in store
    service s3(logos:aws-s3)[S3 Data Lake] in store

    service sns(logos:aws-sns)[SNS Topic] in notify
    service ses(logos:aws-ses)[SES Email] in notify

    client:R --> L:apigw
    apigw:R --> L:kinesis
    kinesis:B --> T:lambda1
    lambda1:R --> L:lambda2
    lambda2:R --> L:step
    step:B --> T:dynamo
    step:B --> T:s3
    step:R --> L:sns
    sns:B --> T:ses
````

---

## Tips and Patterns

### Layout Control via Edge Directions

The sides you connect determine layout. `L`/`R` connections place nodes horizontally; `T`/`B` connections stack vertically:

```
# Horizontal flow
a:R --> L:b    # a left of b

# Vertical flow
a:B --> T:b    # a above b

# Mix for complex layouts
a:R --> L:b
a:B --> T:c    # b right of a, c below a
```

### When to Use Each Diagram Type

| Scenario                                | Diagram Type           |
|-----------------------------------------|------------------------|
| Cloud deployment topology               | `architecture-beta`    |
| System context (who talks to whom)      | `C4Context`            |
| Application internals                   | `C4Container`          |
| Component breakdown                     | `C4Component`          |
| Infrastructure/host mapping             | `C4Deployment`         |
| Data flow with decision points          | `flowchart`            |
| API interaction sequences               | `sequenceDiagram`      |
| Quick diagram with branded cloud icons  | `flowchart` (icon shapes) |

### Handling Icon Pack Unavailability

When targeting platforms without icon registration (GitHub, GitLab), either:

1. **Use built-in icons** and add clear labels:
   ```
   service lambda(server)[Lambda Function]
   service db(database)[Aurora PostgreSQL]
   ```

2. **Pre-render with full icons** and embed as images:
   ```bash
   mmdc -i diagram.mmd -o diagram.svg
   # Then reference: ![Architecture](./diagram.svg)
   ```

3. **Use PlantUML/Kroki instead** for maximum cloud icon coverage (900+ AWS icons in stdlib).
