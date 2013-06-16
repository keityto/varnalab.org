module.exports = function(config){
  var Member = require(config.models+"/Member");
  return {
    "GET": function(req, res){
      Member.find({}, function(err, members){
        if(err) return res.error(err);
        res.result(members); 
      })
    },
    "POST /register": function(req, res){
      Member.create(req.body, function(err, member){
        if(err) return res.error(err);
        req.session.userId = member._id;
        res.result(member);
      })
    },
    "GET /:id": function(req, res){
      Member.findOne(req.params.id, function(err, member){
        if(err) return res.error(err);
        res.result(member);
      });
    },
    "POST /login": function(req, res){
      if(!(req.body.email&&req.body.password))
        return res.error('wrong parameters');
      Member.findOne({'email':req.body.email, 'password': req.body.password}, function(err, member){
        if(err) return res.error(err);
        res.result(member);
      });
    }
  }
}