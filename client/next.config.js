module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/:slug*`,
        // destination: 'http://localhost:3000/:slug*',
      },
    ];
  },
};
