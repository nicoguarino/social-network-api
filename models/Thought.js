const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
    {
        throughText: {
            type: String,
            require: true,
            trim: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            require: "Must have a username",
            trim: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})