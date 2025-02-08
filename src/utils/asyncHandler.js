const asyncHandler = (requestHandler) => 
    {
        (req, res, next) => {
            Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
        }
    }



export default asyncHandler;


//const asyncHandler = () => {}
//const asyncHandler = (func) => {() => {}}  //func is a function that will be passed to asyncHandler
//const asyncHandler = (func) => () => {}  // can be written as these we know from JS
//const asyncHandler = (func) => async () => {}
    
    //Using try-catch
/*
const asyncHandler = (func) => async (req, res, next) => {
    try {
        await func(req, res, next)
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}
*/
