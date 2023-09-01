package database

import(
	"gorm.io/gorm"
	"fmt"
	"gorm.io/driver/postgres"
	"github.com/joho/godotenv"
	"os"
	"github.com/BalkanID-University/vit-2025-summer-engineering-internship-task-vasu2901/tree/main/backend/models"
)
var DB *gorm.DB
func Connect(){
	err0 := godotenv.Load()
	if err0 != nil {
		fmt.Println("Error")
	}
	dsn := os.Getenv("DSN")
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
	} else{
		fmt.Println("Connected")
	}
	DB = database
	database.AutoMigrate(
		&models.User{},
		&models.Book{},
		&models.Purchase{},
		&models.Cart{},
	)
}