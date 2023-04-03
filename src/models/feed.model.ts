import { Schema, model } from "mongoose";
import { IFeed } from "../interfaces/feed.interface";
import toJSON from "./plugins/toJSON.plugin";

const feedSchema = new Schema<IFeed>({
    headline: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    author: {
        type: String
    }, location: {
        type: String
    }, footer: {
        type: String
    },
    publishedAt: {
        type: String,
    }
})


feedSchema.plugin(toJSON);

const Feed = model<IFeed>('Feed', feedSchema);

export default Feed