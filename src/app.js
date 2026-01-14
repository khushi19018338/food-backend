const allowedOrigins = [
  "https://food-frontend-vercel.vercel.app",
  "https://food-frontend-vercel-670gxwd7o-khushis-projects-0100d339.vercel.app",
  "http://localhost:5173" // optional for local dev
];

app.use(cors({
  origin: function (origin, callback) {
    // allow server-to-server or Postman requests
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
