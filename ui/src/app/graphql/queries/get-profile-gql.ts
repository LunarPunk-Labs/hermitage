import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import { ProfileData } from '../interfaces'

export interface Response {
  profile: ProfileData
}

@Injectable({
  providedIn: 'root',
})
export class GetProfileGQL extends Query<Response>  {
  document = gql`
    query GetProfile($profile_id: ID!) {
      profile(profile_id: $profile_id) {
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