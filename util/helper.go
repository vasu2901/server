package util

import(
	"github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
	"os"
	"fmt"
	//"time"
)

func Generator(issuer string) (string, error){
	err0 := godotenv.Load()
	if err0 != nil {
		fmt.Println("Error")
	}
	SECRET := os.Getenv("SECRET")
	claims:= jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer: issuer,
	})
	return claims.SignedString([]byte(SECRET))

}

func ParseJWT(cookie string) (string, error){
	err0 := godotenv.Load()
	if err0 != nil {
		fmt.Println("Error")
	}
	SECRET := os.Getenv("SECRET")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token)(interface{}, error){
		return []byte(SECRET), nil
	})
	if err != nil || !token.Valid {
		return "", err
	}
	claims:= token.Claims.(*jwt.StandardClaims)
	fmt.Println(claims.Issuer)
	return claims.Issuer, nil
}

func ParseAdmin(cookie string) (string, error){
	err0 := godotenv.Load()
	if err0 != nil {
		fmt.Println("Error")
	}
	SECRET := os.Getenv("SECRET")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token)(interface{}, error){
		return []byte(SECRET), nil
	})
	if err != nil || !token.Valid {
		return "", err
	}
	claims:= token.Claims.(*jwt.StandardClaims)
	return claims.Issuer, nil
}