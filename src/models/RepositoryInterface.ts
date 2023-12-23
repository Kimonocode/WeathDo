

export default interface RepositoryInterface {

  findById<T>(id:number): T
  
  findByValue(value:string) : RepositoryInterface

}