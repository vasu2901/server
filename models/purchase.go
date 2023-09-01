package models

type Purchase struct {
	Id uint `json:"id"`
	Email string `json:"Email"`
	Book_title	string `json:"book_title" gorm:"Index;not null" validate:"required"`
	Price int `json:"price`
	Review_title	string `json:"review_title" `
}