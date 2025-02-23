import { registerAs } from '@nestjs/config';

export default registerAs('db', () => {
  const host = process.env.DB_HOST;
  const database = process.env.DB_NAME;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;

  // Validaciones para evitar errores de conexión
  if (!host || !database || !user || !password) {
    throw new Error(
      '❌ Error: Faltan variables de entorno para la conexión a la base de datos.',
    );
  }

  return {
    host,
    database,
    user,
    password,
  };
});
