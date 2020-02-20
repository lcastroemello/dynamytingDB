// You can use the update method to modify an existing item. You can update values of existing attributes, add new attributes, or remove attributes.
//
//     In this example, you perform the following updates:
//
//     Change the value of the existing attributes (rating, plot).
//
//     Add a new list attribute (actors) to the existing info map.


var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";

// Update the item, unconditionally,

var params = {
    TableName:table,
    Key:{
        "year": year,
        "title": title
    },
    UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues:{
        ":r":5.5,
        ":p":"Everything happens all at once.",
        ":a":["Larry", "Moe", "Curly"]
    },
    ReturnValues:"UPDATED_NEW"
};

console.log("Updating the item...");
docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});

// Note
// This program uses UpdateExpression to describe all updates you want to perform on the specified item.
//
//     The ReturnValues parameter instructs DynamoDB to return only the updated attributes ("UPDATED_NEW").