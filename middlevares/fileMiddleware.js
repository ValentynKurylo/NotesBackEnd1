module.exports = {
    fileMiddleware: (req, res, next)=>{
        try{
            let files = req.files
            console.log(files)
            next()
        }
        catch (e){
            next(e)
        }
    }
}