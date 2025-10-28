const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://findly-user:KingKhan%4012@cluster0.hbje...mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB successfully!");
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await client.close();
  }
}

run();
