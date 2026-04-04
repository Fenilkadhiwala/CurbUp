import pool from "../database/db";

export const createUser = async (req: any, res: any) => {
  try {
    const { email, fullName, phoneNumber } = req.body;
    const { sub } = req.auth;

    const existing = await pool.query(
      `SELECT id FROM app_users WHERE auth0_id = $1`,
      [sub],
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }
    const result = await pool.query(
      `INSERT INTO app_users (auth0_id, email, full_name, phone_number)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [sub, email, fullName, phoneNumber],
    );

    return res
      .status(201)
      .json({ message: "User created", user: result.rows[0] });
  } catch (error) {
    console.error("createUser error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
