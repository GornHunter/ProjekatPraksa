using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace timesheet_api.Models
{
    public interface IDbMethods
    {
        int AddItemToDatabase(Item item);

        List<Item> GetItemsFromDatabase(string Date);
    }
}
