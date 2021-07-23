using System;

namespace VideochatAspNet.Models
{
    public class User
    {
        public string Id { get; set; }
        public string Name { get; set; }
        
        public string ConnectionId { get; set; }
        
        public string WebRTCId { get; set; }
        
        
        
    }
}