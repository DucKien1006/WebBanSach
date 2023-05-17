using BookStoreCore.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStoreCore.IRepository
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        public void InsertProduct(Product product) { }

        public void UpdateProduct(Product product) { }

        public void DeleteProduct(string IdProduct) { }

        public object filterByCategory(string filter, int pageNumber, int pageSize, int IdCategory);

        public object filter(string filter, int pageNumber, int pageSize);


        public IEnumerable<Product> getByIdCategory(int IdCategory);
<<<<<<< Updated upstream
=======
<<<<<<< HEAD

        public IEnumerable<Category> getAllCategory();

        public void createNewCategory(string nameCategory, string nameUser);

        public void deleteCategory(int idCategory);

=======
>>>>>>> 3de0db7d8f96c0b7e40be265b27f507a8c8d46c9
>>>>>>> Stashed changes
    }
}
