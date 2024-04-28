module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "Nayan",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "being kicked by the administrator na pasikat";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`Unable to re-add members ${name} to the group\n\n${name} blocked me or There is no Message option in the profile `, event.threadID)
   } else api.sendMessage(`${name} বদমাইশ তুই কোনো বাহানা করতে পারবি না আশিক বস এর অর্ডার চুপ করে গ্রুপে থাক না হলে তোরে মারবে আশিক বস 😾🔪`, event.threadID);
  })
 }
}
