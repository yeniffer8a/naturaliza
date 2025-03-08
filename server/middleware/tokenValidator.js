export async function tokenValidator(req, res, next) {
    if(req.rawHeaders.includes('Authorization')){
        next();
} else {
    return res.status(401).json({ ok: false, message: "Unauthorized: you need login first" });
}}