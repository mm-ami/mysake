const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const knex = require("../knex/knex");

router.post("/login", async function(req, res) {
  const username = req.body.username
  const password = req.body.password

  await knex("users").select("*").where({name: username})
  .then(async (result) => {
    if(result.length === 0) return res.json({isAuth: false})

    const successPassword = await bcrypt.compare(password, result[0].password)

    if(!successPassword) return res.sendStatus(400)

    const payload = { id: result[0].id }
    const token = jwt.sign(payload, process.env.SECRET_TOKEN, {expiresIn: "1d"})

    return res.json({token})
  })
  .catch(() => {
    res.sendStatus(400)
  })
})

router.get("/user", async function(req, res) {

  const token = await req.headers.authorization.split(" ")[1]

  if(token == null) return res.sendStatus(401)

  await jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if(err) return res.sendStatus(403)
    return res.json({user})
  })
})

router.post("/register", async function(req, res) {
  const username = req.body.username
  const password = req.body.password

  await knex("users").select("*").where({name: username})
  .then(async (result) => {
    if(result.length !== 0) return res.json({message: '既に登録済みのユーザー名です。', isAuth: false})

    const hashedPassword = await bcrypt.hash(password, saltRounds)
    await knex("users").insert({name: username, password: hashedPassword})
    .then(() => {
      return res.status(200).json({isAuth: true})
    })
  })
  .catch(() => {
    res.sendStatus(400)
  })
})

module.exports = router;
