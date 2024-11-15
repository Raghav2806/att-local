import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    lon1: Number,
    lat1: Number,
    lon2: Number,
    lat2: Number,
    distance: Number
});

const requestModal = mongoose.model("requests", requestSchema);

export default requestModal;