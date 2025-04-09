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

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}


	endpoint := os.Getenv("KATAPULT_ENDPOINT")
	if endpoint == "" {
		log.Fatal("KATAPULT_ENDPOINT environment variable is not set")
	}

	// Remove port number from endpoint for minio client
	endpoint = strings.Split(endpoint, ":")[0]

	accessKeyID := os.Getenv("KATAPULT_ACCESS_KEY_ID")
	if accessKeyID == "" {
		log.Fatal("KATAPULT_ACCESS_KEY_ID environment variable is not set")
	}

	secretAccessKey := os.Getenv("KATAPULT_SECRET_KEY")
	if secretAccessKey == "" {
		log.Fatal("KATAPULT_SECRET_KEY environment variable is not set")
	}

	
	s3Client, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKeyID, secretAccessKey, ""),
		Secure: true,
	})
	if err != nil {
		log.Fatalf("Failed to initialize S3 client: %v", err)
	}


	bucketName := "test-bucket" // Replace with your bucket name


	exists, err := s3Client.BucketExists(context.Background(), bucketName)
	if err != nil {
		log.Fatalln(err)
	}
	if !exists {
		log.Fatalf("Bucket %s does not exist. Please create it through Katapult's web interface first.\n", bucketName)
	}


	objectName := "example.txt"
	filePath := "./example.txt"
	contentType := "text/plain"


	err = os.WriteFile(filePath, []byte("Hello from S3-compatible storage!"), 0644)
	if err != nil {
		log.Fatalln(err)
	}


	_, err = s3Client.FPutObject(context.Background(), bucketName, objectName, filePath, minio.PutObjectOptions{ContentType: contentType})
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Printf("Successfully uploaded %s to S3 bucket %s\n", objectName, bucketName)


	objectsCh := s3Client.ListObjects(context.Background(), bucketName, minio.ListObjectsOptions{})
	for object := range objectsCh {
		if object.Err != nil {
			log.Fatalln(object.Err)
		}
		fmt.Printf("S3 Object: %s, Size: %d\n", object.Key, object.Size)
	}
}
