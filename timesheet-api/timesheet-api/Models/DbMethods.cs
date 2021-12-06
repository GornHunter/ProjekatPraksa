using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace timesheet_api.Models
{
    public class DbMethods : IDbMethods
    {
        public int AddItemToDatabase(Item item)
        {
            SqlConnection connection = new SqlConnection("Data Source=LAPTOP-MULQ4G1J;Initial Catalog=ItemDatabase;Integrated Security=True");

            var query = "insert into Item (Title, Hours, Date) values(@Title, @Hours, @Date)";
            SqlCommand insertCommand = new SqlCommand(query, connection);

            insertCommand.Parameters.AddWithValue("@Title", item.Title);
            insertCommand.Parameters.AddWithValue("@Hours", item.Hours);
            insertCommand.Parameters.AddWithValue("@Date", item.Date);

            connection.Open();

            return insertCommand.ExecuteNonQuery();
        }

        public List<Item> GetItemsFromDatabase(string Date)
        {
            SqlConnection connection = new SqlConnection("Data Source=LAPTOP-MULQ4G1J;Initial Catalog=ItemDatabase;Integrated Security=True");
            DataTable dataTable = new DataTable();

            var query = "select * from Item where Date = " + "'" + Date + "'";
            SqlDataAdapter adapter = new SqlDataAdapter
            {
                SelectCommand = new SqlCommand(query, connection)
            };

            adapter.Fill(dataTable);

            List<Item> items = new List<Item>(dataTable.Rows.Count);
            if (dataTable.Rows.Count > 0)
            {
                foreach (DataRow item in dataTable.Rows)
                {
                    items.Add(new Item { Title = item["Title"].ToString(), Hours = Convert.ToInt32(item["Hours"]), Date = item["Date"].ToString() });
                }
            }

            return items;
        }
    }
}