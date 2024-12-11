import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

import * as schema from "./schema";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql, { schema });

// Función de prueba de conexión
async function testConnection() {
  try {
    // Intenta ejecutar una consulta simple
    await sql`SELECT 1`;
    console.log("✅ Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
  }
}

// Ejecuta la prueba de conexión
void testConnection();
