let con=require('../../config/config');
// var path=require("path");

exports.addTask=(req,res)=>{

    var title=req.body.title;
    var desc=req.body.desc;
    var uid=req.body.uid;
    var pid=req.body.pid;
    var file=req.body.fup;
    var fname=req.body.fname
   // var uploadfile=path.join( file.name);
    /*console.log('req.body',req.body);
    console.log('filename',file);*/
   // console.log('upload',file.name);
    /*file.mv('img/'+file.name,(err)=>{
        if(err){
            console.log(err);
        }
        else
        {
            console.log("success");
        }
    });*/
    var qry="insert into task( `title`, `description`,`attechment`, `uid`, `pid`,`fname`) values('"+ title +"','"+ desc +"','"+ file +"','"+ uid +"',"+ pid +",'"+ fname +"')";
    console.log(qry);
    con.query(qry,(error,result)=>{
        if(error) throw error;
        console.log('insert....');
        res.status(200).json({status:"ok",message:"Created New Task Sucessfuly"});
    });

};


// show all Tasks
exports.showTask=(req,res)=>{
    let qry="select * from task";
    // let qry="select * from task where uid = 2";
    con.query(qry,(error,result)=>{
        if(error) throw error;
        res.send(result);
    });
};

// Find task by id for edit
exports.findTask=(req,res)=>{
    console.log('req.body',req.params);
    let id=req.params.id;
    let qry="select * from task where tid="+id;
    console.log(qry);
    con.query(qry,(error,result)=>{
        if(error) throw error;
        res.send(result);
    });
};

// Update Task
exports.updateTask=(req,res)=>{
    let uid=req.body.uid;
    let tid=req.body.tid;
    var title=req.body.title;
    var desc=req.body.desc;
    var file=req.body.fup;
    var fname=req.body.fname
    console.log('req.body',req.body);
    let qry="update task set title='"+ title +"',description='"+ desc +"',uid='"+ uid +"', attechment='"+ file +"',fname ='"+ fname +"' where tid='"+ tid +"'";
    console.log(qry);


    con.query(qry,(error,result)=>{
        if(error) throw error;
        console.log('update....');
        res.status(200).json({status:"ok",message:"Task is updated Sucessfuly"});
    });

};

// find Tasks for user
exports.showTaskUser=(req,res)=>{
    console.log('req.body',req.params);
    let uid=req.params.uid;
    let pid=req.params.pid;
    let qry="select task.tid,task.title,task.description,task.attechment,task.uid from task,user,project where user.uid ="+ uid +" and project.pid ="+ pid +"";
    console.log(qry);
    // let qry="select * from task where uid = 2";
    con.query(qry,(error,result)=>{
        if(error) throw error;
        res.send(result);
    });
};