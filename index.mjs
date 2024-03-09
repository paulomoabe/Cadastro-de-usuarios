import express from 'express'
import {create} from 'express-handlebars'
import conn from './db/conn.mjs'

import User from './models/User.mjs'
import Address from './models/Address.mjs'


const app = express()
const hbs = create()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.static('public'))

app.get('/users/create', (req,res) => {
    res.render('adduser')
})

app.post('/users/create', async (req,res) => {
    
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req. body.newsletter

    if (newsletter === 'on') {
        newsletter = true
    }else{
        newsletter = false
    }

    console.log(req.body);

    await User.create({name, occupation, newsletter})

    res.redirect('/')
})
app.get('/users/:id', async (req, res) => {
    const id =  req.params.id

    const user = await User.findOne({raw: true, where: { id: id }})

    res.render('userview', { user })
})
app.post("/users/delete/:id", async (req, res)=>{

    const id = req.params.id

   await User.destroy({ where: {id: id}})

   res.redirect('/')
})
app.get("/users/edit/:id", async (req, res)=>{

    const id = req.params.id
    try {
        
   const user = await User.findOne({ include: Address, where: {id: id}})

   res.render('useredit', { user: user.get({plain:true}) })
    } catch (error) {
        console.log(error)
    }
})
app.post('/users/update'  ,async (req,res)=> {
    const id = req.body.id
    const name= req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if (newsletter ==='on') {
        newsletter = true
    }else{
        newsletter = false
    }

    const userData ={
        id,
        name,
        occupation,
        newsletter,

    }

    await User.update(userData, {where:{id : id}} )

    res.redirect('/')

})
app.post('/address/create', async(req, res) => {
    const userId = req.body.userId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city
   
    const address = {
        userId, 
        street,
        number,
        city,
    } 
     await Address.create(address)
    res.redirect(`/users/edit/${userId}`)
})
app.post('/address/delete', async (req,res)=> {
    const userId = req.body.userId
    const id = req.body.id

    await Address.destroy({where: { id:id}})
  
    res.redirect(`/users/edit/${userId}`)
})
app.get('/', async (req, res) => {

    const users =  await User.findAll({raw: true})

    console.log(users);

    res.render('home', {users: users} )
})



conn
.sync()
//.sync({force: true})
.then(() => {
    app.listen(4000, () => {
        console.log('Servidor ouvindo na porta 4000');
    });
}).catch(err => console.log(err));