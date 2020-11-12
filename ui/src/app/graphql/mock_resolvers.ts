import {AgentPubKey } from '@holochain/conductor-api';
import {GraphQLError} from 'graphql'

const ZOME_NAME = 'profiles'


export enum AccessType {
  PUBLIC,
  PRIVATE,
  PRIVATE_CONFIRM
}

export interface  ProfileField {
  uuid: string,
  name: string,
  display_name: string,
  required: boolean,
  description: string,
  access: AccessType,
  schema: String
}

export interface Profile {
  application_name: string,
  app_hash: string,
  fields: [ProfileField]
}

export const mock_resolvers = {
  Query: {
    async profile(_, {profile_id}, connection) {
      let profile:Profile = {
        application_name: "my app",
        app_hash: "my hash",
        fields: [{
          uuid: "aUUID",
          name: "myname",
          display_name: "display",
          required: true,
          description: "test",
          access: AccessType.PUBLIC,
          schema: "{}"
        }] 
      }
      return  profile
    },
    async currentPersona(_, __, connection) {
   //   if (connection.state == 2)
     //   return new GraphQLError("Holochain is disconnected")
      const response = await connection.call( ZOME_NAME,'get_my_profile', null);
      if (!response) {
        const my_pub_key = await connection.call(ZOME_NAME, 'who_am_i', null);
        return { id: my_pub_key };
      }
      return {
        id: response.agent_pub_key,
        profile: response.profile,
      };
      //return { id: address };
    },
  },
  Mutation: {
    async createProfile(_,  {profile}, connection ) {
  //    if (connection.state == 2)
    //    return new GraphQLError("Holochain is disconnected")
      const response = await connection.call(ZOME_NAME,'create_profile', { profile });
      return {
        id: response.agent_pub_key,
        profile: response.profile,
      };
    },
  }
};