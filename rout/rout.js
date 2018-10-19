let user=require('../component/user/userController');
let usertype=require('../component/user_type/userTypeController');
let project=require('../component/project/projectController');
let auth=require('../component/auth/authController');
let task=require('../component/task/taskController');
const bodyparser=require("body-parser");


exports.route=(app)=> {
    //////////////// userType ////////////////
    app.post('/api/userType',usertype.addUserType);
    app.get('/api/userType',usertype.showUserType);
    app.delete('/api/userType/:id',usertype.deleteUserType);
    app.get('/api/userType/:id',usertype.editUserType);
    app.put('/api/userType',usertype.updateUserType);

    //////////////// user ////////////////
    app.post('/api/user',user.addUser);
    app.get('/api/user',user.showUser);
    app.get('/api/employee',user.showEmployee);
    app.delete('/api/user/:id',user.deleteUser);
     app.get('/api/user/:id',user.editUser);
    app.put('/api/user',user.updateUser);
    app.get('/api/user/:id/:verify',user.verifyUser);

    //////////////// Project ////////////////
    app.post('/api/project',project.addProject);
    app.get('/api/project',project.showProject);
    app.get('/api/project/:id',project.findProjectUser);
    app.put('/api/project/',project.updateProject);
    app.delete('/api/project/:id',project.deleteProject);

    //////////////// auth ////////////////
    app.post('/api/auth',auth.login);

    //////////////// task ////////////////
    app.post('/api/task',task.addTask);
    app.get('/api/task',task.showTask);
    app.get('/api/task/:uid/:pid',task.showTaskUser);
    app.put('/api/task/',task.updateTask);
};