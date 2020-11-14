
export const typeDefs =`

enum AccessType {
  PRIVATE,
  DISPLAY,
  STORE
}

type AgentPersona {
  id: ID!
  name: String!
  avatar:String
}

type PersonaData {
  id:ID!,
  name:String!,
  avatar:String,
  fields:[PersonaField]
}

type PersonaField {
  id:ID!
  name: String!,
  value: String!
}

type ProfileData {
  uuid: ID,
  name: String,
  application_name: String,
  app_hash: ID,
  expiry: Int,
  enabled: Boolean,
  fields: [ProfileFieldOut]
}

input ProfileInit {
  uuid: String,
  application_name: String,
  app_hash: ID,
  fields: [ProfileFieldIn]
}

input ProfileFieldIn {
  uuid: ID!,
  name: String!,
  display_name: String,
  required: Boolean!,
  description: String,
  access: AccessType!,
  schema: String
  persona: String,
  value: String
}

type ProfileFieldOut {
  uuid: ID!,
  name: String!,
  display_name: String,
  required: Boolean!,
  description: String,
  access: AccessType!,
  schema: String
  persona: String,
  value: String!
}

type Query {
  profile(profile_id:ID!): ProfileData
  allPersonas: [AgentPersona!]!
  personaData(persona_id:ID): PersonaData!
  personaProfiles(persona_id: ID!):[ProfileData]
}

type Mutation {
  createProfile(profile: ProfileInit): ID!
  updateProfile(profile: ProfileInit): ID!
  deleteProfile(profile_id: ID!): ID!
  addProfileField(profile_id:ID!, field: ProfileFieldIn): ID!
  updateProfileField(profile_id:ID!, field: ProfileFieldIn): ID!
  deleteProfileField(profile_id:ID!, field: ProfileFieldIn): ID!
}

`;