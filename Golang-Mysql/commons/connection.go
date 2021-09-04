package commons

import (
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/seleandroferretti/Golang-MySQL-REST-API/models"
)

func GetConnection() *gorm.DB {
	db, error := gorm.Open("mysql", "root:rootroot@/go_api_rest?charset=utf8")

	if error != nil {
		log.Fatal(error)
	}
	return db
}

func Migrate() {
	db := GetConnection()
	defer db.Close()
	log.Println("Migrando...")
	db.AutoMigrate(&models.Persona{})
}