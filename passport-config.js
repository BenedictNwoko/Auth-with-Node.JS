// const { authenticate } = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initialize (passport, getUserByEmail,getUserByid) {

 const  authenticateUser = async (email, password, done,)  => {
    const user =  getUserByEmail(email)
    if  (user == null){
        return done(null,false,{message: 'email or password not correct'})
    }

    try  {
        if  (await bcrypt.compare(password, user.password)) {
            return done(null, user)
        }else {
            return done(null, false, {message: 'email or password not correct'})
        }
    } catch (e) {
        return done(e)
    }
    }
  passport.use(new LocalStrategy({usernameField: 'email' },
   authenticateUser))
   passport.serializeUser((user , done ) => done(null, user.id))
   passport.deserializeUser((id, done) => { 
    return done(null, getUserByid(id))
   })
}


module.exports = initialize