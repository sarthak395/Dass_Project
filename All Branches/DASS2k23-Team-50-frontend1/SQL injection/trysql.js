const { pool } = require("./db");

async function try_() {
const res = await pool.query(
    "SELECT * FROM memory ORDER BY SIMILARITY(name,'AX4U301') DESC LIMIT 5"
  );
console.log(res.rows);
}

try_();