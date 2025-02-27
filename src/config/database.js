const db = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',  
    password: 'LELOUCHVI',
    database: 'teste.dominando.node',
    define: {
        timestamp: true, // cria duas colunas - para historico de horario de entrada de dados
        underscored: true, // passa tudo para o formato não camelcase
        underscoredAll: true,
    }
}

export default db;