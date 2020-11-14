import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CreateProfileGQL extends Mutation {
  document = gql`
    mutation CreateProfile($profile: ProfileInit!) {
      createProfile(profile: $profile) {
        uuid
        application_name
        app_hash
        fields{
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