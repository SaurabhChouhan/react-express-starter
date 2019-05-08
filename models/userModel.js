import mongoose, {Schema} from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

var userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    roles: [String],
    isDeleted: {type: Boolean, default: false}
});

userSchema.plugin(passportLocalMongoose, {usernameField:"email"});

const UserModel = mongoose.model("User", userSchema)
export default UserModel