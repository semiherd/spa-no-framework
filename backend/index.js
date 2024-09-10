 const express= require("express");
 const path= require("path");
 const PORT= 3000;

 const app= express();

 app.use("/static",express.static(path.join(__dirname,'..','frontend','static')));
 
 app.get('/*', (req,res) => {
	res.sendFile(path.join(__dirname,'..','frontend','index.html'));
 })

 app.listen(PORT,() => {
	console.log(`server is running on port ${PORT}`);
 })