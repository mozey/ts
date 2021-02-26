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
	elem = append(elem, "api")
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

	// search
	http.HandleFunc("/search/products", stub)

	// src
	http.Handle("/src/",
		// Explanation of StripPrefix here
		// https://stackoverflow.com/a/27946132/639133
		http.StripPrefix("/src/",
			http.FileServer(http.Dir(filepath.Join(dir, "src")))))

	// static
	http.Handle("/",
		http.FileServer(http.Dir(filepath.Join(dir, "static"))))

	// stripe
	http.HandleFunc("/stripe/v1/products", stub)
	http.HandleFunc("/stripe/v1/prices", stub)
	http.HandleFunc("/stripe/v1/orders", stub)

	addr := fmt.Sprintf("localhost:%s", port)
	log.Println(fmt.Sprintf("Listening on %s...", addr))
	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatal(err)
	}
}
