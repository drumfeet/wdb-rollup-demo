module.exports = {
    posts: {
      type: "object",
      required: ["id", "body", "owner", "date"],
      properties: {
        id: { type: "string" },
        description: { type: "string" },
        owner: { type: "string" },
        date: { type: "number" },
      },
    },
  }