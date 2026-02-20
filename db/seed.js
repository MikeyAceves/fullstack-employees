import { faker } from "@faker-js/faker";
import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let seededEmployees = 0; seededEmployees <= 10; seededEmployees++) {
    const employee = {
      name: faker.person.fullName(),
      birthday: faker.date.birthdate(),
      salary: faker.number.int({ min: 40000, max: 200000 }),
    };
    await createEmployee(employee);
  }
}
