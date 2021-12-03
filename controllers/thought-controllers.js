const { Thought, User } = require('../models');

const thoughtController = {

    getAllThoughts(req, res) {
        Thought.find({})
            .populate(
                {
                    path: 'reactions',
                    select: '-__v'
                },
            )
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });


    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtid })
            .populate(
                {
                    path: 'reactions',
                    select: '-__v'
                },
            )
            .select('-__v')
            .then(dbThoughtData => {

                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                console.log(_id);
                return User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: _id } }, { new: true })
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtid }, body, { new: true, runValidators: true })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-___v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    console.log(dbThoughtData);
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtid })
            .then(({ _id }) => {
                console.log(_id);
                return User.findOneAndUpdate({ _id: params.userId }, { $pull: { thoughts: { thoughtid: params.thoughtid } } }, { new: true })
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtid },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },


    removeReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtid },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id' });
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    }
}

module.exports = thoughtController;