import "dotenv/config";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

export async function writeMessage() {
  const client = new SQSClient({
    credentials: {
      accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
      secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
    },
  });

  const command = new SendMessageCommand({
    QueueUrl: String(process.env.SQS_URL),
    DelaySeconds: 0,
    MessageAttributes: {
      Title: {
        DataType: "String",
        StringValue: "First Message",
      },
      Created_At: {
        DataType: "String",
        StringValue: new Date().toISOString(),
      },
    },
    MessageBody: "Hello SQS!",
  });

  const response = await client.send(command);
  console.log(response);
  return response;
}

writeMessage();
