import mongoose from "mongoose";
import mongoose_fuzzy_searching from "mongoose-fuzzy-searching";
const { model, Schema } = mongoose;

var bookSchema = new Schema({
  author: String,
  books: String,
  mp: String,
});
bookSchema.plugin(mongoose_fuzzy_searching, { fields: ["mp"] });

export default model("book", bookSchema);
