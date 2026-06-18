const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require(
  "../models/user.model"
);

/* REGISTER */

const registerUser = async (
  req,
  res
) => {
  try {

    const {
      fullName,
      email,
      password,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success:false,
        message:"All fields required"
      });
    }

    const existingUser =
      await User.findOne({
        email
      });

    if (existingUser) {
      return res.status(400).json({
        success:false,
        message:"Email already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const newUser =
      await User.create({
        fullName,
        email,
        password:
          hashedPassword,
      });

    res.status(201).json({
      success:true,
      message:
      "User registered successfully",

      user:{
        id:newUser._id,
        fullName:
          newUser.fullName,
        email:
          newUser.email,
        role:
          newUser.role
      }
    });

  } catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:"Server Error"
    });

  }
};


/* LOGIN */

const loginUser = async (
  req,
  res
) => {

try {

const {
email,
password
}=req.body;

if(
!email ||
!password
){
return res.status(400).json({
success:false,
message:"All fields required"
});
}

const user =
await User.findOne({
email
});

if(!user){

return res.status(404).json({
success:false,
message:"User not found"
});

}

const match =
await bcrypt.compare(
password,
user.password
);

if(!match){

return res.status(401).json({
success:false,
message:
"Invalid credentials"
});

}

const token =
jwt.sign(
{
id:user._id,
role:user.role
},
process.env.JWT_SECRET,
{
expiresIn:"7d"
}
);

res.status(200).json({

success:true,
message:
"Login successful",

token,

user:{
id:user._id,
fullName:
user.fullName,
email:
user.email,
role:
user.role
}

});

}
catch(error){

console.log(error);

res.status(500).json({
success:false,
message:"Server Error"
});

}

};

module.exports={
registerUser,
loginUser
};