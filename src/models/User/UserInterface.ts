
export default interface UserInterface {
  id:string|number,
  username:string,
  isFirstTime:boolean,
  readonly createdAt: Date
  readonly token:string,
}