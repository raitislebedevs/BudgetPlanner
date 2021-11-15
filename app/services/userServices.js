import CoreServices from './coreServices';
import { USERS } from '../constants';

class UserServices extends CoreServices {}

export default new UserServices(USERS.BASE);
