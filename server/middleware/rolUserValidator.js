import { getUserBy } from "../services/userService.js";

export async function rolUserValidator(req, res, next) {
    const user = await getUserBy(req.auth.id);

    if (user.role !== "salesforce") {
        return res.status(401).json({ ok: false, message: "Unauthorized: you can't access" });       
}
next();
}