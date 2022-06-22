var mongo = require('mongodb');
var MongoClient=require('mongodb').MongoClient; 
var url="mongodb://localhost:27017/";
const prompt=require('prompt');
prompt.start();
console.log("1.Insert\n2.Update\n3.Delete\n4.Exit\n");
prompt.get(['choice'],function(err,result){
if(err) { 
    return onErr(Err);
}
switch(result.choice) { 
    case "1": 
        console.log("INSERT");
        prompt.get(['Movie_Name','Year','Rating'],function(err,result){
        if(err) { return onErr(Err);}
        console.log('Data from user :');
        console.log('Movie Name - ' + result.Movie_Name);
        console.log('Year - ' + result.Year);
        console.log('Rating - ' + result.Rating);
        // console.log('Department - ' + result.Department);
        MongoClient.connect(url,{useUnifiedTopology: true},function(err,db) { 
            if(err) throw err; 
            var dbo=db.db("movies");      
            var obj={Movie_Name: result.Movie_Name , Year:result.Year, Rating: result.Rating};    
            dbo.collection("reviews").insertOne(obj,function(err,res){
                if(err) throw err; 
                console.log("Inserted 1 Movie document !! ");
                db.close();
            });
            });
        });
        break; 
    case "2": 
        console.log("UPDATE");
        prompt.get(['Movie_Name','Year','newRating'],function(err,result){
            if(err) { return onErr(Err);}
            MongoClient.connect(url,{useUnifiedTopology: true},function(err,db) 
            { 
                if(err) throw err; 
                var dbo=db.db("movies");
                var query={Movie_Name:result.Movie_Name};
                var upd_val={$set: {Movie_Name: result.Movie_Name , Year:result.Year , Rating: result.newRating}}; 
                dbo.collection("reviews").updateOne(query,upd_val,function(err,res){
                if(err) throw err; 
                if(res.result=="0") 
                    console.log("Key not found !!");
                else
                { 
                    console.log("Movie document Updated!! ");
                    db.close();
                } 
                });
            });
        });
        break; 
    case "3": 
        console.log("DELETE");
        prompt.get(['Movie_Name'],function(err,result){
            if(err) { 
                return onErr(Err);}
            MongoClient.connect(url,{useUnifiedTopology: true},function(err,db) 
            { 
                if(err) throw err; 
                var dbo=db.db("movies");
                var query={Movie_Name:result.Movie_Name};
                dbo.collection("reviews").deleteOne(query,function(err,res){
                    if(err) throw err; 
                    if(res.result=="0") 
                        console.log("Key not found !! ");
                    else
                    { 
                        console.log("Movie document Deleted!! ");
                        db.close();
                    } 
                });
            });
        });
        break; 
    default: 
        console.log("EXIT") 
} 
});
function onErr(err){
    console.log(err);
    return 1; 
}
