﻿using DACN.Core.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DACN.Core.IRepository
{
    public interface IOrderRepository :IBaseRepository<SessionOrder>
    {
        public Boolean AddItems(List<Product> orderItems, string userID);
        public SessionOrder GetItems(string userID);

        public Boolean Checkout(SessionOrder sessionOrder, string userID);

        public IEnumerable<SessionOrder> GetAllOrder();

        public IEnumerable<SessionOrder> SearchByNameAndCode(string searchString);

        public void updateSessionOrder(int paymentStatus, string OrderId);

        public IEnumerable<SessionOrder> GetAllOrdersByUserId(string userID);

        public dynamic dashboardOrder();

        public dynamic chartOrder();

        public dynamic chartUser();

        public dynamic chartProduct();

        public void updateQuantity(string idProduct, int quantity, int type);

        public SessionOrder GetOrderByID(string idOrder);
    }
}
