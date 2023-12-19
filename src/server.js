const app = require(".");
const { connectDb } = require("./config/db");


const PORT = process.env.PORT || 5454;
app.listen(PORT, async () => {
  await connectDb();
  console.log(`app running at port:${PORT}`);
});
