const router = require('express').Router();
const passport = require('passport');

router.get("/login/Success",(req,res)=>{
    if(req.user)
    res.status(200).json({
      sucess : true,
      msg:"sucessfull",
      user:req.user
    })
});
router.get("/login/failed",(req,res)=>{
    if(!req.user)
    res.status(401).json({
      sucess : false,
      msg:"Unsucessfull",
      user:req.user
    })
});
router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            return res.status(500).json({
                success:false,
                msg : "Logout Failed",
            })
        }
        res.redirect("http://localhost:5173/")
    })
})
router.get("/google" ,passport.authenticate("google",{scope : ["profile"]}));
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:5173",
    failureRedirect: "/login/failed",
}));


module.exports = router;