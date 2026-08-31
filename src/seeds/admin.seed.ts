import { connectDatabase, env } from "../config/index";
import { Admin } from "../models/admin.model";

const parseArgs = () => {
  const args = process.argv.slice(2);
  const options = {
    force: false,
    email: env.ADMIN_EMAIL,
    password: env.ADMIN_PASSWORD,
  };

  args.forEach((arg, index) => {
    if (arg === "--force") {
      options.force = true;
    } else if (arg === "--email" && args[index + 1]) {
      options.email = args[index + 1];
    } else if (arg === "--password" && args[index + 1]) {
      options.password = args[index + 1];
    }
  });

  return options;
};

const seedAdmin = async () => {
  try {
    console.log("🌱 Starting admin seeder...\n");

    const options = parseArgs();

    await connectDatabase();

    const existingAdmin = await Admin.findOne({ email: options.email });

    if (existingAdmin && !options.force) {
      console.log("✅ Admin user already exists");
      console.log(`   Email: ${existingAdmin.email}`);
      console.log("\n💡 Use --force flag to recreate admin\n");
      process.exit(0);
    }

    if (existingAdmin && options.force) {
      await Admin.deleteOne({ email: options.email });
      console.log("🗑️  Existing admin deleted\n");
    }

    const admin = new Admin({
      email: options.email,
      password: options.password,
    });

    await admin.save();

    console.log("✅ Admin user created successfully!\n");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 Email:    ", options.email);
    console.log("🔑 Password: ", "********");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("\n⚠️  IMPORTANT: Change password after first login!\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
