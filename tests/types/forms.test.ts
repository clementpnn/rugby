// import { AdminSchema, LoginSchema, UserSchema, MFASchema, TribuneSchema, TeamSchema, MatchSchema, DemandSchema } from '@/types/forms'

// describe( 'AdminSchema', () => {
//   it( 'validates correct data', () => {
//     const admin = {
//       firstName: 'John',
//       lastName: 'Doe',
//       role: 'admin',
//       email: 'john.doe@example.com',
//       password: 'Password1!',
//       confirmPassword: 'Password1!'
//     }

//     expect( AdminSchema.safeParse( admin ).success ).toBe( true )
//   } )

//   it( 'returns an error for incorrect data', () => {
//     const admin = {
//       firstName: 'John',
//       lastName: 'Doe',
//       role: 'admin',
//       email: 'john.doe@example.com',
//       password: 'password',
//       confirmPassword: 'differentPassword'
//     }

//     expect( AdminSchema.safeParse( admin ).success ).toBe( false )
//   } )
// } )

// describe( 'LoginSchema', () => {
//   it( 'validates correct data', () => {
//     const login = {
//       email: 'john.doe@example.com',
//       password: 'Password1!'
//     }

//     expect( LoginSchema.safeParse( login ).success ).toBe( true )
//   } )

//   it( 'returns an error for incorrect data', () => {
//     const login = {
//       email: 'notAnEmail',
//       password: 'short'
//     }

//     expect( LoginSchema.safeParse( login ).success ).toBe( false )
//   } )
// } )

// describe( 'UserSchema', () => {
//   it( 'validates correct data', () => {
//     const userData = {
//       accreditationId: '1234',
//       firstName: 'John',
//       lastName: 'Doe',
//       company: 'Company',
//       job: 'JOURNALIST',
//       email: 'john.doe@company.com'
//     }

//     expect( UserSchema.safeParse( userData ).success ).toBe( true )
//   } )

//   it( 'returns an error for incorrect data', () => {
//     const userData = {
//       accreditationId: '1234',
//       firstName: '',
//       lastName: 'Doe',
//       company: 'Company',
//       job: 'SOMETHING_ELSE',
//       email: 'invalid email'
//     }

//     expect( UserSchema.safeParse( userData ).success ).toBe( false )
//   } )
// } )

// describe( 'MFASchema', () => {
//   it( 'validates correct data', () => {
//     const mfaData = {
//       numberOne: '1',
//       numberTwo: '2',
//       numberThree: '3',
//       numberFour: '4',
//       numberFive: '5',
//       numberSix: '6'
//     }

//     expect( MFASchema.safeParse( mfaData ).success ).toBe( true )
//   } )

//   it( 'returns an error for incorrect data', () => {
//     const mfaData = {
//       numberOne: 'a',
//       numberTwo: '2',
//       numberThree: '3',
//       numberFour: '4',
//       numberFive: '5',
//       numberSix: '6'
//     }

//     expect( MFASchema.safeParse( mfaData ).success ).toBe( false )
//   } )
// } )

// describe( 'TribuneSchema', () => {
//   it( 'validates correct data', () => {
//     const tribuneData = {
//       name: 'Tribune1',
//       matchId: '1',
//       type: 'JOURNALIST',
//       places: '500'
//     }

//     expect( TribuneSchema.safeParse( tribuneData ).success ).toBe( true )
//   } )

//   it( 'returns an error for incorrect data', () => {
//     const tribuneData = {
//       name: '',
//       matchId: '',
//       type: 'INVALID',
//       places: 'invalidNumber'
//     }

//     expect( TribuneSchema.safeParse( tribuneData ).success ).toBe( false )
//   } )
// } )

// describe( 'TeamSchema', () => {
//   it( 'validates correct data', () => {
//     const teamData = {
//       country: 'Country1',
//       poule: 'A'
//     }

//     expect( TeamSchema.safeParse( teamData ).success ).toBe( true )

//     it( 'returns an error for incorrect data', () => {

//       const teamData = {
//         country: '',
//         poule: 'INVALID'
//       }

//       expect( TeamSchema.safeParse( teamData ).success ).toBe( false )
//     } )
//   } )
// } )

// describe( 'UserSchema', () => {
//   it( 'validates correct data', () => {
//     const matchData = {
//       date: '2023-07-24',
//       hour: '15',
//       minute: '30',
//       phase: 'POULE_A',
//       stadium: 'Stadium1',
//       teamOne: 'Team1',
//       teamTwo: 'Team2'
//     }

//     expect( MatchSchema.safeParse( matchData ).success ).toBe( true )
//   } )

//   it( 'returns an error for incorrect data', () => {
//     const matchData = {
//       date: '',
//       hour: '',
//       minute: '',
//       phase: 'INVALID',
//       stadium: '',
//       teamOne: '',
//       teamTwo: ''
//     }

//     expect( MatchSchema.safeParse( matchData ).success ).toBe( false )
//   } )
// } )

// describe( 'DemandSchema', () => {
//   it( 'validates correct data', () => {
//     const demandData = {
//       userId: '1',
//       matchId: '1',
//       state: 'ACCEPTED'
//     }

//     expect( DemandSchema.safeParse( demandData ).success ).toBe( true )
//   } )

//   it( 'returns an error for incorrect data', () => {
//     const demandData = {
//       userId: '',
//       matchId: '',
//       state: 'INVALID'
//     }

//     expect( DemandSchema.safeParse( demandData ).success ).toBe( false )
//   } )
// eslint-disable-next-line unicorn/no-empty-file
// } )