const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "glx82rnr",
  dataset: "production",
  token: "skcnHJMHxWzn6lAnGBaHZxhdxbhwzqzhT8uaxOQcbs0W45DKEmq5YIqfyyVhcSdm1EIV1Oa0kuhIEKV2gH3tSinRzoUihREMrCFIFpjHbR0x9mHUalkO6l6LjveKygZ0BNlHXWvFpjonVB4jQ83AhzZVQ2dIK0T2bAzIqButMWpWNQCRJu9o",
  useCdn: true,
  apiVersion: "2023-11-19",
});

module.exports = client;
