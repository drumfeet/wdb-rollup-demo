module.exports = {
  posts: [
    [
      "add:post", // define a custom query
      [
        ["fields()", ["*body"]], // only allow "body" field, * makes it mandatory
        [
          "mod()", // auto assign some fields
          {
            id: "$id", // tx id
            owner: "$signer", // tx signer
            date: "$ms", // tx date in millisecond
          },
        ],
        ["allow()"], // allow the query
      ],
    ],
    [
      "set:post", // define a custom query
      [
        ["fields()", ["*body"]], // only allow "body" field, * makes it mandatory
        [
          "mod()", // auto assign some fields
          {
            id: "$id", // tx id
            owner: "$signer", // tx signer
            date: "$ms", // tx date in millisecond
          },
        ],
        ["allow()"], // allow the query
      ],
    ],
    [
      "update:post", // define a custom query
      [
        ["fields()", ["*body"]], // only allow "body" field, * makes it mandatory
        [
          "mod()", // auto assign some fields
          {
            id: "$id", // tx id
            owner: "$signer", // tx signer
            date: "$ms", // tx date in millisecond
          },
        ],
        ["allow()"], // allow the query
      ],
    ],
    [
      "upsert:post", // define a custom query
      [
        ["fields()", ["*body"]], // only allow "body" field, * makes it mandatory
        [
          "mod()", // auto assign some fields
          {
            id: "$id", // tx id
            owner: "$signer", // tx signer
            date: "$ms", // tx date in millisecond
          },
        ],
        ["allow()"], // allow the query
      ],
    ],
    [
      "delete:post", // define a custom query for deletion
      [
        // "=$" will assign the result of the following FPJSON to a variable
        ["=$isOwner", ["equals", "$signer", "$old.owner"]], // check if signer is data owner
        ["allowifall()", ["$isOwner"]], // allow the query if $isOwner is true
      ],
    ],
  ],
}
