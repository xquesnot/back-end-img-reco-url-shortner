import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Key: {
            userID: event.requestContext.identity.cognitoIdentityId,
            imageID: event.pathParameters.id
        },
        UpdateExpression: "SET title = :title, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment": data.attachment || null,
            ":title": data.content || null
        },
        ReturnValues: "ALL_NEW"
    };

    await dynamoDb.update(params);

    return { status: true };
});