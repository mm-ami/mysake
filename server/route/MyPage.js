const router = require("express").Router();
const knex = require("../knex/knex");

router.post("/form", async function(req, res) {
  const id = req.body.id
  const date = req.body.t_date
  const name = req.body.title
  const score = req.body.score
  const body = req.body.body
  const release = req.body.public

  await knex("topics")
  .insert({user_id: id, t_date: date, title: name, score, body, public: release})
  .then(() => {
    return res.sendStatus(200)
  })
  .catch(() => {
    res.sendStatus(400)
  })
})

router.post("/mypagelist", async function(req, res) {
  const id = req.body.id
  await knex("topics")
  .select("topics.id", "user_id", "t_date", "title", "score", "body", "public")
  .where("del_flg", 0)
  .andWhere("topics.user_id", id)
  .orderBy("t_date", "DESC")
  .then((result) => {
    return res.json({result})
  })
  .catch(() => {
    res.sendStatus(400)
  })
})

router.post("/edit", async function(req, res) {
  const id = req.body.id
  const userid = req.body.user_id
  const date = req.body.t_date
  const title = req.body.title
  const score = req.body.score
  const body = req.body.body
  const release = req.body.public

  await knex("topics")
  .update({t_date: date, title, score, body, public: release})
  .where({id})
  .andWhere({user_id: userid})
  .then(() => {
    res.sendStatus(200)
  })
  .catch(() => {
    res.sendStatus(401)
  })
})

router.post("/delete", async function(req, res) {
  const id = req.body.id
  const userid = req.body.user_id
  await knex("topics")
  .update({del_flg: 1})
  .where({id})
  .andWhere({user_id: userid})
  .then(() => {
    res.sendStatus(200)
  })
  .catch(() => {
    res.sendStatus(401)
  })
})

module.exports = router;