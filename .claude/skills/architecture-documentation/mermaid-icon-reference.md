# Mermaid Icon Reference

## Built-in Icons

These 5 icons require no registration and work on every platform (GitHub, GitLab, Kroki, CLI):

| Icon name   | Usage in architecture            | Usage in flowchart               |
|-------------|----------------------------------|----------------------------------|
| `cloud`     | `service s(cloud)[My Cloud]`     | `A["fa:fa-cloud Cloud"]`         |
| `database`  | `service s(database)[My DB]`     | `A["fa:fa-database Database"]`   |
| `disk`      | `service s(disk)[Storage]`       | N/A                              |
| `internet`  | `service s(internet)[Gateway]`   | N/A                              |
| `server`    | `service s(server)[App Server]`  | `A["fa:fa-server Server"]`       |

---

## Icon Registration API

External icons use the **Iconify** ecosystem (200,000+ icons). Registration must happen before `mermaid.initialize()` or `mermaid.run()`.

### Method 1: CDN Fetch (Simplest)

```javascript
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

mermaid.registerIconPacks([
  {
    name: 'logos',
    loader: () =>
      fetch('https://unpkg.com/@iconify-json/logos@1/icons.json')
        .then((res) => res.json()),
  },
]);
```

### Method 2: npm with Lazy Loading

```bash
npm install @iconify-json/logos
```

```javascript
import mermaid from 'mermaid';

mermaid.registerIconPacks([
  {
    name: 'logos',
    loader: () =>
      import('@iconify-json/logos').then((module) => module.icons),
  },
]);
```

### Method 3: npm Direct Import

```javascript
import mermaid from 'mermaid';
import { icons } from '@iconify-json/logos';

mermaid.registerIconPacks([
  { name: icons.prefix, icons },
]);
```

### Registering Multiple Packs

```javascript
mermaid.registerIconPacks([
  {
    name: 'logos',
    loader: () =>
      fetch('https://unpkg.com/@iconify-json/logos/icons.json')
        .then((res) => res.json()),
  },
  {
    name: 'fa',
    loader: () =>
      fetch('https://unpkg.com/@iconify-json/fa6-regular/icons.json')
        .then((res) => res.json()),
  },
  {
    name: 'fas',
    loader: () =>
      fetch('https://unpkg.com/@iconify-json/fa6-solid/icons.json')
        .then((res) => res.json()),
  },
  {
    name: 'mdi',
    loader: () =>
      fetch('https://unpkg.com/@iconify-json/mdi/icons.json')
        .then((res) => res.json()),
  },
]);
```

### Custom Icon Pack (Inline SVG)

```javascript
mermaid.registerIconPacks([
  {
    name: 'custom',
    loader: async () => ({
      prefix: 'custom',
      icons: {
        'my-service': {
          body: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>',
          width: 24,
          height: 24,
        },
      },
    }),
  },
]);
```

### Registration Properties

| Property | Type     | Required | Description                                              |
|----------|----------|----------|----------------------------------------------------------|
| `name`   | string   | Yes      | Prefix for referencing icons (overrides pack's prefix)   |
| `loader` | function | Either   | Returns Promise resolving to Iconify icon definitions    |
| `icons`  | object   | Either   | Direct Iconify icon object (when not using lazy loading) |

---

## Recommended Icon Packs for Cloud Architecture

### Pack Overview

| npm Package                       | Registration Name    | Icon Count | Use Case                                |
|-----------------------------------|---------------------|------------|------------------------------------------|
| `@iconify-json/logos`             | `logos`             | 1,300+     | Technology & brand logos (AWS, Azure, GCP)|
| `@iconify-json/fa6-regular`      | `fa`                | 160+       | Font Awesome 6 Regular                   |
| `@iconify-json/fa6-solid`        | `fas`               | 1,400+     | Font Awesome 6 Solid                     |
| `@iconify-json/fa6-brands`       | `fab`               | 480+       | Font Awesome 6 Brands                    |
| `@iconify-json/material-symbols` | `material-symbols`  | 7,000+     | Google Material Symbols                  |
| `@iconify-json/mdi`              | `mdi`               | 7,400+     | Material Design Icons                    |
| `@iconify-json/simple-icons`     | `simple-icons`      | 3,100+     | Brand & tech logos (monochrome)          |
| `@iconify-json/devicon`          | `devicon`           | 800+       | Developer & technology icons             |
| `@iconify-json/carbon`           | `carbon`            | 2,100+     | IBM Carbon Design (includes K8s)         |
| `@iconify-json/codicon`          | `codicon`           | 440+       | VS Code icons (includes Azure)           |

Browse all packs: [icon-sets.iconify.design](https://icon-sets.iconify.design/) or [icones.js.org](https://icones.js.org/)

---

## AWS Icons (`logos` pack)

Reference format: `logos:{icon-name}`

### Compute

| Icon                        | Mermaid Reference               |
|-----------------------------|----------------------------------|
| AWS (logo)                  | `logos:aws`                      |
| EC2                         | `logos:aws-ec2`                  |
| Lambda                      | `logos:aws-lambda`               |
| ECS                         | `logos:aws-ecs`                  |
| Fargate                     | `logos:aws-fargate`              |
| Elastic Beanstalk           | `logos:aws-elastic-beanstalk`    |
| Batch                       | `logos:aws-batch`                |

### Storage

| Icon                        | Mermaid Reference               |
|-----------------------------|----------------------------------|
| S3                          | `logos:aws-s3`                   |
| EBS                         | `logos:aws-ebs`                  |
| EFS                         | `logos:aws-efs`                  |
| Glacier                     | `logos:aws-glacier`              |
| Backup                      | `logos:aws-backup`               |

### Database

| Icon                        | Mermaid Reference               |
|-----------------------------|----------------------------------|
| RDS                         | `logos:aws-rds`                  |
| DynamoDB                    | `logos:aws-dynamodb`             |
| Aurora                      | `logos:aws-aurora`               |
| ElastiCache                 | `logos:aws-elasticache`          |
| Redshift                    | `logos:aws-redshift`             |
| Neptune                     | `logos:aws-neptune`              |
| DocumentDB                  | `logos:aws-documentdb`           |

### Networking & Content Delivery

| Icon                        | Mermaid Reference               |
|-----------------------------|----------------------------------|
| VPC                         | `logos:aws-vpc`                  |
| CloudFront                  | `logos:aws-cloudfront`           |
| Route 53                    | `logos:aws-route53`              |
| API Gateway                 | `logos:aws-api-gateway`          |
| Elastic Load Balancing      | `logos:aws-elb`                  |
| Direct Connect              | `logos:aws-direct-connect`       |
| App Mesh                    | `logos:aws-app-mesh`             |

### Application Integration & Messaging

| Icon                        | Mermaid Reference               |
|-----------------------------|----------------------------------|
| SQS                         | `logos:aws-sqs`                  |
| SNS                         | `logos:aws-sns`                  |
| EventBridge                 | `logos:aws-eventbridge`          |
| Step Functions              | `logos:aws-step-functions`       |
| AppSync                     | `logos:aws-appsync`              |
| MQ                          | `logos:aws-mq`                   |

### Security & Identity

| Icon                        | Mermaid Reference               |
|-----------------------------|----------------------------------|
| IAM                         | `logos:aws-iam`                  |
| Cognito                     | `logos:aws-cognito`              |
| KMS                         | `logos:aws-kms`                  |
| WAF                         | `logos:aws-waf`                  |
| Shield                      | `logos:aws-shield`               |
| Secrets Manager             | `logos:aws-secrets-manager`      |

### Management & Monitoring

| Icon                        | Mermaid Reference               |
|-----------------------------|----------------------------------|
| CloudWatch                  | `logos:aws-cloudwatch`           |
| CloudFormation              | `logos:aws-cloudformation`       |
| CloudTrail                  | `logos:aws-cloudtrail`           |
| Systems Manager             | `logos:aws-systems-manager`      |
| Config                      | `logos:aws-config`               |

### Analytics & AI/ML

| Icon                        | Mermaid Reference               |
|-----------------------------|----------------------------------|
| Kinesis                     | `logos:aws-kinesis`              |
| Athena                      | `logos:aws-athena`               |
| Glue                        | `logos:aws-glue`                 |
| SageMaker                   | `logos:aws-sagemaker`            |
| MSK                         | `logos:aws-msk`                  |
| OpenSearch                  | `logos:aws-open-search`          |

### Developer Tools

| Icon                        | Mermaid Reference               |
|-----------------------------|----------------------------------|
| CodePipeline                | `logos:aws-codepipeline`         |
| CodeBuild                   | `logos:aws-codebuild`            |
| CodeDeploy                  | `logos:aws-codedeploy`           |
| CodeCommit                  | `logos:aws-codecommit`           |

### Containers

| Icon                        | Mermaid Reference               |
|-----------------------------|----------------------------------|
| EKS                         | `logos:aws-eks`                  |
| ECR                         | `logos:aws-ecr`                  |

### Other

| Icon                        | Mermaid Reference               |
|-----------------------------|----------------------------------|
| SES                         | `logos:aws-ses`                  |
| Keyspaces                   | `logos:aws-keyspaces`            |

---

## Azure Icons (`logos` pack)

| Icon                        | Mermaid Reference               |
|-----------------------------|----------------------------------|
| Azure (logo)                | `logos:microsoft-azure`          |
| Azure DevOps                | `logos:azure-devops`             |
| Azure Functions             | `logos:azure-functions`          |
| Azure Pipelines             | `logos:azure-pipelines`          |
| Azure Storage               | `logos:azure-storage`            |
| Azure App Service           | `logos:azure-app-service`        |
| Azure Event Hubs            | `logos:azure-event-hubs`         |
| Azure Event Grid            | `logos:azure-event-grid`         |
| Azure Service Bus           | `logos:azure-service-bus`        |
| Azure Cosmos DB             | `logos:azure-cosmos-db`          |
| Azure SQL                   | `logos:azure-sql`                |
| Azure Blob Storage          | `logos:azure-blob-storage`       |
| Azure Active Directory      | `logos:azure-active-directory`   |
| Azure Container Apps        | `logos:azure-container-apps`     |

For VS Code-style Azure icons, also register `@iconify-json/codicon` and use `codicon:azure`, `codicon:azure-devops`.

---

## GCP Icons (`logos` pack)

| Icon                        | Mermaid Reference               |
|-----------------------------|----------------------------------|
| Google Cloud (logo)         | `logos:google-cloud`             |
| Cloud Functions             | `logos:google-cloud-functions`   |
| Cloud Run                   | `logos:google-cloud-run`         |
| Cloud Storage               | `logos:google-cloud-storage`     |
| BigQuery                    | `logos:google-bigquery`          |
| Pub/Sub                     | `logos:google-cloud-pub-sub`     |
| Firebase                    | `logos:firebase`                 |
| Kubernetes Engine           | `logos:google-kubernetes-engine` |

---

## Kubernetes & Container Icons

| Icon                        | Pack & Reference                          |
|-----------------------------|-------------------------------------------|
| Kubernetes                  | `simple-icons:kubernetes`                 |
| Docker                      | `logos:docker-icon`                       |
| Helm                        | `logos:helm`                              |
| Istio                       | `simple-icons:istio`                      |
| Containerd                  | `simple-icons:containerd`                 |

---

## General Technology Icons (`logos` pack)

| Icon                        | Mermaid Reference               |
|-----------------------------|----------------------------------|
| Node.js                     | `logos:nodejs-icon`              |
| Python                      | `logos:python`                   |
| Go                          | `logos:go`                       |
| Java                        | `logos:java`                     |
| Rust                        | `logos:rust`                     |
| TypeScript                  | `logos:typescript-icon`          |
| React                       | `logos:react`                    |
| Vue                         | `logos:vue`                      |
| Angular                     | `logos:angular-icon`             |
| PostgreSQL                  | `logos:postgresql`               |
| MySQL                       | `logos:mysql`                    |
| MongoDB                     | `logos:mongodb-icon`             |
| Redis                       | `logos:redis`                    |
| Kafka                       | `logos:kafka-icon`               |
| RabbitMQ                    | `logos:rabbitmq-icon`            |
| Elasticsearch               | `logos:elasticsearch`            |
| Nginx                       | `logos:nginx`                    |
| GraphQL                     | `logos:graphql`                  |
| Terraform                   | `logos:terraform-icon`           |
| Git                         | `logos:git-icon`                 |
| GitHub                      | `logos:github-icon`              |
| GitHub Actions              | `logos:github-actions`           |
| GitLab                      | `logos:gitlab`                   |
| Jenkins                     | `logos:jenkins`                  |
| ArgoCD                      | `logos:argo-icon`                |
| Grafana                     | `logos:grafana`                  |
| Prometheus                  | `logos:prometheus`               |
| Datadog                     | `logos:datadog`                  |
| Snowflake                   | `logos:snowflake-icon`           |
| Stripe                      | `logos:stripe`                   |
| Auth0                       | `logos:auth0-icon`               |

---

## Font Awesome Icons (`fa` / `fas` packs)

Useful for generic infrastructure concepts:

| Concept          | Icon Reference        | Pack       |
|------------------|-----------------------|------------|
| User             | `fa:user`             | fa6-regular|
| Users/Group      | `fas:users`           | fa6-solid  |
| Lock/Security    | `fas:lock`            | fa6-solid  |
| Globe/Internet   | `fas:globe`           | fa6-solid  |
| Cloud            | `fas:cloud`           | fa6-solid  |
| Database         | `fas:database`        | fa6-solid  |
| Server           | `fas:server`          | fa6-solid  |
| Network          | `fas:network-wired`   | fa6-solid  |
| Shield           | `fas:shield-halved`   | fa6-solid  |
| Gear/Config      | `fas:gear`            | fa6-solid  |
| Code             | `fas:code`            | fa6-solid  |
| Terminal         | `fas:terminal`        | fa6-solid  |
| Envelope/Email   | `fas:envelope`        | fa6-solid  |
| Bell/Alert       | `fas:bell`            | fa6-solid  |
| Chart/Metrics    | `fas:chart-line`      | fa6-solid  |
| Bug              | `fas:bug`             | fa6-solid  |
| Key              | `fas:key`             | fa6-solid  |
| Image            | `fa:image`            | fa6-regular|

---

## Material Design Icons (`mdi` pack)

Good for detailed infrastructure concepts:

| Concept              | Icon Reference              |
|----------------------|-----------------------------|
| Kubernetes           | `mdi:kubernetes`            |
| Docker               | `mdi:docker`                |
| Cloud                | `mdi:cloud`                 |
| Database             | `mdi:database`              |
| Server               | `mdi:server`                |
| Network              | `mdi:server-network`        |
| Security             | `mdi:shield-lock`           |
| API                  | `mdi:api`                   |
| Webhook              | `mdi:webhook`               |
| Console              | `mdi:console`               |
| Monitor              | `mdi:monitor-dashboard`     |
| Certificate          | `mdi:certificate`           |
| Message Queue        | `mdi:message-processing`    |
| Load Balancer        | `mdi:scale-balance`         |
| Cache                | `mdi:cached`                |
| Sync                 | `mdi:sync`                  |
| Upload               | `mdi:cloud-upload`          |
| Download             | `mdi:cloud-download`        |

---

## Important Notes

1. **Coverage gap:** The `logos` Iconify pack contains brand/technology logos, NOT the full official AWS Architecture Icon set (which has 900+ service-specific icons). PlantUML stdlib has significantly broader AWS icon coverage.

2. **Browsing icons:** Search all available icons at [icon-sets.iconify.design](https://icon-sets.iconify.design/) — filter by pack name to find exact icon names.

3. **Case sensitivity:** Icon names are case-sensitive. Use exact names from the Iconify catalog.

4. **Platform rendering:** On GitHub/GitLab markdown, only the 5 built-in icons render. For full icon support, render diagrams locally and embed as images.

5. **Async loading:** When using CDN fetch, icons load asynchronously. Call `await mermaid.run()` after registration to ensure icons are loaded before rendering.
