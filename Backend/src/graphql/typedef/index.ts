import gql from "graphql-tag";

const schema = gql`
    scalar JSON
    scalar Object
    scalar Date
    scalar MultiTypeValue
    scalar StringOrNumberOrBooleanorArray
`

export const typeDefs = [
    schema
]