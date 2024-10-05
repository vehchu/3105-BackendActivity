export default function loggingMiddleware(req, res, next) {
  const currentTime = new Date().toISOString();
  const httpMethod = req.method;
  const path = req.originalUrl;

  console.log(`[${currentTime}] ${httpMethod} ${path}`);

  next();
}