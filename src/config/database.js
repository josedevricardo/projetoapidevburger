module.exports = {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "planetburger",
  logging: console.log, // Ativa o log detalhado
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
