const handleRegister = (req, res, db, bcrypt) => {
    const {email, name, password} = req.body;
    if(!email || !name || !password){
       return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
  //regestring the user to our database and linking it with our login table with transaction
  //we use transaction when we have to do more than 2 things at once
   db.transaction(trx => {
       trx.insert({
           hash: hash,
           email: email
       })
       .into('login')
       .returning('email')
       .then(loginEmail => {
            return trx('users')
              .returning('*')
              .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(user => {
              res.json(user[0]);
          })
       })
       .then(trx.commit)
       .catch(trx.rollback)
   })  

    .catch(err => res.status(400).json('unable to register :('))
}

module.exports = {
    handleRegister
}