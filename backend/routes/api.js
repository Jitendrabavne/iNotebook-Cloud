const express=require('express')
const router=express.Router()

router.get('/',(req,res)=>{
    let obj={
        name:'Jitendra',
        number:9589040712
    }
   res.json([ ])

})
module.exports=router;