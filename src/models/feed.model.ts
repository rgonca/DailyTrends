import { Schema, model } from "mongoose";
import toJSON from "./plugins/toJSON.plugin";

interface IFeed {
    title: string;
}

const feedSchema = new Schema<IFeed>({
    title: {
        type: String,
        required: true
    }
})


feedSchema.plugin(toJSON);

const Feed = model<IFeed>('Feed', feedSchema);

export default Feed