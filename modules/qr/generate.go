package main

import (
	"fmt"
	"os"
	"path/filepath"

	qrcode "github.com/skip2/go-qrcode"
)

func main() {
	err := qrcode.WriteFile(
		"https://en.wikipedia.org/wiki/QR_code", qrcode.Medium, 256,
		filepath.Join("dist", "qr.png"))
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
