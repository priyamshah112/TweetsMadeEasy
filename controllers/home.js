const url = require('url'); 

module.exports=(app)=>{

    app.get("/home",(req,res)=>{

        if(req.session.user == undefined){
            res.render("index",{message: 'You need to login!'});
        }
        else{
            res.render("home",{user:req.session.user, photo:req.session.photo});
        }
    });
    
    app.post("/home",async (req,res)=>{

        return res.redirect("/home")
        
    });

    app.get('/logout', function(req, res){
        req.session.destroy();
        res.redirect(
            url.format({
            pathname:"/"
          })
          );
      });
}