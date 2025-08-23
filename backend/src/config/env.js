import "dotenv/config"

export const ENV = {
    PORT: process.env.PORT || 5001,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    STREEM_API_KEY: process.env.STREEM_API_KEY,
    STREEM_API_SECRET: process.env.STREEM_API_SECRET,
    SENTRY_DNS: process.env.SENTRY_DNS,
    INNGEST_EVENT_API_KEY:process.env.INNGEST_EVENT_API_KEY,
    INNGEST_EVENT_API_SECRET: process.env.INNGEST_EVENT_API_SECRET 




};  