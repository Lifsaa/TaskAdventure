import jwt from "jsonwebtoken";

export function authenticateUser(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(
    token,
    process.env.TOKEN_SECRET || "your-secret-key",
    (error, decoded) => {
      if (error) return res.status(401).json({ error: "Invalid token" });
      req.userId = decoded.userId;
      next();
    },
  );
}
