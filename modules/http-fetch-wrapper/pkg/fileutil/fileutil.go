package fileutil

import (
	"os"
	"path/filepath"

	"github.com/pkg/errors"
)

const DefaultFilePermissions = 0644
const DefaultDirPermissions = 0777

// TouchDir creates the dir if it does not exist.
// Parent dirs will also be created if required
func TouchDir(dirPath string) error {
	if !PathExists(dirPath) {
		err := os.MkdirAll(dirPath, DefaultDirPermissions)
		if err != nil {
			return errors.Errorf("%s path: %s", err.Error(), dirPath)
		}
	}
	return nil
}

// TouchFile creates the file if it does not exist.
// Parent dirs will also be created if required
func TouchFile(filePathStr string) error {
	dirPath := filepath.Dir(filePathStr)
	if !PathExists(dirPath) {
		// Create parent dir
		err := os.MkdirAll(dirPath, DefaultDirPermissions)
		if err != nil {
			return errors.WithStack(err)
		}
	}

	// Create or truncate file
	f, err := os.OpenFile(
		filePathStr, os.O_RDWR|os.O_CREATE|os.O_TRUNC, DefaultFilePermissions)
	if err != nil {
		return errors.WithStack(err)
	}
	err = f.Close()
	if err != nil {
		return errors.WithStack(err)
	}

	return nil
}

// TODO
// func TouchFilePerms(filePathStr string, perms int) error

// OpenFile with default flags and permissions.
// Parent dirs will also be created if required.
// Remember to call f.Close
func OpenFile(filePathStr string) (f *os.File, err error) {
	dirPath := filepath.Dir(filePathStr)
	if !PathExists(dirPath) {
		// Create parent dir
		err := os.MkdirAll(dirPath, DefaultDirPermissions)
		if err != nil {
			return f, errors.WithStack(err)
		}
	}

	f, err = os.OpenFile(filePathStr,
		os.O_WRONLY|os.O_CREATE|os.O_TRUNC, DefaultFilePermissions)
	if err != nil {
		return f, errors.WithStack(err)
	}

	return f, nil
}

func WriteBytes(filePathStr string, b []byte) (err error) {
	f, err := OpenFile(filePathStr)
	if err != nil {
		return err
	}
	// Example here doesn't check the error
	// https://gobyexample.com/writing-files
	defer f.Close()
	_, err = f.Write(b)
	if err != nil {
		return errors.WithStack(err)
	}
	return f.Sync()
}

// PathExists returns true if the specified path exists
func PathExists(pathStr string) bool {
	_, err := os.Stat(pathStr)
	if err != nil {
		if os.IsNotExist(err) {
			return false
		}
		// WARNING Will also return false due to other errors,
		// like insufficient permission to list path
		return false
	}
	return true
}
