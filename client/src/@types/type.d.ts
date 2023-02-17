// declare module '@mui/material/styles' {
//   interface Theme {
//     status: {
//       danger: string;
//     };
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     status?: {
//       danger?: string;
//     };
//   }
// }

interface IUser {
  _id: string,
  firstName: string,
  lastName: string,
  friends: IUser[],
  location: string,
  occupation: string,
  viewedProfile: number,
  impressions: string,
  picturePath:string,
  updatedAt:string
}

interface IPost {
  _id: string,
  name: string
  userId:string,
  firstName:string,
  lastName:string,
  description:string,
  location:string,
  picturePath:string,
  userPicturePath:string,
  likes: { [key: string]: boolean }
  comment:any[],
  createdAt:string
}

