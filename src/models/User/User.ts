import storage from "../../storage/stotage";
import UserInterface from "./UserInterface";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default class User {

  private static readonly key = 'user';

  static async store(user: UserInterface): Promise<boolean>{
    try {
      const uuid = uuidv4();
      await storage.save({
        key:User.key,
        id:uuid,
        data:user,
      });
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  }

  static async session(): Promise<UserInterface|null> {
    const user: UserInterface = await storage.load({
      key:User.key
    });
    return user ? user : null;
  }

  static async destroy(): Promise<void> {
    return await storage.clearMapForKey(User.key);
  }
}