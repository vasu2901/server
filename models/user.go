package models
import (
	"golang.org/x/crypto/bcrypt"
)
type User struct{
	Id uint `json:"id"`
	FirstName string `json:"first_name" gorm:"Index;not null" validate:"required"`
	LastName string `json:"last_name" gorm:"Index;not null" validate:"required"`
	Email string `json:"email" gorm:"Index;not null" validate:"required"`
	Password []byte `json:"-" gorm:"Index;not null" validate:"required"`
	Phone string `json:"phone" gorm:"Index;not null" validate:"required"`
	Active bool `json:"active" gorm:"Index;not null" validate:"required"`
	OTP int64 `json:"otp"`
	Verified bool `json:"verified"`
}

func (user * User) SetPassword(password string){
	HashedPassword,_  := bcrypt.GenerateFromPassword([]byte(password), 14)
	user.Password = HashedPassword
}	
func (user *User)ComparePassword(password string)error{
	return  bcrypt.CompareHashAndPassword(user.Password, []byte(password))
}