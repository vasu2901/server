package models

type Cart struct {
	Id uint `json:"id"`
	Email string `json:"email"`
	Book_title	string `json:"book_title" gorm:"Index;not null" validate:"required"`
	Purchased bool`json:Purchased`
}