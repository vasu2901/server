package main
import(
	"github.com/BalkanID-University/vit-2025-summer-engineering-internship-task-vasu2901/tree/main/backend/database"
	// "github.com/BalkanID-University/vit-2025-summer-engineering-internship-task-vasu2901/tree/main/backend/models"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"os"
	"fmt"
	// "github.com/BalkanID-University/vit-2025-summer-engineering-internship-task-vasu2901/tree/main/backend/util"
	//"github.com/BalkanID-University/vit-2025-summer-engineering-internship-task-vasu2901/tree/main/backend/middleware"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/BalkanID-University/vit-2025-summer-engineering-internship-task-vasu2901/tree/main/backend/routes"
)
func main(){
	database.Connect()
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error")
	}
	PORT:= os.Getenv("PORT")
	app := fiber.New()
	app.Use(cors.New())
	app.Get("/", func(c *fiber.Ctx) error{
		return c.SendString("Hello World")
	})
	app.Get("/Login", func(c *fiber.Ctx) error {
        return c.SendFile("./templates/Login.html")
    })
	app.Get("/Signin",func(c *fiber.Ctx) error {
        return c.SendFile("./templates/Signin.html")
    })
	app.Get("/Authen", func(c *fiber.Ctx) error {
		return c.SendFile("./templates/Authen.html")
	})
	app.Get("/userhome", func(c *fiber.Ctx)error{
		return c.SendFile("./templates/UserHome.html")
	})
	app.Get("/adminhome", func(c *fiber.Ctx)error{
		return c.SendFile("./templates/AdminHome.html")
	})
	app.Get("/addabook", func(c *fiber.Ctx)error{
		return c.SendFile("./templates/Addabook.html")
	})
	app.Get("/updatestock", func(c *fiber.Ctx)error{
		return c.SendFile("./templates/UpdateStock.html")
	})
	routes.Setup(app)
	app.Listen(":"+PORT)
}