using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Models.Session
{
    [Serializable]
    public class UserSession
    {
        public string Current { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public string RoleStr { get; set; }
        public string[] Roles { get { return RoleStr.Split(','); } }
        public string EntityStr { get; set; }
        public string[] Entits { get { return EntityStr.Split(','); } }
        public string LocationStr { get; set; }
        public string[] Locations { get { return LocationStr.Split(','); } }
        public string SectorStr { get; set; }
        public string[] Sectors { get { return SectorStr.Split(','); } }
        public string PhotoID { get; set; }
    }
}
