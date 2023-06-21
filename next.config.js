/** @type {import('next').NextConfig} */
const nextConfig = {
    api: {
        bodyParser: false,
      },
}

module.exports = {
    images: {
        domains: ['cloud.appwrite.io'],
    },
    reactStrictMode: false,

}
