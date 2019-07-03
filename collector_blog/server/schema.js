const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true, // We don't want a post without a title
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        default: "all",
    },
    date: {
        type: String,
        required: true,
        default: new Date( ).toDateString( )
    },
    image: {
        type: String,
        required: false,
    },
    text: {
        type: String,
        required: false,
    }
});

var model = mongoose.model("posts", postSchema); // "posts" will be the name of the collection within the database
module.exports = model;

// var data = {
//     posts: [
//         {
//             title: "first post",
//             author: "mr. author",
//             category: "clothing",
//             date: new Date(),
//             image: "https://i.imgur.com/HuwV4CW.jpg",
//             text: "aa;lsdk flksa;djf l;ksadjf l;sakdj fl;aksdj fl;sadkjf a;lskdjf lsdakj flasd;jf dlksj."
//         },
//         {
//             title: "first post",
//             author: "mr. author",
//             category: "comic books",
//             date: new Date(),
//             image: "https://i.imgur.com/HuwV4CW.jpg",
//             text: "aa;lsdk flksa;djf l;ksadjf l;sakdj fl;aksdj fl;sadkjf a;lskdjf lsdakj flasd;jf dlksj."
//         },
//         {
//             title: "first post",
//             author: "mr. author",
//             category: "clothing",
//             date: new Date(),
//             image: "https://i.imgur.com/HuwV4CW.jpg",
//             text: "aa;lsdk flksa;djf l;ksadjf l;sakdj fl;aksdj fl;sadkjf a;lskdjf lsdakj flasd;jf dlksj."
//         },
//         {
//             title: "first post",
//             author: "mr. author",
//             category: "hunting",
//             date: new Date(),
//             image: "https://i.imgur.com/HuwV4CW.jpg",
//             text: "aa;lsdk flksa;djf l;ksadjf l;sakdj fl;aksdj fl;sadkjf a;lskdjf lsdakj flasd;jf dlksj."
//         },
//         {
//             title: "first post",
//             author: "mr. author",
//             category: "coins",
//             date: new Date(),
//             image: "https://i.imgur.com/HuwV4CW.jpg",
//             text: "aa;lsdk flksa;djf l;ksadjf l;sakdj fl;aksdj fl;sadkjf a;lskdjf lsdakj flasd;jf dlksj."
//         },
//         {
//             title: "first post",
//             author: "mr. author",
//             category: "clothing",
//             date: new Date(),
//             image: "https://i.imgur.com/HuwV4CW.jpg",
//             text: "aa;lsdk flksa;djf l;ksadjf l;sakdj fl;aksdj fl;sadkjf a;lskdjf lsdakj flasd;jf dlksj."
//         },
//         {
//             title: "first post",
//             author: "mr. author",
//             category: "clothing",
//             date: new Date(),
//             image: "https://i.imgur.com/HuwV4CW.jpg",
//             text: "aa;lsdk flksa;djf l;ksadjf l;sakdj fl;aksdj fl;sadkjf a;lskdjf lsdakj flasd;jf dlksj."
//         },
//     ]
// }

// module.exports = data;
