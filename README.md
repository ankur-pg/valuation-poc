# ProxyPrice POC

A Node.js proof-of-concept application for benchmarking property valuation API calls using the ProxyPrice service.

## Description

This application tests the ProxyPrice API by making concurrent requests for different unit types and postcodes in Singapore residential properties. It measures response times and success rates to evaluate API performance.

## Features

- Concurrent API calls for multiple property configurations
- Performance benchmarking with execution time tracking
- Error handling and reporting
- Support for different unit types (2-room, 3-room, 4-room)
- HTTP connection pooling with keep-alive

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Run the benchmark:
```bash
node index.js
```

The application will:
- Make API calls for all combinations of unit types and postcodes
- Display a summary showing total calls, successful responses, failed responses, and execution time
- Report any errors encountered during the process

## Configuration

The application uses the following default configurations:

- **Unit Types**: 2-room, 3-room, 4-room
- **Postcodes**: 469970-469976
- **Property Type**: Condo
- **Timeout**: 10 seconds

## Output

The benchmark provides a summary report including:
- Total number of API calls made
- Number of successful responses
- Number of failed responses
- Total execution time
- Error details (if any)

## Dependencies

- `axios`: HTTP client for making API requests
- `https`: Node.js built-in module for HTTPS agent configuration
