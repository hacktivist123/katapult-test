---
title: 'S3 Compatibility with Katapult Object Storage'
id: object-storage-guide
sidebar_label: 'S3 Compatibility with Katapult Object Storage'
description: 'Learn how to leverage S3 compatibility in Katapult Object Storage using Go. A practical guide to using standard S3 tools and libraries with Katapult.'
---

This guide demonstrates how to use [Katapult's S3-compatible Object Storage service](https://katapult.io/products/object-storage/)
with Go. You'll learn how to:

- Enable Katapult Object Storage
- Create and manage buckets
- Upload and manage objects using Go
- Use standard S3-compatible libraries

By the end of this tutorial, you'll have a working Go application that can interact
with Katapult Object Storage using standard S3 protocols.

## What is S3 Compatibility?

S3 (Simple Storage Service) compatibility means that Katapult Object Storage
implements the same API and protocols as Amazon S3. This allows you to use any
S3-compatible tool, library, or application
with Katapult Object Storage without modification.

## Prerequisites

- A Katapult account with Object Storage enabled
- Go 1.21 or later
- Basic knowledge of Go

## Setting Up Your Katapult Account

### 1. Enable Object Storage

1. Log in to the Katapult Console
2. Navigate to **Storage >> Object Storage**
3. Click "Enable Object Storage"

### 2. Create a Bucket

1. In the Object Storage dashboard, click "Create Bucket"
2. Enter a unique name for your bucket
3. Click "Create"

![Create Bucket](../static/img/object-storage-tutorial/create-bucket.gif)

### 3. Generate Access Keys

1. Navigate to the Access Keys section
2. Click "Create Access Key"
3. Save your access key ID and secret key securely

![Create Access Keys](../static/img/object-storage-tutorial/create-access-key.gif)

## Building the Application

### 1. Initialize the Project

```bash
mkdir katapult-s3-demo
cd katapult-s3-demo
go mod init katapult-s3-demo
```

### 2. Install Required Dependencies

Install the required Go packages in your project directory:

```bash
go get github.com/minio/minio-go/v7
go get github.com/joho/godotenv
```

### 3. Create the Main Application

Create a file named `main.go`:

 <!-- markdownlint-disable MD013 -->

```go
package main

import (
    "context"
    "fmt"
    "log"
    "os"
    "strings"

    "github.com/joho/godotenv"
    "github.com/minio/minio-go/v7"
    "github.com/minio/minio-go/v7/pkg/credentials"
)

func main() {
    // Load environment variables from .env file
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    // Initialize the S3-compatible client
    endpoint := os.Getenv("KATAPULT_ENDPOINT")
    if endpoint == "" {
        log.Fatal("KATAPULT_ENDPOINT environment variable is not set")
    }

    // Remove port number from endpoint for client
    endpoint = strings.Split(endpoint, ":")[0]

    accessKeyID := os.Getenv("KATAPULT_ACCESS_KEY_ID")
    if accessKeyID == "" {
        log.Fatal("KATAPULT_ACCESS_KEY_ID environment variable is not set")
    }

    secretAccessKey := os.Getenv("KATAPULT_SECRET_KEY")
    if secretAccessKey == "" {
        log.Fatal("KATAPULT_SECRET_KEY environment variable is not set")
    }

    // Initialize S3 client with SSL enabled
    s3Client, err := minio.New(endpoint, &minio.Options{
        Creds:  credentials.NewStaticV4(accessKeyID, secretAccessKey, ""),
        Secure: true,
    })
    if err != nil {
        log.Fatalf("Failed to initialize S3 client: %v", err)
    }

    // Note: Buckets must be created through Katapult's web interface
    bucketName := "test-bucket" // Replace with your bucket name

    // Check if bucket exists
    exists, err := s3Client.BucketExists(context.Background(), bucketName)
    if err != nil {
        log.Fatalln(err)
    }
    if !exists {
        log.Fatalf("Bucket %s does not exist. Please create it through Katapult's web interface first.\n", bucketName)
    }

    // Upload a file using standard S3 API
    objectName := "example.txt"
    filePath := "./example.txt"
    contentType := "text/plain"

    // Create a sample file
    err = os.WriteFile(filePath, []byte("Hello from S3-compatible storage!"), 0644)
    if err != nil {
        log.Fatalln(err)
    }

    // Upload using standard S3 PutObject API
    _, err = s3Client.FPutObject(context.Background(), bucketName, objectName, filePath, minio.PutObjectOptions{ContentType: contentType})
    if err != nil {
        log.Fatalln(err)
    }
    fmt.Printf("Successfully uploaded %s to S3 bucket %s\n", objectName, bucketName)

    // List objects using standard S3 API
    objectsCh := s3Client.ListObjects(context.Background(), bucketName, minio.ListObjectsOptions{})
    for object := range objectsCh {
        if object.Err != nil {
            log.Fatalln(object.Err)
        }
        fmt.Printf("S3 Object: %s, Size: %d\n", object.Key, object.Size)
    }
}
```

 <!-- markdownlint-enable MD013 -->

This code demonstrates a complete S3-compatible application that:

1. Loads credentials from environment variables
2. Creates an S3 client using the Katapult server endpoint
3. Verifies the Katapult bucket exists
4. Creates and uploads a sample file
5. Lists all objects in the Katapult bucket

### 4. Set Up Environment Variables

Create a `.env` file in your project directory:

```bash
# Get these values from your Katapult Object Storage settings
KATAPULT_ENDPOINT=your_server_url  # Your region-specific endpoint
KATAPULT_ACCESS_KEY_ID=your_access_key_id
KATAPULT_SECRET_KEY=your_secret_key
```

### 5. Run the Application

```bash
go run main.go
```

![Terminal Output](../static/img/object-storage-tutorial/terminal-output.gif)

## Verifying the Upload

After running the application, you can verify the upload in the Katapult web console:

1. Navigate to your bucket in the Object Storage dashboard
2. You should see the uploaded file listed

![Verify Upload](../static/img/object-storage-tutorial/verify-upload.gif)

## Why Choose Katapult Object Storage?

You've now seen how easy it is to use Katapult Object Storage with standard S3
tools. Katapult provides a reliable, high-performance storage solution that
 works seamlessly with your existing S3-compatible applications. Whether you're
 building new applications or migrating existing ones, Katapult's S3 compatibility
 ensures you can use the tools and libraries you're already familiar with.

## Resources

- [Katapult Object Storage Documentation](https://docs.katapult.io/docs/product/storage/object-storage/quickstart)
- [Katapult S3 Compatibility Details](https://docs.katapult.io/docs/product/storage/object-storage/details/s3-compatibility)
- [minio-go Documentation](https://docs.min.io/docs/golang-client-api-reference)
