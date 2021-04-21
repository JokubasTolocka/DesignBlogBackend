# Backend server for my design blog

This is my backend server for uploading images to Amazon S3 and storing the url's in my database.

# How to use

First, create a .env file with these values.

```
PORT
CORS_ACCEPT_URL

AWS_SECRET_ACCESS_KEY
AWS_ACCESS_KEY
AWS_S3_REGION
AWS_S3_BUCKET
```

In Amazon AWS create a user in IAM, then create a bucket in S3, set the CORS and Bucket policies.

Install dependencies with
`npm i`

Finally, run with `npm start`

# Notes

Due to issues with uploading with apollo graphql upload, I have followed this advice to solve issues with fs-capacitor https://github.com/apollographql/apollo-server/issues/3508#issuecomment-732261211
