import { initDatabaseSchema, syncJsonToMysql, checkDbConnection } from "./db";

async function main() {
  console.log("Checking MySQL connection...");
  const isOnline = await checkDbConnection();
  if (!isOnline) {
    console.warn("MySQL server is not accessible at host specified in .env.local.");
    console.warn("Verify that MySQL is running on port 3306.");
    process.exit(0);
  }

  console.log("MySQL connection successful. Initializing tables & seeding data...");
  await initDatabaseSchema();
  const result = await syncJsonToMysql();
  console.log(result.message);
  if (result.counts) {
    console.log("Seeded:", result.counts);
  }
}

main().catch(console.error);
