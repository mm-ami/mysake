const router = require("express").Router();
const knex = require("../knex/knex");

router.get("/homelist", async function(req, res) {
  await knex("topics")
  .select("topics.id", "name", "topics.id", "user_id", "t_date", "title", "score", "body")
  .where({del_flg: 0})
  .andWhere({public: 1})
  .innerJoin("users", "topics.user_id", "users.id")
  .orderBy("topics.id", "DESC")
  .then((result) => {
    res.json({result})
  })
  .catch(() => {
    res.sendStatus(401)
  })
})

router.post("/otheruser", async function(req, res) {
  const id = req.body.id
  await knex("topics")
  .select("topics.id", "name", "user_id", "t_date", "title", "score", "body")
  .where("del_flg", 0)
  .andWhere("topics.user_id", id)
  .andWhere("public", 1)
  .innerJoin("users", "topics.user_id", "users.id")
  .orderBy("t_date", "DESC")
  .then((result) => {
    res.json({result})
  })
  .catch(() => {
    res.sendStatus(401)
  })
})

module.exports = router;