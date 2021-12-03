# Social-Network-Api

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Code Sample](#code-sample)
- [Acknowledgement](#acknowledgement)
- [Contributing](#contributing)
- [License](#license)

## About <a name = "about"></a>

Social network api is a back end designed around a Nosql database using Mongodb. It is used to create users, update users, delete users and their thoughts and reactions.

## Getting Started <a name = "getting-started"></a>

* [Git Hub Pull](https://github.com/nicoguarino/social-network-api.git)
* [Walkthrough Video](https://watch.screencastify.com/v/Kg1tEM1DLzz1vSjNdU1v)

## Installation <a name = "installation"></a>

1. Download Node to be able to run application
2. Download Mongodb
3. Download Express by npm i express
4. Download mongoose by npm i mongoose
5. To run application type in the command line "npm start"

## Code Sample <a name = "code-sample"></a>

![Sample Code](https://github.com/nicoguarino/e-commerce-/blob/main/images/sample_code.PNG?raw=true "Sample Code")

### Sample Code
```JavaScript Sample
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            require: true,
            maxlength: 280
        },
        username: {
            type: String,
            require: "Must have a username",
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {

        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false

    }
)

module.exports = ReactionSchema;
```

## Authors and acknowledgement <a name = "acknowledgement"></a>

Nico (Filipu) Guarino

## Contributing <a name = "contributing"></a>

Social-Network-Api is open for contrubiting, however check with the creator first before making any permanent changes. The creator is opening to creative ideas and tweeking of design, but it must be approved first.

## License <a name = "license">

(c) 2021 Social-Network-Api