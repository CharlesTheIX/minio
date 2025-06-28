import app from "./app";
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") dotenv.config({ path: "./.env" });

(async () => {
      const port = Number(process.env.PORT) || 4022;
      app.listen(port, () => {
        console.log(`API is running on port ${port}.`);
      });
})();
