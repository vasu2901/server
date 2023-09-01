package controller

import(
	"github.com/gofiber/fiber/v2"
	"fmt"
	//"log"
	"strconv"
	"github.com/BalkanID-University/vit-2025-summer-engineering-internship-task-vasu2901/tree/main/backend/database"
	"github.com/BalkanID-University/vit-2025-summer-engineering-internship-task-vasu2901/tree/main/backend/models"
	"github.com/BalkanID-University/vit-2025-summer-engineering-internship-task-vasu2901/tree/main/backend/util"
	"github.com/BalkanID-University/vit-2025-summer-engineering-internship-task-vasu2901/tree/main/backend/middleware"

)

func AddBook(c* fiber.Ctx)error{ // for adding books in book database. //added in frontend
	var data map[string]string
	var bookdata models.Book

	if err:=c.BodyParser(&data);err != nil{
		fmt.Println("Error parsing data")
	}
	
	database.DB.Where("title=?",data["title"]).First(&bookdata)
	if bookdata.S_no != 0{
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Sorry this book exists",
		})
	}
	stock,_ := strconv.Atoi(data["stock"])
	price,_ := strconv.Atoi(data["price"])
	book := models.Book{
		Title: data["title"],
		Author: data["author"],
		Publication: data["publication"],
		Genre: data["genre"],
		Stock: int64(stock),
		Price: int64(price),
	}
	cookie := c.GetReqHeaders()
	issuer, err := util.ParseAdmin(cookie["Auth-Token"])
	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"error":err,
			"success":false,
		})
	}
	if(issuer == "admin@gmail.com"){
		c.Status(200)
		database.DB.Create(&book)
		return c.JSON(fiber.Map{
			"message": "Admin book created",
			"book": book,
			"success": true,
		})
	}
	c.Status(400)
	return c.JSON(fiber.Map{
		"message": "Only admin can do this",
		"sucess": false,
	})	
}

func UpdateStock(c *fiber.Ctx)error { // for updating the stock. added in frontend
	var data map[string]string
	var bookdata models.Book

	if err:=c.BodyParser(&data);err != nil{
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unable to parse body",
			"success": false,
		})

	}
	database.DB.Where("title=?",data["title"]).First(&bookdata)
	if bookdata.S_no == 0{
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Sorry this book doesn't exists",
			"success": false,
		})
	}
	
	stock,_ := strconv.Atoi(data["stock"])
	price,_ := strconv.Atoi(data["price"])
	bookdata.Stock += int64(stock)
	bookdata.Price += int64(price)
	cookie := c.GetReqHeaders()
	issuer, err0 := util.ParseAdmin(cookie["Auth-Token"])
	if err0 != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"error":err0,
			"success": false,
		})
	}
	if(issuer == "admin@gmail.com"){
		database.DB.Save(&bookdata)
		c.Status(200)
		return c.JSON(fiber.Map{
			"message": "Stock Updated",
			"book": bookdata,
			"sucess": true,
		})
	}
	c.Status(400)
	return c.JSON(fiber.Map{
		"message": "Only admin can do this",
		"success": false,
	})
}

func GetAllBooks(c *fiber.Ctx)error { //for fetching all the books stored in the database.added in frontend
	var book []models.Book
	middleware.IsAuthentic(c)
	database.DB.Preload("Book").Find(&book)
	
	c.Status(200)
		return c.JSON(fiber.Map{
			"sucess": true,
			"data": book,
		})
}
func CheckStock(booktitle string)bool{ //for checking the availability of the book.
	var bookdata models.Book
	database.DB.Where("Title = ?", booktitle).First(&bookdata)
	if (bookdata.S_no == 0 || bookdata.Stock == 0) {
		return false;
	}
	return true;
}
func UpdateStock0(booktitle string , x int)bool { // for updating stock of book when added to cart by a user.
	var bookdata models.Book
	if(x == 1){
		database.DB.Where("title=?",booktitle).First(&bookdata)
		bookdata.Stock = bookdata.Stock - 1
		database.DB.Save(&bookdata)	
		return true
	}else{
		database.DB.Where("title=?",booktitle).First(&bookdata)
		bookdata.Stock = bookdata.Stock + 1
		database.DB.Save(&bookdata)	
		return true
	}
}
func AddtoCart(c *fiber.Ctx)error { // for adding a book to the cart. added to frontend.
	var data map[string] string
	var cartdata models.Cart
	if err:=c.BodyParser(&data);err != nil{
		fmt.Println("Error parsing data")
	}

// Assuming you've imported the necessary packages and defined your models
	if !CheckStock(data["book_title"]){
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "This book is currently unavailable",
			"success": false,
		})
	}
// Retrieve the book data from the database

// Check if the user is authenticated
	middleware.IsAuthentic(c)
	cookie := c.Get("Auth-Token") // Assuming GetReqHeaders() is Get()
	issuer, err0 := util.ParseAdmin(cookie)
	if err0 != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"error": "Intrenal Server Error",
			"success": false,
		})
	}


	database.DB.Model("Cart").Where("Email = ? AND Book_title = ?", issuer, data["book_title"]).First(&cartdata)
	if cartdata.Id != 0 {
		c.Status(400)
		return c.JSON(fiber.Map{
			"Message": "This book is already added to cart",
			"success": false,
		})
	}
	if UpdateStock0(data["book_title"], 1){
	cart := models.Cart{
		Email: issuer,
		Book_title: data["book_title"],
		Purchased:  false,
	}
	database.DB.Create(&cart)

	c.Status(200)
	return c.JSON(fiber.Map{
		"details": cart,
		"email": issuer,
		"Status":  "Successfully added to Cart",
		"success": true,
	})}
	c.Status(400)
	return c.JSON(fiber.Map{
		"message": "Could not add to cart",
		"success": false,
	})
}
func CheckPrice(booktitle string) int{
	var bookdata models.Book
	database.DB.Where("title=?",booktitle).First(&bookdata)
	return int(bookdata.Price)
}
func ViewCart(c *fiber.Ctx)error { // for viewing the cart. added to frontend.
	var cartdata []models.Cart
	middleware.IsAuthentic(c)
	cookie := c.GetReqHeaders()
	issuer, err0 := util.ParseAdmin(cookie["Auth-Token"])
	if err0 != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"error":err0,
			"success": false,
		})
	}
	database.DB.Preload("Cart").Find(&cartdata, "Email=?",issuer)
	var sum int =  0;
	for i := range cartdata{
		sum += CheckPrice(cartdata[i].Book_title)
	}
	c.Status(200)
	return c.JSON(fiber.Map{
		"data": cartdata,
		"total": sum,
		"success":true,
	})
}

func GetBooks(issuer string)([]string){ // for getting list of books for payment mode
	var cartdata []models.Cart
	database.DB.Preload("Cart").Find(&cartdata, "Email=?",issuer)
	var array []string
	for i := range cartdata{
		array = append(array, cartdata[i].Book_title)
	}
	array = append(array)
	return array;
}

func GetPrice(issuer string)int{ // for getting total price.
	var cartdata []models.Cart
	database.DB.Preload("cart").Find(&cartdata, "Email=?",issuer)
	var sum int = 0
	for i := range cartdata{
		sum += CheckPrice(cartdata[i].Book_title)
	}
	return sum;	
}

func ClearList(book_title string, email string){ // for clearing from the cart.
	var cartdata models.Cart
	database.DB.Where("Book_title = ? AND Email=?", book_title,email).Delete(&cartdata)
}


func BuyBook(c *fiber.Ctx)error{ // for payment methods // for buying the book.added to frontent
	var receipt []models.Purchase
	var data  map[string]string
	if err:=c.BodyParser(&data);err != nil{
		fmt.Println("Error parsing data")
	}
	middleware.IsAuthentic(c)
	cookie := c.Get("Auth-Token") // Assuming GetReqHeaders() is Get()
	issuer, err0 := util.ParseAdmin(cookie)
	if err0 != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"error": "Intrenal Server Error",
			"success": false,
		})
	}
	var cartitems []string;
	cartitems = GetBooks(issuer)
	price, _ := strconv.Atoi(data["price"])
	if(GetPrice(issuer) == price){
		for i := 0; i < (len(cartitems));i++{
			purchased := models.Purchase{
				Email: issuer,
				Book_title: cartitems[i],
				Price: CheckPrice(cartitems[i]),
			}
			database.DB.Create(&purchased)
			ClearList(cartitems[i], issuer);
		}	
		database.DB.Preload("Purchase").Find(&receipt)
		c.Status(200)
		return c.JSON(fiber.Map{
			"message": "Thank you for buying.",
			"receipt": receipt,
			"success": true,
		})
	}
	c.Status(400)
	return c.JSON(fiber.Map{
		"message": "Intrenal Server Error",
		"success": false,
	})
	
}
func RemovefromCart(c *fiber.Ctx,)error{ // for removing a book from the cart. //added to frontend
	var id, _ = strconv.Atoi(c.Params("id"))
	var cartdata models.Cart
	middleware.IsAuthentic(c)
	cookie := c.Get("Auth-Token") // Assuming GetReqHeaders() is Get()
	issuer, err0 := util.ParseAdmin(cookie)
	if err0 != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"error": "Intrenal Server Error",
			"success": false,
		})
	}
	database.DB.Where("Id=? AND Email=?",id,issuer).Find(&cartdata)
	var bookName string = cartdata.Book_title
	if UpdateStock0(bookName, 0){
	database.DB.Where("Id=? AND Email=?",id,issuer).Delete(&cartdata)
}
	c.Status(200)
	return c.JSON(fiber.Map{
		"message": "Book removed from Cart",
	})
}

func SetReview(c* fiber.Ctx)error{ // for giving reveiws to a book. // added to frontend
	var id, _ = strconv.Atoi(c.Params("id"))
	var data map[string]string
	var purchase models.Purchase
	if err:=c.BodyParser(&data);err != nil{
		fmt.Println("Error parsing data")
	}
	middleware.IsAuthentic(c)
	cookie := c.Get("Auth-Token") // Assuming GetReqHeaders() is Get()
	issuer, err0 := util.ParseAdmin(cookie)
	if err0 != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"error": "Intrenal Server Error",
			"success": false,
		})
	}
	database.DB.Where("Id=? AND Email=?",id,issuer).Find(&purchase)
	purchase.Review_title = data["review"]
	database.DB.Save(&purchase)
	c.Status(200)
	return c.JSON(fiber.Map{
		"message": "Review added successfully",
		"data": purchase,
		"success": true,
	})

}

func MyPurchase(c* fiber.Ctx)error{ // for letting users see what they bought. Added to frontend.
	var mypurchase []models.Purchase
	middleware.IsAuthentic(c)
	cookie := c.Get("Auth-Token") // Assuming GetReqHeaders() is Get()
	issuer, err := util.ParseAdmin(cookie)
	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"error": err.Error(),
			"success": false,
		})
	}
	database.DB.Preload("Purchase").Find(&mypurchase, "Email=?",issuer)
	
	c.Status(200)
	return c.JSON(fiber.Map{
		"data": mypurchase,
		"success": true,
	})
}
func AllPurchase(c *fiber.Ctx)error{ // for admin only. // for seeing how many books are bought. // added to frontend.
	var allpurchase []models.Purchase
	middleware.IsAdmin(c)
	cookie := c.Get("Auth-Token")
	issuer, err := util.ParseAdmin(cookie)
	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"error": err.Error(),
			"success": false,
		})
	}
	if(issuer == "admin@gmail.com"){
		database.DB.Find(&allpurchase)
		c.Status(200)
		return c.JSON(fiber.Map{
			"data": allpurchase,
			"success": true,
		})
	}
	c.Status(400)
		return c.JSON(fiber.Map{
			"message": "You are not authorized to see this.",
			"success": false,
		})
}
