
package middleware

import(
	"github.com/gofiber/fiber/v2"
	"github.com/BalkanID-University/vit-2025-summer-engineering-internship-task-vasu2901/tree/main/backend/util"
)

func IsAuthentic(c* fiber.Ctx)error {
	cookie := c.GetReqHeaders()
	if _, err:= util.ParseJWT(cookie["Auth-Token"]); err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Invalid JWT token",
		})
	}
	return c.Next()
}

func IsAdmin(c *fiber.Ctx)error{
	cookie := c.GetReqHeaders()  // for verifying session cookies.
	issuer, err:= util.ParseJWT(cookie["Auth-token"]); 
	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Invalid JWT token",
		})
	}
	if(issuer == "admin@gmail.com"){
		return c.Next()
	}
	c.Status(400)
	return c.JSON(fiber.Map{
		"message": "This is only for Admins",
	})
}