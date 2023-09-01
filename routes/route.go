package routes
import(
	"github.com/gofiber/fiber/v2"
	"github.com/BalkanID-University/vit-2025-summer-engineering-internship-task-vasu2901/tree/main/backend/controller"
)
func Setup(app *fiber.App){
	app.Post("/api/register", controller.Register) //added
	app.Post("/api/verify",controller.Authen) //added
	app.Post("/api/login", controller.Login) //added
	app.Post("/api/deactivate",controller.Deactivate) //added
	app.Post("/api/reverify", controller.Reverify) //added
	app.Post("/api/addBook",controller.AddBook) //added
	app.Post("/api/update", controller.UpdateStock) //added
	app.Get("/api/getallbooks", controller.GetAllBooks) //added
 	app.Post("/api/addtocart",controller.AddtoCart) //added
	app.Get("/api/mycart",controller.ViewCart) //added
	app.Post("/api/buy", controller.BuyBook) //added
	app.Get("/api/removefromcart/:id",controller.RemovefromCart) //added
	app.Post("/api/review/:id",controller.SetReview) //added
	app.Get("/api/mypurchase", controller.MyPurchase) //added
	app.Get("/api/allpurchase", controller.AllPurchase) //added
}

