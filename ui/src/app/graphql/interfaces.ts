
//Better AccessType names?

//private = unshared, 
//display = read_but_not_store  
//store = public


export enum AccessType {
  PRIVATE="PRIVATE",
  DISPLAY="DISPLAY",
  STORE="STORE"
}

export interface AgentPersona {
  id: string
  name: string,
  avatar:string
}

export interface PersonaData {
  id:string,
  name:string,
  avatar:string,
  fields:PersonaField[]
}

export interface PersonaField {
  id:string
  name: string,
  value: string
}

export interface ProfileInit {
  uuid: string,
  application_name: String,
  app_hash: string,
  fields: [ProfileFieldIn]
}

export interface ProfileData {
  uuid: string,
  name: string,
  application_name: String,
  app_hash: string,
  expiry: number,
  enabled: boolean,
  fields: [ProfileFieldOut]
}

export interface ProfileFieldIn {
  uuid: string,
  name: string,
  display_name: string,
  required: boolean,
  description: string,
  access: AccessType,
  schema: string
  persona: string,
  value: string
}


export interface ProfileFieldOut {
  uuid: string,
  name: string,
  display_name: string,
  required: boolean,
  description: string,
  access: AccessType,
  schema: string
  persona: string,
  value: string
}