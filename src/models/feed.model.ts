import { Schema, model } from "mongoose";
import { IFeed } from "../interfaces/feed.interface";
import toJSON from "./plugins/toJSON.plugin";

const feedSchema = new Schema<IFeed>({
    title: {
        type: String,
        required: true
    }
})


feedSchema.plugin(toJSON);

const Feed = model<IFeed>('Feed', feedSchema);

export default Feed