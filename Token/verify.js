import jwt from "jsonwebtoken"

const verify = () =>{
    let signToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmTmFtZSI6ImhhbnphbGEiLCJhZ2UiOjIxLCJpYXQiOjE2OTg0ODU4MTgsImV4cCI6MTY5ODQ4NTg3OH0.9ZvaW4pzus9KaamJ1zyfwvasQ4QJgnvcHUaj2KQZwLU"
    let privKey="ALI"

    let verifyToken=jwt.verify(signToken,privKey);
    console.log(verifyToken);
    
}
verify();