let con=require('../../config/config');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const encryptedString = cryptr.encrypt('bacon');
const decryptedString = cryptr.decrypt(encryptedString);
var nodemailer = require('nodemailer');

// Add User
exports.addUser=(req,res)=>{
    var email=req.body.email;
    var pwd=req.body.password;
    var utid=req.body.user_type;
    console.log('req.body',req.body);
    var qry="insert into user( `email`, `pwd`, `utid`) values('"+ email +"','"+ cryptr.encrypt(pwd) +"',"+ utid +")";
   // var qry="insert into emp(fname,lname,img) values('"+ fname +"','"+ lname +"','"+ img +"') ";
    console.log(qry);
    con.query(qry,(error,result)=>{
        if(error) throw error;
        console.log('insert....');
        var qry1 = "SELECT uid,utid FROM `user` order by uid desc limit 1";
        con.query(qry1,(error,result) => {
            if(error) throw error;
            res.status(200).json({status:"ok",message:"Registered Sucessfully", response:result});
        });
    });

    // send email for verification
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465,587 false for other ports
            auth: {
                user: 'shubhamgodbole30129@gmail.com', // generated ethereal user
                pass: 'Shubham@361993' // generated ethereal password
            }
        });

        var mailOptions = {
            from: 'shubhamgodbole30129@gmail.com',
            to: email,
            subject: 'Sending Email using Node.js',
            html: '<h1>Welcome</h1><p>That was easy!</p><br><p><a href=http://localhost:4200/verifyEmailSuccess>Click here</a></p>'
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });
    });
};

// show all users
exports.showUser=(req,res)=>{
    let qry="select * from user";
    // Only needed if you don't have a real mail account for testing

    con.query(qry,(error,result)=>{
        if(error) throw error;
        res.send(result);
    });
};

// delete user
exports.deleteUser=(req,res)=>{
    console.log('req.body',req.body);
    let id=req.body.uid;
    let qry="delete from user where uid="+id;
    console.log(qry);
    con.query(qry,(error,result)=>{
        if(error) throw  error;
        res.send(result);
        console.log('delete');
    });
};

// Find user by id for edit
exports.editUser=(req,res)=>{
    console.log('req.body',req.params);
    let id=req.params.id;
    let qry="select * from user where uid="+id;
    console.log(qry);
    con.query(qry,(error,result)=>{
        if(error) throw error;
        res.send(result);
    });
};

// Update User
exports.updateUser=(req,res)=>{
    let id=req.body.uid;
    var email=req.body.email;
    var pwd=req.body.pwd;
    var utid=req.body.utid;
    console.log('req.body',req.body);
    let qry="update user set email='"+ email +"',pwd='"+ pwd +"',utid ='"+ utid +"' where uid='"+ id +"'";
    console.log(qry);


    con.query(qry,(error,result)=>{
        if(error) throw error;
        console.log('update....');
        res.send(result);
    });

};

// Show All Employee
exports.showEmployee=(req,res)=>{
    let qry="select uid,email from  user where utid in ( select utid from user_type where type !=  'admin')";
    console.log(qry);


    con.query(qry,(error,result)=>{
        if(error) throw error;
        res.send(result);
    });

};

// verify User
exports.verifyUser=(req,res)=>{
    let id=req.params.id;
    let verify=req.params.verify;
    console.log('req.body',req.params);
    let qry="update user set verify='"+ verify +"' where uid='"+ id +"'";
    console.log(qry);


    con.query(qry,(error,result)=>{
        if(error) throw error;
        console.log('update....');
        res.send(result);
    });

};

// check verify User
exports.checkVerifyUser=(req,res)=>{
    let id=req.params.id;
    let verify=req.params.verify;
    console.log('req.body',req.params);
    let qry="update user set verify='"+ verify +"' where uid='"+ id +"'";
    console.log(qry);


    con.query(qry,(error,result)=>{
        if(error) throw error;
        console.log('update....');
        res.send(result);
    });

};