using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace timesheet_api.Models
{
    public class ItemService
    {
        private IDbMethods dbMethods;

        public ItemService(IDbMethods dbMethods)
        {
            this.dbMethods = dbMethods;
        }

        public int AddItemToDatabase(Item item)
        {
            return dbMethods.AddItemToDatabase(item);
        }

        public List<Item> GetItemsFromDatabase(string Date)
        {
            return dbMethods.GetItemsFromDatabase(Date);
        }
    }
}