db.createCollection("students", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [ "id", "lastname", "firstname", "email","phone","validated","admin"],
            properties: {
                id: {
                    bsonType: "int",
                },
                lastname: {
                    bsonType: "string",
                },
                firstname: {
                    bsonType: "string",
                },
                email: {
                    bsonType: "string",
                    pattern: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$',
                },
                phone: {
                    bsonType: "string",
                    pattern: '^0[1-9]([-. ]?[0-9]{2}){4}$',
                },
                validated: {
                    enum: ["in progress", "validated", "rejected"]
                },
                admin: {
                    bsonType: "bool",
                }
            }
        }
    }
})


db.students.insert({
    id: NumberInt(1),
    lastname: 'Valencia',
    firstname: 'Marlon',
    email: 'noxmarlon@gmail.com',
    phone: '0618295078',
    validated: 'in progress',
    admin: true
})
