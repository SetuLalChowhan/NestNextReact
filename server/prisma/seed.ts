import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { auth } from '../src/auth/auth.js';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed for boilerplate...');

  // 1. Seed Super Admin
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
  const adminName = 'Super Admin';

  console.log(`Checking Super Admin account (${adminEmail})...`);
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    console.log('Creating Super Admin account via Better-Auth...');
    try {
      const authResult = await auth.api.signUpEmail({
        body: {
          email: adminEmail,
          password: adminPassword,
          name: adminName,
        },
        headers: new Headers({
          origin: process.env.BETTER_AUTH_URL || 'http://localhost:5000',
        }),
      });

      if (authResult?.user?.id) {
        await prisma.user.update({
          where: { id: authResult.user.id },
          data: {
            role: Role.ADMIN,
            emailVerified: true,
          },
        });
        console.log(`✅ Super Admin created with ID: ${authResult.user.id}`);
      }
    } catch (err: any) {
      console.error('Better-Auth signup encountered error:', err?.message || err);
    }
  } else {
    await prisma.user.update({
      where: { id: existingAdmin.id },
      data: {
        role: Role.ADMIN,
        emailVerified: true,
      },
    });
    console.log(`✅ Super Admin already exists (${adminEmail}), ensured role is ADMIN.`);
  }

  // 2. Seed Standard Demo User
  const demoEmail = 'user@example.com';
  const demoPassword = 'User@123456';
  const demoName = 'Demo User';

  console.log(`Checking Demo User account (${demoEmail})...`);
  const existingDemo = await prisma.user.findUnique({
    where: { email: demoEmail },
  });

  if (!existingDemo) {
    console.log('Creating Demo User account via Better-Auth...');
    try {
      const authResult = await auth.api.signUpEmail({
        body: {
          email: demoEmail,
          password: demoPassword,
          name: demoName,
        },
        headers: new Headers({
          origin: process.env.BETTER_AUTH_URL || 'http://localhost:5000',
        }),
      });

      if (authResult?.user?.id) {
        await prisma.user.update({
          where: { id: authResult.user.id },
          data: {
            role: Role.USER,
            emailVerified: true,
          },
        });
        console.log(`✅ Demo User created with ID: ${authResult.user.id}`);
      }
    } catch (err: any) {
      console.error('Better-Auth signup encountered error:', err?.message || err);
    }
  } else {
    console.log(`✅ Demo User already exists (${demoEmail}).`);
  }

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
