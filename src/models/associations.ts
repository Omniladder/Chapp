import { User } from './userSchema';
import { Friend } from './friendSchema';

Friend.belongsTo(User, { as: 'user1', foreignKey: 'friendID1' });
Friend.belongsTo(User, { as: 'user2', foreignKey: 'friendID2' });

User.belongsToMany(User, {
  through: Friend,
  as: 'friends',
  foreignKey: 'friendID1',
  otherKey: 'friendID2'
});


console.log("Connected Friends and Users");


