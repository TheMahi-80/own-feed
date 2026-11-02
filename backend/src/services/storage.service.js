const cloudinary = require("cloudinary").v2

function uploadImage(buffer){
    return new promise((resolve,reject)=>{
        const stream = Cloudinary.uploader.upload_stream(
            {folder:"posts"},(error,result)=>{
                if(error) return reject(error);
                if(!result) return reject(new Error("Cloudinary return no upload result"))
                    resolve(result);
            }
        );
        stream.end(buffer);
    })
}

module.exports={uploadImage}