import CoreServices from './coreServices';
import { USERINFO } from '../constants';

class UserInfoServices extends CoreServices {}

export default new UserInfoServices(USERINFO.BASE);
