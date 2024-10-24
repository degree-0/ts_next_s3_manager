import { S3Client, S3, S3ClientConfig, ListBucketsCommandOutput } from "@aws-sdk/client-s3";

const s3ClientConfig: S3ClientConfig = {
    region: "us-west-2",
    endpoint: {
        url: new URL(process.env.S3_ENDPOINT_URL || "http://localhost:4566"),
    },
};

const client = new S3(s3ClientConfig) || new S3Client(s3ClientConfig);


const listBuckets = async (accessKeyId: string, secretAccessKey: string): Promise<ListBucketsCommandOutput> => {
    // set  credentials on the client
    s3ClientConfig.credentials = {
        accessKeyId,
        secretAccessKey,
    };
    
    const client = new S3(s3ClientConfig) || new S3Client(s3ClientConfig);

    const data = await client.listBuckets({});
    return data;
}

const getBucketTagging = async (accessKeyId: string, secretAccessKey: string, bucketName: string) => {
    // set  credentials on the client
    s3ClientConfig.credentials = {
        accessKeyId,
        secretAccessKey,
    };
    
    const client = new S3(s3ClientConfig) || new S3Client(s3ClientConfig);

    const data = await client.getBucketAcl({
        Bucket: bucketName
    });
    return data;
}





export { listBuckets, getBucketTagging };