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
            Clients.Others.SendAsync("userJoined", newUser);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var user = users.FirstOrDefault(u => u.ConnectionId == Context.ConnectionId);
            users.Remove(user);
            Clients.Others.SendAsync("userLeft", user);
            return base.OnDisconnectedAsync(exception);
        }

        public User LoginUser(string userName){
            var user = users.FirstOrDefault(u => u.ConnectionId == Context.ConnectionId);
            user.Name = userName;
            Console.WriteLine($"Welcome {userName}");
            Clients.Others.SendAsync("newUserLogedIn", user);
            return user;
        }
        public List<User> GetAllUsers(){
            return users;
        }
    }
}