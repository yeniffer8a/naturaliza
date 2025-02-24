import { supabase } from "../config/supaBase.js";
import path from "path";

export const uploadSupabase = async (req, res, next) => {
  if (req.body.image === undefined) {

    const { originalname, buffer } = req.file;
    const filePath = `/image/${Date.now()}_${originalname}`;

    const { data, error } = await supabase.storage
      .from("imagens")
      .upload(filePath, buffer, {
        contentType: "image/" + path.extname(originalname).substring(1),
      });

    if (error) {
      return res.status(501).json({ error: "Error to upload the image" });
    }

    const { data: image } = supabase.storage
      .from("imagens")
      .getPublicUrl(data.path);

    req.file.supabaseUrl = image.publicUrl;
  }

  next();
};
