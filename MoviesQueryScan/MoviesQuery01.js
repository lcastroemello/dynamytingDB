// The program included in this step retrieves all movies released in the year 1985.

var AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-central-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 1985.");

var params = {
    TableName : "Movies",
    KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy": 1985
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
});

// Note
// ExpressionAttributeNames provides name substitution. You use this because year is a reserved word in Amazon DynamoDB. You can't use it directly in any expression, including KeyConditionExpression. You use the expression attribute name #yr to address this.
//
// ExpressionAttributeValues provides value substitution. You use this because you cannot use literals in any expression, including KeyConditionExpression. You use the expression attribute value :yyyy to address this.