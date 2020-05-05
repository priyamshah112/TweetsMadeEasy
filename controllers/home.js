const url = require('url'); 
var Twitter = require('twitter');
const dotenv = require('dotenv');

module.exports=(app)=>{
      // Twitter configuration for twitter library
        
      var client = new Twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });
    var pane;

    app.get("/home",(req,res)=>{

        if(req.session.user == undefined){
            res.render("index",{message: 'You need to login!'});
        }
        else{
            
            // Get Tweets
            const params = {
                exclude_replies: false,
                count: 100
              };
              
              client.get(
                "statuses/mentions_timeline",
                params,
                (error, mentionedTweets, response) => {
                  if (error) console.log(error);
                  client.get(
                    "statuses/user_timeline",
                    { count: 100 },
                    (err, tweets, response) => {
                      var userTweets = tweets.filter(tweet => tweet.in_reply_to_status_id !== null);
                      if (err) console.log(err);
                      userTweets = userTweets.concat(mentionedTweets);

                      pane = {};
                      for(var i=0; i< userTweets.length; i++){
                          temp = {}
                          //existing users
                          if(userTweets[i].user.screen_name in pane){
                            console.log("username already exists ",userTweets[i].user.screen_name );
                            pane[userTweets[i].user.screen_name].text.push(userTweets[i].text);
                            pane[userTweets[i].user.screen_name].id.push(userTweets[i].id_str);
                          }
                          //New users
                          else{
                            if(req.session.user != userTweets[i].user.screen_name){
                              console.log("new username ",userTweets[i].user.screen_name );
                              temp['text'] = [userTweets[i].text];
                              temp['id'] = [userTweets[i].id_str];
                              temp['profile'] = [userTweets[i].user.profile_image_url_https];
                              pane[userTweets[i].user.screen_name] = temp;
                            }
                          }
                      }
                      req.session.pane = pane;
                      console.log(pane);
                      if(req.session.message === undefined){
                        message = "All Replies made can be seen on twitter";
                      }else{
                        message = req.session.message;
                      }
                      
                      res.render("home",{user:req.session.user, photo:req.session.photo, tweets: pane, message: message});
                    }
                  );
                }
              );
        }
    });
    
    app.post("/home/:id",function(req,res){
        console.log(req.params.id);
        id = req.params.id;
        inpid = 'inp'+id;
        console.log(inpid);
        post = req.body[inpid];
        console.log(post);
        
        // Replying to tweet
        var res1 = {
          status: post,
          in_reply_to_status_id: String(id)
        };
        
        console.log(res1);

        client.post('statuses/update', res1,
          function(err, data, response) {
            console.log(data);
          }
        );
        req.session.message= "Reply was successfully posted";
        return res.redirect(url.format({
          pathname:"/home"
        }));
        
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