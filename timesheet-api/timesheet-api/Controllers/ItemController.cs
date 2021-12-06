using Autofac;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using timesheet_api.Models;

namespace timesheet_api.Controllers
{
    [RoutePrefix("api/Item")]
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class ItemController : ApiController
    {
        //private SqlDataAdapter adapter;

        [Route("PostItem")]
        public IHttpActionResult PostItem([FromBody] Item item)
        {
            if (item == null)
                return Ok("There seems to be a problem with the item you wanted  to add!");

            var containerBuilder = new ContainerBuilder();
            containerBuilder.RegisterType<DbMethods>().As<IDbMethods>();
            containerBuilder.RegisterType<ItemService>().AsSelf();

            var container = containerBuilder.Build();

            var itemService = container.Resolve<ItemService>();

            int result = itemService.AddItemToDatabase(item);


            if (result > 0)
                return Ok("Item was succesfully added.");

            return Ok("Item was not added!");
        }

        [Route("GetItem/{Date}")]
        public IHttpActionResult GetItem(string Date)
        {
            var containerBuilder = new ContainerBuilder();
            containerBuilder.RegisterType<DbMethods>().As<IDbMethods>();
            containerBuilder.RegisterType<ItemService>().AsSelf();

            var container = containerBuilder.Build();

            var itemService = container.Resolve<ItemService>();

            return Ok(itemService.GetItemsFromDatabase(Date));
        }
    }
}