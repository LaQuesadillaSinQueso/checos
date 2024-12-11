import dotenv from 'dotenv';
dotenv.config();

import { drizzle } from "drizzle-orm/vercel-postgres";
import { createClient } from "@vercel/postgres";
import * as schema from "./schema";

// Option 2: Use a pooled connection string
const pool = createClient({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require"
});

// Use this object to send drizzle queries to your DB
export const db = drizzle(pool, { schema });

// Función de prueba de conexión
async function testConnection() {
  try {
    await pool.connect(); // Primero nos conectamos explícitamente
    const result = await pool.query('SELECT 1');
    console.log("✅ Conexión a la base de datos exitosa");
    await pool.end(); // Cerramos la conexión limpiamente
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
    process.exit(1); // Salimos con código de error
  }
}

// Ejecutamos la prueba de conexión y esperamos el resultado
testConnection().catch((error) => {
  console.error("Error inesperado:", error);
  process.exit(1);
});
