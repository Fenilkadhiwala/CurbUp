import pool from "../database/db";
export const createUser = async (req: any, res: any) => {
  try {
    const { email, fullName, phoneNumber } = req.body;
    const { sub } = req.auth;

    const existing = await pool.query(
      `SELECT id, auth0_id, email FROM app_users 
       WHERE auth0_id = $1 OR email = $2`,
      [sub, email],
    );

    if (existing.rows.length > 0) {
      const existingUser = existing.rows[0];

      if (existingUser.auth0_id === sub) {
        return res.status(409).json({ message: "User already exists" });
      }

      if (existingUser.email === email) {
        return res.status(409).json({
          message:
            "An account with this email already exists. Please sign in with your original method.",
        });
      }
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
