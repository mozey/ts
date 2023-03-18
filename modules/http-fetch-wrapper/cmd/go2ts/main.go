package main

import (
	"fmt"
	"os"

	"github.com/mozey/go2ts"
	"github.com/mozey/logutil"
	"github.com/mozey/ts/modules/http-fetch-wapper/pkg/fileutil"
	"github.com/rs/zerolog/log"
)

func main() {
	logutil.SetupLogger(true)
	// Read all files in package
	s, err := go2ts.ReadTypes("pkg/share")
	if err != nil {
		log.Error().Stack().Err(err).Msg("")
		os.Exit(1)
	}
	// Generate TypeScript from Go types
	go2ts.Indent = "  "
	go2ts.TSTypePrefix = "export"
	ts, err := go2ts.Convert(s)
	if err != nil {
		log.Error().Stack().Err(err).Msg("")
		os.Exit(1)
	}
	// Write to file
  appDir := os.Getenv("APP_DIR")
  if appDir == "" {
    log.Error().Stack().Err(fmt.Errorf("invalid APP_DIR")).Msg("")
		os.Exit(1)
  }
  modelsPath := fmt.Sprintf("%s/src/http-fetch-wrapper/models.ts", appDir)
	err = os.WriteFile(modelsPath, []byte(ts), fileutil.DefaultFilePermissions)
	if err != nil {
		log.Error().Stack().Err(err).Msg("")
		os.Exit(1)
	}
}
