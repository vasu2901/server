package models

type Book struct{
	S_no uint `json:"id" gorm:"primaryKey"` 
	Title string `json:"title" gorm:"Index;not null" validate:"required"`
	Author string `json:"author" gorm:"Index;not null" validate:"required"`
	Publication string `json:"publication" gorm:"Index;not null" validate:"required"`
	Genre string `json:"genre" gorm:"Index;not null" validate:"required"`
	Stock int64 `json:"stock" gorm:"Index;not null" validate:"required"`
	Price int64 `json:"price" gorm:"Index;not null" validate:"required"`
}