var express = require('express');
var app=express()
var Session = require('express-session');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var plus = google.plus('v1');
var fs = require('fs');
var bodyParser = require('body-parser');
var responses=[]

var emails=''
var y=''

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


function getAuthClient(){
return new OAuth2(clientId,clientSecret,redirectUrl);
}

function getAuthUrl(){
var oauth2client=getAuthClient();
var scopes = ['https://www.googleapis.com/auth/gmail.readonly'];
var url =oauth2client.generateAuthUrl({
access_type:'offline',
scope:scopes
});
return url;

}
app.get('/',function(req,res){
		console.log(req.ip);
	fs.readFile('client.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
   credentials= JSON.parse(content);
   
     clientSecret = credentials.installed.client_secret;
   clientId = credentials.installed.client_id;
   redirectUrl = credentials.installed.redirect_uris[0];
	
var url=getAuthUrl();
	var ht=`<html>
<link href="https://fonts.googleapis.com/css?family=Amatic+SC" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Reenie+Beanie" rel="stylesheet">
<style>
*{font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		font-size:20px;}
h3{
position:relative;
left:30%;
font-size :75px;
font-weight:lighter;
font-family: 'Amatic SC', cursive;
}
p{

font-family: 'Reenie Beanie', cursive;
font-size:50px;
position:relative;
left:22%;
}
button{
position:relative;
background-color:#fff;
left:45%;
width:100px;
border:1px solid #8c6ad2;
padding:7px;
border-radius:10px 1px 10px 1px;
 -webkit-transition: all 0.5s ease;
}
button:hover{
position:relative;
background-color:#fff;
left:45.5%;
width:100px;
border:1px solid #e0a661;
padding:7px;
border-radius:0px 0px 0px 0px;

 -webkit-transition: all 0.5s ease;

}
</style>
<body>
<h3 >Welcome to the email client</h3>
<p>It does nothing new just tryin somethin out here,so..</p>

<a href="`+url+`" style="visibility:hidden"></a>
<button onclick="document.getElementsByTagName('a')[0].click();">Let's Go</button>
</body>
</html>
`

res.send(ht)
});	
});

/*
app.get('/login',function(req,res){
	console.log(req.ip)
	fs.readFile('client.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
   credentials= JSON.parse(content);
     clientSecret = credentials.installed.client_secret;
   clientId = credentials.installed.client_id;
   redirectUrl = credentials.installed.redirect_uris[0];

var url=getAuthUrl();
var html=`
<html>
<body>
<h3>Login page</h3>
<a href='`+url+`'>Click</a>
</body>
</html>
`

  res.send(html);
  
})
	
});
*/








app.get('/oauth',function(req,res){
	
 auth =getAuthClient()
var code=req.query.code;
auth.getToken(code,function(err,token){
	if(err) res.send('sdfsafs');
	auth.credentials=token;
	//console.log(token);
	//findMessages(auth,res)
res.redirect('/options')
	//console.log(y);
	//res.send(y);
	
}	);
	
	
});


function findMessages(auth,res,label) {
	//var auth =getAuthClient()
	var x=''
  var gmail = google.gmail('v1');
  gmail.users.messages.list({
  auth: auth,
  userId: 'me',
  maxResults: 20,
  q:"label:"+label
}, function(err, response) {
	if(err)console.log(err);
	else{
 
 
 res.write(`<html>
<style>
.main{
position:relative;
left:250px;
width:900px;
background-color:#fff;
height:40px;
}
input:hover{
background-color:#ddd;
 -webkit-transition: all 0.5s ease;
}
input{
position:relative;
height:40px;
width:900px;
border:1px solid transparent;
border-radius:2px;
padding:10px;
background-color:#fff;
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		font-size:25px;
		letter-spacing:1px;
		font-weight:lighter
}
.major{
position:relative;
left:50px;
top:100px;

}
</style>
<body>
<div class="major">
`)
 
 
 
 
 
 
 
    parseMessage(response.messages,auth,res);
	
	}
  });
}

function parseMessage(messageID,auth,res) {
	if(typeof(i)=="undefined") { i=1 ;console.log(typeof(i))}
	//	var auth =getAuthClient()
	
  var gmail = google.gmail('v1');
  gmail.users.messages.get({
  auth: auth,
  userId: 'me',
  id:messageID[0].id
}, function(err, response) {
	
	
	
	
	
	
	
	
	//Here is your html part u moron 
	/*
len=response.payload.parts.length

while(len>0){
		len=len-1
	if(response.payload.parts[len].mimeType=="text/html"){
 buf = new Buffer(response.payload.parts[len].body.data, 'base64').toString('ascii');


var l=response.payload.headers;

var fromtoh=`<html>
<style>
p1{font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		font-size:18px;
		font-weight:lighter;
		
		}
</style>
<body>
<p1>From: `+l[l.length-3].value+`</p1>
<p1>To: `+l[l.length-3].value+`</p1>
</body>
</html>
`
	res.write(fromtoh);
	res.write(buf)

	}
	}

	
	
*/	
	
//   console.log(response.snippet);
 

//-------------------------------------------------------------------------------------**************------------------
//Finding Subject or somethiafdasgf



var headlen=response.payload.headers.length-1;
while(headlen>0){
if(response.payload.headers[headlen].name=="Subject"){
	var subject=response.payload.headers[headlen].value;
	
	
}	
	
	headlen=headlen-1;
	
	
	
	
	
	
	
}
var oc='onclick="document.getElementsByTagName('+'form'+')['+i-1+'].submit()"'

 res.write(`
 <div onclick="document.getElementsByTagName('form')[`+(i-1)+`].submit()" >
 
 
 
 <form method="POST" action="/expand">
<div class="main">
<input type="text" value="`+i+`   `+subject+`" readonly/>
<input name="meid" value="`+response.id+`" style="visibility:hidden" />
</div>
</form>
</div>
`
)
 
 
 

 
 
 
	
 
 
 
 
 
 //------------------------------------------------------------------------------------******************------------------
 messageID.splice(0,1);
    if(messageID.length>0){
		i+=1
     parseMessage(messageID,auth,res);
	}
   else {
     console.log("All Done");
	 
	 
	 
res.write(`
</div>
</body>

</html>
	 `)
	 
	 
	 
	 
	 
	 
	 res.end();
	 
   }
});}



app.get('/options',function(req,res){
	res.sendFile(__dirname+'/welcome.html');
	
	
	
	
	
});


app.post('/expand',function(req,res){
	//console.log(req);
	var mid=req.body.meid;
	console.log(mid);
	var gmail = google.gmail('v1');
  gmail.users.messages.get({
  auth: auth,
  userId: 'me',
  id:mid
}, function(err, response) {


len=response.payload.parts.length

while(len>0){
len=len-1
	if(response.payload.parts[len].mimeType=="text/html"){
 buf = new Buffer(response.payload.parts[len].body.data, 'base64').toString('ascii');


var headlen=response.payload.headers.length-1;
while(headlen>0){
if(response.payload.headers[headlen].name=="From"){
	var from=response.payload.headers[headlen].value;
	
	
}	


if(response.payload.headers[headlen].name=="To"){
	var to=response.payload.headers[headlen].value;
	
	
}	

headlen-=1;
}
var fromtoh=`<html>
<style>
p1{font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		font-size:18px;
		font-weight:lighter;
		
		}
</style>
<body>
<p1>From: `+from+`</p1>
<p1>To: `+to+`</p1>
</body>
</html>
`
	res.write(fromtoh);
	res.write(buf)
res.end()
	}
	}










}
	
	
	
)	
});


app.get('/messages',function(req,res){
	findMessages(auth,res,'inbox');
	
	//var x=findMessages();
	//res.send(x);	
	
});



app.get('/sent',function(req,res){
	
	findMessages(auth,res,'sent')
	
});

app.get('/spam',function(req,res){
	
	findMessages(auth,res,'spam')
	
});





app.listen(1234,function(err,suc){
if(err) console.log(err)
else console.log("Listening");
});