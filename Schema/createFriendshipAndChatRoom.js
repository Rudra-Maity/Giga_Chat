const mongoose=require('mongoose');
const Friend=require('./Friends.js');
const User=require('./User.js')
const Chat=require('./chat_content.js')

const createFriendship = async (chatNum1, chatNum2,) => {
    try {
      // Find User documents based on chat_num
      const user1 = await User.findOne({ chat_num: chatNum1 });
      const user2 = await User.findOne({ chat_num: chatNum2 });

      if (!user1 || !user2) {
        // Handle the case where one or both users are not found
        console.error('User not found');
        return;
      }

      // Create a Friend document
      const chatRoomId=await createChatRoom(chatNum1,chatNum2);
      const friend = await Friend.create({
        friend_id:chatRoomId,
        user_chat1 : {
            chat_num: chatNum1
        },
        user_chat2 : {
            chat_num: chatNum1
        },

      });

      // Update User documents with the Friend _id
      await User.findByIdAndUpdate(user1._id, { $addToSet: { friends: friend._id } });
      await User.findByIdAndUpdate(user2._id, { $addToSet: { friends: friend._id } });

      console.log('Friendship created successfully');
      return friend
    } catch (error) {
      console.error('Error creating friendship:', error);
    } finally {
      // Close the MongoDB connection
      mongoose.connection.close();

    }
  };


  const createChatRoom= async(chat_num1Id,chat_num2Id)=>{
    const chatRoom=await Chat.create({
      chat_num1Id:chat_num1Id,
      chat_num2Id:chat_num2Id
    });
  return chatRoom._id;
  }

module.exports=  createFriendship;
