let con=require('../../config/config');

exports.addUserType=(req,res)=>{

    var utype=req.body.utype;
    console.log('req.body',req.body);
    var qry="insert into type(type) values('"+ utype +"')";
    // var qry="insert into emp(fname,lname,img) values('"+ fname +"','"+ lname +"','"+ img +"') ";
    console.log(qry);
    con.query(qry,(error,result)=>{
        if(error) throw error;
        console.log('insert....');
        res.send(result);
    });
};

// show all userTypes
exports.showUserType=(req,res)=>{
    let qry="select * from user_type";
    // let qry="select * from emp";
    con.query(qry,(error,result)=>{
        if(error) throw error;
        res.send(result);
    });
};

// delete user
exports.deleteUserType=(req,res)=>{
    let id=req.body.utid;
    console.log('req.body',req.body);
    let qry="delete from user_type where utid="+id;
    console.log(qry);
    con.query(qry,(error,result)=>{
        if(error) throw  error;
        res.send(result);
        console.log('delete');
    });
};

// Find userType by id for edit
exports.editUserType=(req,res)=>{
    console.log('req.body',req.params);
    let id=req.params.id;
    let qry="select * from user_type where utid="+id;
    console.log(qry);
    con.query(qry,(error,result)=>{
        if(error) throw error;
        res.send(result);
    });
};


// Update User
exports.updateUserType=(req,res)=>{
    var utype=req.body.type;
    var utid=req.body.utid;
    console.log('req.body',req.body);
    let qry="update user_type set type='"+ utype +"' where utid='"+ utid +"'";
    console.log(qry);


    con.query(qry,(error,result)=>{
        if(error) throw error;
        console.log('update....');
        res.send(result);
    });

};