package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	dir := os.Getenv("APP_DIR")
	if dir == "" {
		log.Fatal("invalid APP_DIR")
	}
	port := os.Getenv("APP_PORT")
	if dir == "" {
		log.Fatal("invalid APP_PORT")
	}

	fs := http.FileServer(http.Dir(dir))
	http.Handle("/", fs)

	addr := fmt.Sprintf("localhost:%s", port)
	log.Println(fmt.Sprintf("Listening on %s...", addr))
	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatal(err)
	}
}
