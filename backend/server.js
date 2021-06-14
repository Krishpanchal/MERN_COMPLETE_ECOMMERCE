const dotenv = require("dotenv");
dotenv.config({ path: "./config/conig.env" });
const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
