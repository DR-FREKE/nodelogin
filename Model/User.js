//model configuration
module.exports.mUser = (mongoose) => {
  var userSchema = new mongoose.Schema({
    local: {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    // facebook: {
    //   id: String,
    //   token: String,
    //   name: String,
    //   email: String,
    // },
  });
  //generating a hash password
  // userSchema.methods.generateHash = (password) => {
  //   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  // };
  mUserSchema = mongoose.model("mUserSchema", userSchema);
  return mUserSchema;
};
