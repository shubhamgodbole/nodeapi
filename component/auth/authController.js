let con=require('../../config/config');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const encryptedString = cryptr.encrypt('fgmail');
const decryptedString = cryptr.decrypt('7b1aad0a9cdecc1867f9d14477');
// Login User
exports.login=(req,res)=>{
    console.log('encript', encryptedString);
    console.log('decript',decryptedString);
    var email=req.body.email;
    var pwd=req.body.pwd;
    console.log('req.body',req.body);

    // fetch all user
    let qry="select * from user where email='"+ email +"'";
    con.query(qry,(error,result)=>{
        if(error) {
            res.status(404).json({status:"not found",message:'invalid email or password'});
            throw error;
        }
        else {
            console.log(result);
            result.forEach((user) => {
                console.log(cryptr.decrypt(user.pwd) + '==' + pwd)
                if(user.verify === 'yes' ) {

                    if(cryptr.decrypt(user.pwd) === pwd ) {
                        res.status(200).json({status:"ok",response:result});
                    }
                    else {
                        res.status(404).json({status:"not found",message:'invalid email & password'});
                    }
                }
                else {
                    res.status(404).json({status:"not found",message:'email is not verified'});
                }

            });
        }

    });


    /*var qry="select * from user where user.email='"+  email +"' and pwd='"+ pwd +"'";
    // var qry="insert into emp(fname,lname,img) values('"+ fname +"','"+ lname +"','"+ img +"') ";
    console.log(qry);
    con.query(qry,(error,result)=>{
        if(error) throw error;
        if(result.length > 0) {
            console.log('result', result);
            /!*var utid = result['RowDataPacket'].utid;
            console.log('utid', utid)
            var qry="select type from user_type where utid='"+ utid +"'";
            con.query(qry,(error,result) => {
                if(error) throw error;

            });*!/
            res.status(200).json({status:"ok",response:result});
        }
        else {
            res.status(404).json({status:"not found",message:'invalid email or password'});
        }
    });*/
};