const BlogSchema               = require('../models/blog.schema');


const getBlog = async(author)=>{
    try {
        const data = await BlogSchema.find({});
        const publishdata = [];
        for(var i=0;i<data.length;i++){
            console.log("-----------",data[i].isPublished);
            if(data[i].isPublished == true){
                console.log("yes it is published..");
                publishdata.push(data[i]);
            }else {
                console.log("not published error"); 
            }
        
            //  console.log("-----------------------------",data[i]);
        }
        console.log("    return publishdata=-=-=-=-=-=-=-=-",publishdata);
        return publishdata
    } catch (error) {
        return Error("cannot get blog by id some error in get blog service");
    }

}


module.exports={
    getBlog
}