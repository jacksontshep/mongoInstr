# N|Solid OpenTelemetry Instrumentation Guide

**DRAFT 08/01/2025**

## Introduction

This is a guide for implementing custom OpenTelemetry trace and metric instrumentation into your team's N|Solid projects. N|Solid provides trace spans and metrics natively for HTTP and DNS requests, for many projects that may be all that is necessary. 

For those looking for more in-depth information on their applications, N|Solid provides a route for easy custom OpenTelemetry instrumentation that can send data directly to the N|Solid console. Rather than performing traditional OpenTelemetry instrumentation with endpoints such as Grafana|Tempo, N|Solid users have the opportunity to keep all of their necessary diagnostic information in a single centralized suite.

## Setup Requirements

- ✅ **N|Solid runtime installed**
- ✅ **N|Solid SaaS connected**
- ✅ **Environment variable** `NSOLID_TRACING_ENABLED=1` for all desired processes
- ✅ **Latest stable release** of your desired OpenTelemetry instrumentation configured in `package.json` 
  - Examples: `@opentelemetry/instrumentation-ioredis`, `@opentelemetry/instrumentation-mongodb`, etc.
- ✅ **Latest stable release** of `@opentelemetry/api` configured in `package.json`

## Implementation

For this example, we will set up MongoDB instrumentation in a Node.js application:

### Step 1: Set Instrumentation Requirements

Set instrumentation requirements for the desired module(s) **before** establishing other methods or requirements:

```javascript
// -- Otel Instrumentation provides spans for worker management--
const nsolid = require('nsolid')
const { MongoDBInstrumentation } = require('@opentelemetry/instrumentation-mongodb')
const api = require('@opentelemetry/api')
```

### Step 2: Register OpenTelemetry API with N|Solid

```javascript
if (!nsolid.otel.register(api)) {
  throw new Error('Failed to register NSOLID OpenTelemetry')
}
```

### Step 3: Register Instrumentation

Register the desired instrumentation with the N|Solid native implementation of OpenTelemetry instrumentation:

```javascript
nsolid.otel.registerInstrumentations([
  new MongoDBInstrumentation()
])
```

### Step 4: Custom Implementation (Optional)

For custom implementation, users can implement custom hooks and options as specified by the original instrument's documentation in the OpenTelemetry documentation - [@opentelemetry/instrumentation-mongodb - npm](https://www.npmjs.com/package/@opentelemetry/instrumentation-mongodb)

## Results

After performing this implementation and rebuilding your program, you can gain visibility into your MongoDB traces in the **N|Solid console's 'traces' menu**. 

Some programs may require more detailed tooling with set hooks and added API context.

## Benefits

- 🎯 **Centralized Diagnostics** - All trace data in one place
- 🔍 **MongoDB Visibility** - Automatic tracing of database operations
- 📊 **N|Solid Integration** - Direct integration with N|Solid SaaS dashboard
- 🚀 **Easy Setup** - Simple 3-step implementation process
