
// Image database!

ImageDb = new Mongo.Collection('images');

var Schemas = {};

Schemas.ImageDb = new SimpleSchema({
    name: {
        type: String,
        label: "Title",
        max: 200
    },
    date: {
        type: Date,
        label: "Last date this book was checked out",
        optional: true
    },
    url: {
        type: String,
        label: "Brief summary",
        optional: true,
        max: 10000
    },
    license:{
        type: String,
        label: "License Number",
        max: 200

    }
});

ImageDb.attachSchema(Schemas.ImageDb);