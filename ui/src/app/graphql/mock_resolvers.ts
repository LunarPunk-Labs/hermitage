import {AgentPubKey } from '@holochain/conductor-api';
import {GraphQLError} from 'graphql'
import {ProfileInit, AccessType} from './interfaces'

const ZOME_NAME = 'profiles'

export const mock_resolvers = {
  Query: {
    async profile(_, {profile_id}, connection) {
      let profile:ProfileInit = {
        uuid:"chujefhk234234wefwef",
        application_name: "my app",
        app_hash: "my hash",
        fields: [{
          uuid: "aUUID",
          name: "myname",
          display_name: "display",
          required: true,
          description: "test",
          access: AccessType.PUBLIC,
          schema: "{}",
          persona: "personal",
          value: ""
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