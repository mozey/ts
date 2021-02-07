package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

var dir string
var port string

func stub(w http.ResponseWriter, r *http.Request) {
	elem := []string{dir}
	elem = append(elem, "stripe")
	elem = append(elem, strings.Split(r.URL.Path, "/")...)
	elem = append(elem, fmt.Sprintf("%s.json", r.Method))
	http.ServeFile(w, r, filepath.Join(elem...))
}

func main() {
	dir = os.Getenv("APP_DIR")
	if dir == "" {
		log.Fatal("invalid APP_DIR")
	}
	port = os.Getenv("APP_PORT")
	if dir == "" {
		log.Fatal("invalid APP_PORT")
	}

	http.HandleFunc("/v1/products", stub)
	http.HandleFunc("/v1/prices", stub)
	http.HandleFunc("/v1/orders", stub)

	fs := http.FileServer(http.Dir(dir))
	http.Handle("/", fs)

	addr := fmt.Sprintf("localhost:%s", port)
	log.Println(fmt.Sprintf("Listening on %s...", addr))
	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatal(err)
	}
}
