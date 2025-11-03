// ✅ Create user on first login
export const createUser = async (req, res) => {
  try {
    const { uid, name, email } = req.body;

    if (!uid || !email) {
      return res.status(400).json({ message: "UID & Email are required" });
    }

    // Check user exists
    const [existingUser] = await global.db.query(
      "SELECT * FROM users WHERE firebase_uid = ?", 
      [uid]
    );

    if (existingUser.length > 0) {
      return res.status(200).json({ message: "User already exists" });
    }

    // Insert user
    await global.db.query(
      "INSERT INTO users (firebase_uid, name, email) VALUES (?, ?, ?)",
      [uid, name, email]
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get user details for dashboard
export const getUserProfile = async (req, res) => {
  try {
    // Read UID sent from frontend header
    const uid = req.header("x-user-uid");

    if (!uid) {
      return res.status(400).json({ error: "User UID missing in request header" });
    }

    // Fetch user by firebase_uid
    const [rows] = await global.db.execute(
      "SELECT id, firebase_uid, name, email, company_name, role, created_at FROM users WHERE firebase_uid = ?",
      [uid]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return user object
    res.json(rows[0]);
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};
