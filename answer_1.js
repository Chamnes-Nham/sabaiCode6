
const mockDatabase = [
    { id: 1, name: "sok" },
    { id: 2, name: "sao" },
    { id: 3, name: "pisey" }
  ];

  function getUserInfo(id, callback) {
    setTimeout(() => {
      const user = mockDatabase.find(user => user.id === id);
      if (user) {
        callback(null, user);
      } else {
        callback("User not found");
      }
    }, 2000);
  }

  function processUserData(user, callback) {
    setTimeout(() => {
      if (user) {
        user.name = user.name.toUpperCase();
        callback(null, user);
      } else {
        callback("User data not provided");
      }
    }, 1500);
  }
 
  getUserInfo(1, (error, user) => {
    if (error) {
      console.error(error);
    } else {
      processUserData(user, (error, processedUser) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Processed user data:", processedUser);
        }
      });
    }
  });
  