import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import { ProfileData } from '../interfaces'

export interface Response {
  personaProfiles: ProfileData[]
}

@Injectable({
  providedIn: 'root',
})
export class PersonaProfilesGQL extends Query<Response> {
  document = gql`
  query GetPersonaProfiles($persona_id:ID!) {
    personaProfiles(persona_id: $persona_id) {
      uuid
      name
      application_name
      app_hash
      expiry
      enabled
      fields {
        uuid
        name
        display_name
        required
        description
        access
        schema
        persona
        value
      }
    }
  }
`;
}