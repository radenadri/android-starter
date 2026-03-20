# Eraser Architecture Diagram Syntax Reference

Complete syntax reference for Eraser's diagram-as-code language.

**Official Documentation:** https://docs.eraser.io/docs/syntax

## Core Building Blocks

### Nodes

Nodes are the foundation of architecture diagrams. A node consists of a name followed by optional properties in brackets.

**Syntax:**
```
NodeName [property: value, property: value]
```

**Examples:**
```
compute [icon: aws-ec2]
database [icon: aws-rds, color: blue]
api [icon: nodejs, label: "REST API"]
```

**Rules:**
- Node names must be unique within a diagram
- Names with spaces or special characters must be quoted: `"HTTPS Server"`
- Nodes referenced in connections are auto-created if not explicitly defined

### Groups

Groups are containers that encapsulate nodes and other groups.

**Syntax:**
```
GroupName {
  Node1
  Node2
  NestedGroup {
    Node3
  }
}
```

**Examples:**
```
AWS Cloud {
  VPC [icon: aws-vpc] {
    Public Subnet [icon: aws-public-subnet] {
      WebServer [icon: aws-ec2]
    }
    Private Subnet [icon: aws-private-subnet] {
      Database [icon: aws-rds]
    }
  }
}
```

**Rules:**
- Group names must be unique
- Groups can be nested arbitrarily deep
- Groups support all properties (icon, color, label, etc.)

## Properties

Properties are key-value pairs enclosed in square brackets `[property: value]`.

### Available Properties

| Property | Values | Default | Description |
|----------|--------|---------|-------------|
| `icon` | Icon name (see icon-reference.md) | none | Service/tech icon |
| `color` | Color name or hex code (quoted) | none | Element color |
| `label` | Custom text (quoted if has spaces) | Node name | Display text |
| `colorMode` | `pastel`, `bold`, `outline` | `pastel` | Color style |
| `styleMode` | `shadow`, `plain`, `watercolor` | `shadow` | Visual style |
| `typeface` | `rough`, `clean`, `mono` | `rough` | Font style |
| `shape` | `rectangle`, `circle`, `cylinder`, `queue`, `diamond` | `rectangle` | Node shape |

### Property Examples

```
// Single property
Server [icon: aws-ec2]

// Multiple properties
Database [icon: aws-rds, color: blue, label: "PostgreSQL"]

// Color with hex code
API [icon: nodejs, color: "#00ff00"]

// Shape variations
Cache [icon: redis, shape: cylinder]
Queue [icon: aws-sqs, shape: queue]
Decision [label: "Is Valid?", shape: diamond]
```

### Style Properties

Apply diagram-level styling at the top of the diagram:

```
// Diagram-level styles
colorMode bold
styleMode watercolor
typeface clean

// Then define your diagram
Server [icon: aws-ec2]
Database [icon: aws-rds]
```

## Connections

Connections represent relationships between nodes and groups.

### Connection Types

| Syntax | Appearance | Use Case |
|--------|------------|----------|
| `>` | Left-to-right arrow | Data flow, request flow |
| `<` | Right-to-left arrow | Response flow |
| `<>` | Bi-directional arrow | Two-way sync, RPC |
| `-` | Solid line | Association |
| `--` | Dotted line | Weak dependency |
| `-->` | Dotted arrow | Async flow, optional |

### Connection Syntax

**Basic connections:**
```
Server > Database
Client < Server
Frontend <> Backend
Service - Cache
AsyncJob --> Queue
```

**Connections with labels:**
```
Client > Server: HTTPS Request
Server > Database: SQL Query
Cache > Server: Cache Hit
```

**One-to-many connections:**
```
LoadBalancer > Server1, Server2, Server3
```

**Chained connections:**
```
Client > API > Service > Database
```

**Connecting groups:**
```
VPC {
  Subnet1 {
    Server1
  }
  Subnet2 {
    Server2
  }
}

VPC.Subnet1 > VPC.Subnet2: Internal Traffic
```

## Layout Direction

Control the diagram layout direction:

```
direction down    // Top to bottom (default for sequence diagrams)
direction up      // Bottom to top
direction right   // Left to right (default)
direction left    // Right to left
```

**Example:**
```
direction down

User [icon: users]
API [icon: server]
Database [icon: database]

User > API
API > Database
```

## Complete Example

```
// Diagram styles
colorMode bold
styleMode shadow
direction right

// Define architecture
AWS Cloud [icon: aws-cloud] {

  VPC [icon: aws-vpc, label: "Production VPC"] {

    Public Subnet [icon: aws-public-subnet, color: green] {
      ALB [icon: aws-elb, label: "Application Load Balancer"]
      NAT [icon: aws-nat-gateway, label: "NAT Gateway"]
    }

    Private Subnet [icon: aws-private-subnet, color: orange] {
      EC2-1 [icon: aws-ec2, label: "Web Server 1"]
      EC2-2 [icon: aws-ec2, label: "Web Server 2"]
      Cache [icon: aws-elasticache, shape: cylinder]
    }

    Database Subnet [icon: aws-private-subnet, color: red] {
      RDS [icon: aws-rds, label: "PostgreSQL"]
    }
  }

  S3 [icon: aws-s3, label: "Static Assets"]
  CloudFront [icon: aws-cloudfront, label: "CDN"]
}

// External users
Users [icon: users, label: "End Users"]

// Define connections
Users > CloudFront: HTTPS
CloudFront > S3: Fetch Assets
CloudFront > ALB: API Requests
ALB > EC2-1, EC2-2: Distribute Load
EC2-1 > Cache: Query Cache
EC2-2 > Cache: Query Cache
EC2-1, EC2-2 > RDS: Database Queries
EC2-1, EC2-2 > S3: Upload Files
```

## Advanced Features

### Escaping Special Characters

Wrap node names in quotes to use reserved characters:

```
"https://api.example.com" [icon: server]
"User Name (Admin)" [icon: users]
```

### Auto-created Nodes

Nodes referenced in connections are automatically created:

```
// These nodes are auto-created
Frontend > Backend
Backend > Database

// No need to explicitly define Frontend, Backend, Database
```

### Comments

Use `//` for single-line comments:

```
// This is a comment
Server [icon: aws-ec2]  // Inline comment
```

## Common Patterns

### Three-Tier Architecture

```
direction down

Web Tier [color: green] {
  LoadBalancer [icon: aws-elb]
  WebServer1 [icon: aws-ec2]
  WebServer2 [icon: aws-ec2]
}

App Tier [color: blue] {
  AppServer1 [icon: nodejs]
  AppServer2 [icon: nodejs]
}

Data Tier [color: red] {
  Database [icon: aws-rds]
  Cache [icon: redis, shape: cylinder]
}

LoadBalancer > WebServer1, WebServer2
WebServer1, WebServer2 > AppServer1, AppServer2
AppServer1, AppServer2 > Database
AppServer1, AppServer2 > Cache
```

### Microservices

```
direction right

API Gateway [icon: aws-api-gateway]

Services {
  UserService [icon: docker]
  OrderService [icon: docker]
  PaymentService [icon: docker]
}

Databases {
  UserDB [icon: postgres, shape: cylinder]
  OrderDB [icon: mongodb, shape: cylinder]
  PaymentDB [icon: mysql, shape: cylinder]
}

API Gateway > UserService, OrderService, PaymentService
UserService > UserDB
OrderService > OrderDB
PaymentService > PaymentDB

MessageQueue [icon: aws-sqs, shape: queue]
OrderService > MessageQueue: Order Created
PaymentService < MessageQueue: Process Payment
```

### Data Pipeline

```
direction right

Sources [color: blue] {
  DB1 [icon: oracle, label: "Oracle DB"]
  API1 [icon: rest-api, label: "REST API"]
  Files [icon: csv, label: "CSV Files"]
}

Ingestion [color: green] {
  Kafka [icon: kafka, shape: queue]
  S3 [icon: aws-s3]
}

Processing [color: orange] {
  Spark [icon: spark]
  Databricks [icon: databricks]
}

Analytics [color: purple] {
  Warehouse [icon: snowflake, shape: cylinder]
  BI [icon: tableau]
}

DB1, API1, Files > Kafka
Kafka > S3
S3 > Spark
Spark > Databricks
Databricks > Warehouse
Warehouse > BI
```

## Tips & Best Practices

1. **Use meaningful names:** `WebServer` is better than `server1`
2. **Group logically:** Group related components together
3. **Label connections:** Add labels to show what data/messages flow
4. **Use appropriate icons:** Match icons to actual technologies
5. **Control direction:** Use `direction` to optimize layout
6. **Color code:** Use colors to distinguish tiers or environments
7. **Add context:** Use labels to add version numbers, instance counts, etc.

## Troubleshooting

### Diagram not rendering
- Check for unmatched brackets `{ }`
- Ensure all quoted strings are properly closed
- Verify icon names are valid (see icon-reference.md)

### Connections not showing
- Make sure node names match exactly (case-sensitive)
- Use quotes for names with special characters
- Check that connection syntax is correct (`>`, `<`, `<>`, etc.)

### Layout issues
- Try different `direction` settings
- Adjust grouping structure
- Use explicit node definitions before connections

## References

- **Official Syntax Guide:** https://docs.eraser.io/docs/syntax
- **Icon Reference:** https://docs.eraser.io/docs/icons
- **Examples:** https://docs.eraser.io/docs/examples
- **Architecture Diagrams:** https://docs.eraser.io/docs/cloud-architecture-diagrams
