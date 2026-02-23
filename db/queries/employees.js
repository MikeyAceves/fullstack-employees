import db from "#db/client";
/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  try {
    const {
      rows: [employee],
    } = await db.query(
      `
      INSERT INTO employees (name, birthday, salary)
      VALUES ($1, $2, $3)
      RETURNING *;`,
      [name, birthday, salary],
    );
    return employee;
  } catch (error) {
    console.log(`ERROR CREATING EMPLOYEE`, error);
  }
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  try {
    const sql = `
  SELECT *
  FROM employees
  `;
    const { rows: employees } = await db.query(sql);
    return employees;
  } catch (error) {
    console.log(`Error fetching employees`, error);
  }
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  try {
    const sql = `
  SELECT *
  FROM employees
  WHERE id = $1
  `;
    const {
      rows: [employee],
    } = await db.query(sql, [id]);
    return employee;
  } catch (error) {
    console.error(error);
  }
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  try {
    const sql = `
  UPDATE employees
  SET
    name = $2,
    birthday = $3,
    salary = $4
  WHERE id = $1
  RETURNING *
  `;
    const {
      rows: [employee],
    } = await db.query(sql, [id, name, birthday, salary]);
    return employee;
  } catch (error) {
    console.error(error);
  }
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  try {
    const sql = `
  DELETE FROM employees
  WHERE id = $1
  RETURNING *
  `;
    const {
      rows: [employee],
    } = await db.query(sql, [id]);
    return employee;
  } catch (error) {
    console.error(error);
  }
}
