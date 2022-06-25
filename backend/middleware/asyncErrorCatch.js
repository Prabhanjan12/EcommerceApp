module.exports = tryCatchFunc=>(req,res,next)=>{

    Promise.resolve(tryCatchFunc(req,res,next)).catch(next);
}