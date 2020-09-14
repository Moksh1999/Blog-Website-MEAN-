const mongoose = require('mongoose')


const adminSchema = mongoose.Schema({
    id : {
        type : mongoose.Schema.Types.ObjectId
    },
    name : { type :String , required : true},
    email : { type : String , required :true},
    tokens : { type: Array , required : true},
    password : { type : String , required : true}

})

adminSchema.methods.toJSON = function(){
    const admin = this
    const adminObject =admin.toObject()

    delete adminObject.password
    delete adminObject.tokens
    return adminObject
}

module.exports = mongoose.model('Admin' , adminSchema);
