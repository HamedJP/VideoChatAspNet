using System;
using System.Collections.Generic;
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

        public User LoginUser(string userName){
            User newUser = new()
            {
                Id=Guid.NewGuid().ToString(),
                Name = userName,
                ConnectionId = Context.ConnectionId
            };
            users.Add(newUser);
            Console.WriteLine($"Welcome {userName}");
            
            return newUser;
        }
    }
}