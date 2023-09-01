package controller
import(
	"github.com/gofiber/fiber/v2"	 // for hosting or starting the server
	"fmt" //for printing errors
	"regexp" // regular express
	//"time" // for getting time.
	//"strconv" // for converting string 
	"math/rand" // for generating OTPs.
	"strings" // for strings operations
	"github.com/BalkanID-University/vit-2025-summer-engineering-internship-task-vasu2901/tree/main/backend/models"
	"github.com/BalkanID-University/vit-2025-summer-engineering-internship-task-vasu2901/tree/main/backend/database"
	"github.com/BalkanID-University/vit-2025-summer-engineering-internship-task-vasu2901/tree/main/backend/util"
	"github.com/BalkanID-University/vit-2025-summer-engineering-internship-task-vasu2901/tree/main/backend/middleware"
)
func validateEmail(email string) bool {
	Re:= regexp.MustCompile(`[a-z0-9._%+\-]+@[a-z._%+\-]+[a-z._%+\-]`)
	return Re.MatchString(email)
}
func Register(c *fiber.Ctx) error {
	var data map[string]interface{}
	var userData models.User
	if err:=c.BodyParser(&data);err != nil{
		fmt.Println("Error parsing data")
	}
	// Check if password length is less than 8
	if len(strings.TrimSpace(data["password"].(string))) < 8{
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Password length is less than 8",
			"success": false,

		})
	}
	//check if the email address is valid
	if !validateEmail(data["email"].(string)){
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Email address invalid",
			"success": false,
		})
	}
	
	// check if email already exists
	database.DB.Where("email=?",strings.TrimSpace(data["email"].(string))).First(&userData)
	if userData.Id != 0{
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Email address exists",
			"success": false,
		})

	}
	var otp = (int64)(rand.Intn(100000))
	user:= models.User{
		FirstName: data["first_name"].(string),
		LastName: data["last_name"].(string),
		Email: data["email"].(string),
		Phone: data["phone"].(string),
		Active: false,
		OTP: otp,
		Verified: false,
	}
	user.SetPassword(data["password"].(string))
	if((data["first_name"].(string)  == "") || (data["last_name"].(string) == "" )|| (data["phone"].(string) == "")){
		c.Status(400)
			return c.JSON(fiber.Map{
				"error": "Cannot create user",
				"success": false,
			})
	}
	database.DB.Create(&user)
	token, err := util.Generator(user.Email,)
	if err != nil{
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"error": "Cannot create user",
			"success": false,
		})
	}
	return c.JSON(fiber.Map{
		"message": "please verify",
		"user": user,
		"token": token,
		"success": true,
	})	
}
func Authen(c *fiber.Ctx)error {
	var data map[string]interface{}
	var user models.User
	if err := c.BodyParser(&data); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unable to parse body",
			"email": data["email"],
			"success": false,
		})
	}
	database.DB.Where("email=?",data["email"].(string)).First(&user)
	if user.Id == 0{
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Email address doesn't exist",
			"success": false,
		})
	}
	middleware.IsAuthentic(c);
	
	if user.Id == 1 && user.Verified == true{
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Please Login",
			"success": false,
		})
	}
	if(int64(data["otp"].(float64)) != user.OTP){
		return c.JSON(fiber.Map{
			"message": "Wrong OTP",
			"success": false,
		})
	}
	user.Active = true
	user.OTP = 0
	user.Verified = true
	database.DB.Save(&user)
	
	c.Status(200)
		return c.JSON(fiber.Map{
			"message": "User verified",
			"user": user,
			"success": true,
		})
	

}
func Login(c *fiber.Ctx)error {
	var data map[string]string
	var user models.User
	if err := c.BodyParser(&data); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unable to parse body",
			"email": data["email"],
			"password": data["password"],
		})
	}
	database.DB.Where("email=?",data["email"]).First(&user)
	if user.Id == 0{
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "User doesn't exists",
			"email": data["email"],
		})
	}
	if (user.Verified == false || user.Active == false){
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Sorry, either verify yourself or create new account",
			"otp": user.OTP,
		})
	}
	if err:= user.ComparePassword(data["password"]); err != nil{
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Invalid credentials",
		})
	}
	token, err := util.Generator(user.Email,)
	if err != nil{
		c.Status(fiber.StatusInternalServerError)
		return nil
	}

	return c.JSON(fiber.Map{
		"status": "Verified",
		"user":user,
		"token": token,
	})

}

func Deactivate(c *fiber.Ctx) error{ // for deactivating accounts.
	var data map[string]string
	var user models.User
	if err := c.BodyParser(&data); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unable to parse body",
			"email": data["email"],
		})
	}
	database.DB.Where("email=?",data["email"]).First(&user)
	if user.Id == 0{
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "User doesn't exists",
			"email": data["email"],
		})
	}
	if (user.Verified == false || user.Active == false){
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Sorry, either verify yourself or create new account",
		})
	}
	if err:= user.ComparePassword(data["password"]); err != nil{
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Invalid credentials",
		})
	}
	var otp = (int64)(rand.Intn(100000))
	user.Active = true
	user.OTP = otp
	user.Verified = true
	database.DB.Save(&user)
	token, err := util.Generator(user.Email,)
	if err != nil{
		c.Status(fiber.StatusInternalServerError)
		return nil
	}

	return c.JSON(fiber.Map{
		"message": "please verify",
		"user": user,
		"token": token,
	})
}

func Reverify(c *fiber.Ctx)error {
	var data map[string]interface{}
	var user models.User
	if err := c.BodyParser(&data); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Unable to parse body",
			"email": data["email"],
		})
	}
	database.DB.Where("email=?",data["email"].(string)).First(&user)
	if user.Id == 0{
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Email address doesn't exist",
		})
	}
	middleware.IsAuthentic(c);
	
	if user.Id != 1 && user.Verified != true{
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Please Login",
			"success": false,
		})
	}
	if(int64(data["otp"].(float64)) != user.OTP){
		return c.JSON(fiber.Map{
			"message": "Wrong OTP",
			"success": false,
		})
	}
	database.DB.Delete(&user)
	c.Status(200)
		return c.JSON(fiber.Map{
			"message": "Account Deactivated",
			"success": true,
		})
}