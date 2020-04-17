const express = require('express')
const members= require('../../members')
const uuid= require('uuid')
const router = express.Router();
//Gets All Members
router.get('/',(req,res) => res.json(members));

//Get single member 
router.get('/:id',(req,res) =>{
    const found= members.some(member=>member.id===parseInt(req.params.id));
    if (found){
    res.json(members.filter(member=>member.id===parseInt(req.params.id)));
    }
    else{
        res.status(400).json({
            msg:`No member with the id of ${req.params.id}`
        });
    };
});

//Create Member
router.post('/',(req,res)=>{
const newMember = {
    id:uuid.v4(),
    employee_name: req.body.employee_name,
        employee_salary: req.body.employee_salary,
        employee_age: req.body.employee_age,
        profile_image: req.body.profile_image
} ;
if(!newMember.employee_name||!newMember.employee_salary){
   return res.status(400).json({msg:'enter a name'})
}
members.push(newMember);
//res.json(members);
res.redirect('/')
});

//Update member 
router.put('/:id',(req,res) =>{
    const found= members.some(member=>member.id===parseInt(req.params.id));
    if (found){
    const updMember =req.body;
    members.forEach(member=>{
        if(member.id=== parseInt(req.params.id)){
member.employee_name =updMember.employee_name ? updMember.employee_name : member.employee_name;
member.employee_age =updMember.employee_age ? updMember.employee_age : member.employee_age;
member.employee_salary =updMember.employee_salary ? updMember.employee_salary : member.employee_salary;
res.json({msg:'Member updated',member});
        };
    });
    }
    else{
        res.status(400).json({
            msg:`No member with the id of ${req.params.id}`
        });
    };
});

//Delete member 
router.delete('/:id',(req,res) =>{
    const found= members.some(member=>member.id===parseInt(req.params.id));
    if (found){
    res.json({
        msg : 'Member Deleted',
        members : members.filter(member=>member.id!==parseInt(req.params.id))});
    }
    else{
        res.status(400).json({
            msg:`No member with the id of ${req.params.id}`
        });
    };
});


module.exports=router;