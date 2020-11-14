import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {PersonaData} from '../interfaces'

export interface Response {
  personaData: PersonaData[]
}

@Injectable({
  providedIn: 'root',
})
export class AllPersonaDataGQL extends Query<Response> {
  document = gql`
  query GetAllPersonaData(persona_id:ID!) {
    personaData(persona_id: $persona_id) {
      id
      name
      avatar
      fields {
        id
        name
        value
      }
    }
  }
`;
}