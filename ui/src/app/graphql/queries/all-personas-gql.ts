import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {AgentPersona} from '../interfaces'

export interface Response {
  allPersonas: AgentPersona[]
}

@Injectable({
  providedIn: 'root',
})
export class AllAgentPersonasGQL extends Query<Response> {
  document = gql`
  query GetAllAgentPersonas {
    allPersonas {
      id
      name
      avatar
    }
  }
`;
}