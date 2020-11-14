import {AgentPubKey } from '@holochain/conductor-api';
import {GraphQLError} from 'graphql'
import {ProfileInit, AccessType, AgentPersona} from './interfaces'

export const mock_resolvers = {
  Query: {
    profile(_, {profile_id}) {
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
          access: AccessType.DISPLAY,
          schema: "{}",
          persona: "personal",
          value: ""
        }] 
      }
      return  profile
    },
    personaData(_, {persona_id}) {
      //determines persona
      console.log("retrieving data for persona",persona_id)
      let array = []
      array.push({id:"xyz",name:"Developer",avatar:"",
      fields:[{id:"def24524",name:"team_mate1",value:"Josh"},
        {id:"d3f24524",name:"team_mate2",value:"Maija"},
        {id:"uu8978924",name:"team_mate3",value:"Monique"}
      ]})
      return array
    },
    allPersonas(_, __) {
      let array = []
      array.push({id: "1234",name:"friends",avatar:"lol"},
        {id: "1235",name:"work",avatar:"lol"},
        {id: "1236",name:"development",avatar:"lol"},
        {id: "1237",name:"fishing",avatar:"lol"})
      return array
    },
    personaProfiles(_,{persona_id}){
      //determines profiles by persona_id
      console.log("retrieving profiles for persona",persona_id)
      let array = []
      array.push({uuid:"chujefhk234234wefwef",
        name: "profile1",
        application_name: "Calendar",
        app_hash: "my hash",
        expiry: 0,
        enabled: true,
        fields: [{
          uuid: "aUUID",
          name: "myname",
          display_name: "display",
          required: true,
          description: "test",
          access: AccessType.STORE,
          schema: "{}",
          persona: "personal",
          value: "Josh"
        }]})
      return array
    }
  },
  Mutation: {
    async createProfile(_,  {profile}, connection ) {
  //    if (connection.state == 2)
    //    return new GraphQLError("Holochain is disconnected")
      const response = await connection.call("ZOME_NAME",'create_profile', { profile });
      return {
        id: response.agent_pub_key,
        profile: response.profile,
      };
    },
  }
};