import { pool } from "../config/db.js"


export const launchController = {
    async getLaunchs(req, res) {
        const { active } = req.query

        try {
            let sql = "SELECT * FROM launchs WHERE 1=1"

            if (active == 'false') {
                sql += ` AND status in (true, false)`
            }

            if (active === 'true') {
                sql += " AND status = true"
            }

            sql += ` ORDER BY date ASC`

            const result = await pool.query(sql)

            const dadosFormat = result.rows.map((item) => ({
                id: item.id,
                description: item.description,
                value: item.value,
                date: new Date(item.date).toISOString().split("T")[0],
                status: item.status,
                created_at: item.created_at
            }))

            res.json(dadosFormat)
            console.log(dadosFormat)
        } catch (error) {
            console.log(error)
        }
    },
    async create(req, res) {
        const { description, value, date, type } = req.body

        try {
            let sql = "INSERT INTO launchs (description, value, date, type) VALUES ($1, $2, $3, $4)"

            const values = [description, value, date, type]

            await pool.query(sql, values)

            console.log("Salvo com sucesso")
            res.json({ message: "Salvo com sucesso" })
        } catch (error) {
            res.json(error.message)
        }
    },
    async getChart(req, res) {
        try {
            const sql = `
                SELECT 
                    SUM(CASE WHEN type='ENTRADA' THEN value ELSE 0 END) as entradas,
                    SUM(CASE WHEN type='SAIDA' THEN value ELSE 0 END) as saidas
                FROM launchs
            `;

            const result = await pool.query(sql)

            const dados = result.rows[0];

            const dadosFormat = [
                {
                    name: "Entradas",
                    value: Number(dados.entradas)
                }, {
                    name: "Saidas",
                    value: Number(dados.saidas)
                }
            ]
            res.json(dadosFormat)
        } catch (error) {
            console.log(error)
            res.json(error.message)
        }
    }
}