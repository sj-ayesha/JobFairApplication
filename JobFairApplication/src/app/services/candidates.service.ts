import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  public candidates: any = [];

  constructor() {
    this.candidates = [
      {
        id: '1',
        firstName: 'Bob',
        lastname: 'John',
        email: 'bob@yopmail.com',
        phoneNum: '58964789',
        gender: 'male',
        address: '85, Royal Road RoseHill',
        registrationDate: '06/08/02',
        availabilityDate: '10/08/02',
        nationality: 'Mauritian',
        experience: [
          {
            expId: '1',
            companyName: 'Dummy',
            position: 'QA',
            duration: '5 years',
          }
        ],
        qualification: [
          {
            qualificationId: '1',
            title: 'BSc(Hons) Software Engineer',
            institution: 'UTM',
            division: 'First Class',
            graduationDate: 'September 2019'
          }
        ],
        skill: [
          {
            name: 'JavaScript'
          }
        ]
      },
      {
        id: '2',
        firstName: 'Jane',
        lastname: 'Doe',
        email: 'jane@yopmail.com',
        phoneNum: '58964789',
        gender: 'female',
        address: '96, Royal Road Curepipe',
        registrationDate: '06/08/02',
        availabilityDate: '10/08/02',
        nationality: 'Mauritian',
        experience: [
          {
            expId: '1',
            companyName: 'Dummy',
            position: 'QA',
            duration: '5 years',
          }
        ],
        qualification: [
          {
            qualificationId: '1',
            title: 'BSc(Hons) Software Engineer',
            institution: 'UTM',
            division: 'First Class',
            graduationDate: 'September 2019'
          }
        ],
        skill: [
          {
            name: 'JavaScript'
          }
        ]
      }
    ];
  }

  public getcandidateDetail() {
    return this.candidates;
  }
}
