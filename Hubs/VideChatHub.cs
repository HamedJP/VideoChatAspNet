using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using VideochatAspNet.Models;

namespace VideochatAspNet.Hubs
{
    public class VideChatHub:Hub
    {
        private readonly List<User> users;

        public VideChatHub(List<User> users)
        {
            this.users = users;
        }

        public override Task OnConnectedAsync()
        {
User newUser = new()
            {
                Id=Guid.NewGuid().ToString(),
                ConnectionId = Context.ConnectionId
            };
            users.Add(newUser);

            return base.OnConnectedAsync();
        }

        public User LoginUser(string userName){
            var user = users.FirstOrDefault(u => u.Id == Context.ConnectionId);
            user.Name = userName;
            Console.WriteLine($"Welcome {userName}");
            
            return user;
        }
        public List<User> GetAllUsers(){
            return users;
        }
    }
}